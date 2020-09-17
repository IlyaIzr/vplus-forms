import React from 'react';

 const StyleButton = ({ onToggle, style, active, label }) => {

  const onMouseDown = e => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <span
      className={active ? 'RichEditor-styleButton RichEditor-activeButton' : 'RichEditor-styleButton'}
      onMouseDown={onMouseDown}
    >
      {label}
    </span>
  )
};

export default StyleButton;