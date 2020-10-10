import React from 'react'
import { StringField } from '../components/StringField'

// Labels hardcoded, watch it
export const ThreeFields = ({
  isEditable,
  isRequired,
  value,
  onChange,
  deleteFunc,
  index,
  canDelete
}) => {
  const onFieldChange = e => onChange(index, e.target.name, e.target.value)
  const onClick = () => deleteFunc(index)
  return (
    <div className="ui three fields segment">
      <StringField label="@(Имя)" name="firstName"
        isEditable={isEditable} isRequired={isRequired.firstName}
        value={value.firstName} onChange={onFieldChange}
      />
      <StringField label="@(Фамилия)" name="secondName"
        isEditable={isEditable} isRequired={isRequired.secondName}
        value={value.secondName} onChange={onFieldChange}
      />
      <StringField label="@(Отчество)" name="thirdName"
        isEditable={isEditable} isRequired={isRequired.thirdName}
        value={value.thirdName} onChange={onFieldChange}
      />
      <button className={`ui button red tiny ${!canDelete && ' disabled'}`}
        style={{ 'maxHeight': 32, 'marginTop': 26 }}
        onClick={onClick} type="button">
        х
      </button>
    </div>
  )
}
