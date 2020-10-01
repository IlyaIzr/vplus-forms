import React from 'react'
import { StringField } from '../components/StringField'

// Labels hardcoded, watch it
export const ThreeFields = ({
  isEditable, 
  isRequired,
  value,
  onChange,
  deleteFunc,
  index
}) => {
  const onFieldChange = e => onChange(index, e.target.name, e.target.value)
  const onClick = () => deleteFunc(index)
  return (
    <div className="ui fields">
      <StringField label="@(Имя)" name="firstName"
        isEditable={isEditable} isRequired={isRequired}
        value={value.firstName} onChange={onFieldChange}
      />
      <StringField label="@(Фамилия)" name="secondName"
        isEditable={isEditable} isRequired={isRequired}
        value={value.secondName} onChange={onFieldChange}
      />
      <StringField label="@(Отчество)" name="thirdName"
        isEditable={isEditable} isRequired={isRequired}
        value={value.thirdName} onChange={onFieldChange}
      />
      <button className="ui button red" onClick={onClick}>@(х)</button>
    </div>
  )
}
