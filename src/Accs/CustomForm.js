import React from 'react'
import { StringField } from '../components/StringField'

export const CustomForm = ({
  type,
  value,
  index,
  addContactInfo,
  deleteField
}) => {
  const onChange = e => addContactInfo(e.target.name, e.target.value, index)
  const onDeleteForm = () => deleteField(index)
  return (
    <div className="two fields">
      <StringField label="@(Содержание контакта)" name="valueOfContact"
        isRequired={false} isEditable={true}
        value={value} onChange={onChange}
      />
      <StringField label="@(Название контакта)" name="typeOfContact"
        isRequired={false} isEditable={true}
        value={type} onChange={onChange}
      />
      <button className="ui button red small" type="button" onClick={onDeleteForm}>
        @(Удалить поле)
      </button>
    </div>
  )
}
