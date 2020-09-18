import React from 'react';

 const StyleButton = ({ onToggle, style, active, label }) => {

  const onMouseDown = e => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <span
      className={active ? 'RichEditor-styleButton RichEditor-activeButton ui tiny button' : 'RichEditor-styleButton ui tiny tertiary button'}
      onMouseDown={onMouseDown}
    >
      {label}
    </span>
  )
};

export default StyleButton;