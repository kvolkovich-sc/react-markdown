import React, { Component, PropTypes } from 'react';
import './RichEditorBase.less';

import {
  Editor,
  Placeholder,
  Block,
  Character,
  Data,
  Document,
  Inline,
  Mark,
  Node,
  Selection,
  Schema,
  State,
  Text,
  Transform,
  Html,
  Plain,
  Raw,
  Urils
} from 'slate';

const plainText = '<hello>ffasdf</hello>';
const deserializedPlainText = Plain.deserialize(plainText);
console.log('pt', deserializedPlainText);

const propTypes = {};
const defaultProps = {};

export default
class RichEditorBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: Plain.deserialize(plainText)
    };
  }

  handleChange(state) {
    this.setState({ state });
  }

  handleDocumentChange(document, state) {
    console.log('document change', document);
  }

  handleSelectionChange(selection, state) {
    console.log('selection change', selection);
  }

  hanldeKeyDown(event, data, state) {
    console.log('keydown:', event, data, state);
  }

  render() {
    const {
      state
    } = this.state;

    return (
      <div className="rich-editor-base">
        <Editor
          onChange={this.handleChange.bind(this)}
          onDocumentChange={this.handleDocumentChange.bind(this)}
          onSelectionChange={this.handleSelectionChange.bind(this)}
          onKeyDown={this.hanldeKeyDown.bind(this)}
          placeholder="Placeholder text here"
          readOnly={false}
          state={state}
        />
      </div>
    );
  }
}

RichEditorBase.propTypes = propTypes;
RichEditorBase.defaultProps = defaultProps;
