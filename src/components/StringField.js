import React from 'react'

export const StringField = ({
  isRequired = false,
  name = '',
  label = false,
  minLength = false,
  isEditable = true,
  value,
  onChange,
  type = "text"
}) => {
  return (
    <div className={isRequired ? "required field" : "field"}>
      {label && <label htmlFor={name}>{label}</label>}
      <input type={type} name={name} value={value} onChange={onChange}
        required={isRequired} disabled={!isEditable} minLength={minLength ? minLength : undefined}
      />
    </div>
  )
}
