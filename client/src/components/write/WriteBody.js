import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

const BodyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  .title {
    background: ${oc.gray[7]};
    border: none;
    outline: none;
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    padding: 0.5rem;
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .code-editor {
    flex: 1;
    background: ${oc.gray[9]};
    display: flex;
    flex-direction: column;
    .CodeMirror {
      font-size: 1.25rem;
      flex: 1;
    }
  }
`;

class WriteBody extends Component {
  editor = null;
  codeMirror = null;
  cursor = null;

  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
    });
    this.codeMirror.on('change', this.onChangeBody);
    if (this.props.body) {
      this.codeMirror.setValue(this.props.body);
    }
  };

  componentDidMount() {
    this.initializeEditor();
  }

  onChangeTitle = e => {
    this.props.onChangeField({
      key: 'title',
      value: e.target.value,
    });
  };

  onChangeBody = body => {
    this.cursor = body.getCursor();
    this.props.onChangeField({
      key: 'body',
      value: body.getValue(),
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.body !== this.props.body) {
      const { codeMirror, cursor } = this;

      if (!codeMirror) return;
      codeMirror.setValue(this.props.body);

      if (!cursor) return;
      codeMirror.setCursor(cursor);
    }
  }

  render() {
    const { title, children } = this.props;
    const { onChangeTitle } = this;

    return (
      <BodyContainer>
        <input
          className="title"
          placeholder="제목 입력"
          name="title"
          value={title}
          onChange={onChangeTitle}
        />
        <div className="code-editor" ref={ref => (this.editor = ref)}></div>
        {children}
      </BodyContainer>
    );
  }
}

export default WriteBody;
