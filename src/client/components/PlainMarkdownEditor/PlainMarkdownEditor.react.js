import React, { Component, PropTypes } from 'react';
import { Editor, Raw, findDOMNode } from 'slate';
import './PlainMarkdownEditor.less';

const propTypes = {};
const defaultProps = {};

const initialState = Raw.deserialize({
  nodes: [
    {
      kind: 'block',
      type: 'paragraph',
      nodes: [
        {
          kind: 'text',
          text: 'A line of text in a paragraph.'
        }
      ]
    }
  ]
}, { terse: true });

let CodeNode = props => console.log('patrC', props) || <code { ...props.attributes }>{props.children}</code>;
let BoldMark = props => console.log('patrB', props) || <strong { ...props.attributes}>{props.children}</strong>;

export default
class PlainMarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: initialState,
      schema: {
        nodes: {
          code: CodeNode
        },
        marks: {
          bold: BoldMark,
          text: BoldMark
        }
      }
    };
  }

  handleChange = (state) => {
    this.setState({ state });
  }

  handleKeyDown = (event, data, state) => {
    if (!event.ctrlKey) return;

    switch (event.which) {
      case 65: {
        event.preventDefault();
        return state.transform().selectAll().apply();
      }
      case 66: {
        event.preventDefault();
        console.log('transform:', state.transform());
        return state.transform().toggleMark('bold').apply();
      }
      case 67: {
        if (!event.altKey) return;
        const isCode = state.blocks.some(block => block.type === 'code');
        event.preventDefault();
        return state.transform().setBlock(isCode ? 'paragraph' : 'code').apply();
      }
    }
  };

  // componentDidUpdate = () => {
  //   console.log(findDOMNode('1'));
  // }

  render = () => {
    console.log('state:', this.state.state.toJS());

    return (
      <div className="plain-markdown-editor">
        <Editor
          state={this.state.state}
          schema={this.state.schema}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

PlainMarkdownEditor.propTypes = propTypes;
PlainMarkdownEditor.defaultProps = defaultProps;
