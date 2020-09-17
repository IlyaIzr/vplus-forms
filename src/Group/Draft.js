import React, { useState, useEffect, useRef } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js';
import InlineStyleControls from './draftjs/InlineStyleControls';

const CreateProject = ({ createProject }) => {
  const content = window.localStorage.getItem('content');
  let initEditorState;
  if (content) {
    initEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
  } else {
    initEditorState = EditorState.createEmpty();
  }

  const [editorState, setEditorState] = React.useState(initEditorState);
  const [formState, setFormState] = useState({
    title: 'Шаблон договора',
    content: ''
  });

  const editorRef = useRef(null);
  
  useEffect(() => {editorRef.current.focus()}, [])

  const saveContent = content => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
    setFormState({ ...formState, content: JSON.stringify(convertToRaw(content)) })
  };

  const onChange = editorStateProp => {
    const contentState = editorStateProp.getCurrentContent();
    createProject({ ...formState, ...editorState })
    saveContent(contentState);
    setEditorState(editorStateProp);
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const mapKeyToEditorCommand = e => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleInlineStyle = inlineStyle => {
    onChange(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    );
  };

  let className = 'RichEditor-editor form-group px-2 py-0 rounded ';
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  };

  return (
    <div className="ui container">
      <div className="row">
        <div className="col-0 col-lg-2"></div>
        <div className="col-12 col-lg-8">
          <div className="">
            <fieldset>
              <h3 className="title">Шаблон договора</h3>
              <div className="field">
                <div className={className} id="toInvis">
                  <Editor
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={onChange}
                    spellCheck={true} 
                    ref={editorRef}
                    className="form-control "
                    id="content"
                    //placeholder="напишите что-то ниже"
                  />
                  <div className="RichEditor-root rounded mb-3 ">
                    <InlineStyleControls
                      editorState={editorState}
                      onToggle={toggleInlineStyle}
                    />                                     
                  </div>

                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
