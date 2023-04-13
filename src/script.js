import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'
import * as bootstrap from "https://cdn.skypack.dev/bootstrap@5.2.3";

marked.setOptions({
  breaks: true,
  highlight: function(code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript')
  }
});

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
}

class Editor extends React.Component {
  constructor(props) {
     super(props);
  }
  render() {
    return (
      <textarea id="editor" value={this.props.content} onChange={this.props.handleTextAreaChange}></textarea>
    );
  }
}

// const Previewer = ({content}) => <div id="preview" dangerouslySetInnerHTML={{
//            __html: marked.parse(content, {renderer: renderer})
//          }} />

class Previewer extends React.Component {
  constructor(props) {
    super(props);
  }
   render() {
     return (
       // <div id="preview">{this.props.display}</div>
       <div id="preview" dangerouslySetInnerHTML={{
           __html: marked.parse(this.props.display, {renderer: renderer})
         }} />
     );
   }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
\/\/ this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == \'\`\`\`\' && lastLine == \'\`\`\`\') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
2. Use just 1s if you want!
3. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
      `
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  render() {
    return (
      <div class="row">
        <div class="col-md-6">
          <Editor content={this.state.input} handleTextAreaChange={this.handleChange}/>
        </div>
        <div class="col-md-6">
          <Previewer display={this.state.input}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));