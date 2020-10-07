import React from 'react'
import { StringField } from '../components/StringField'

export const InputsMapper = ({
  label,
  fieldMeta,
  setFieldMeta
}) => {

  const onFieldChange = (value, index) => {
    const mutable = [...fieldMeta.value]
    mutable[index] = value
    setFieldMeta({ ...fieldMeta, value: mutable })
  }
  const addField = () => {
    const mutable = [...fieldMeta.value, '']
    setFieldMeta({ ...fieldMeta, value: mutable })
  }
  const deleteField = index => {
    const mutable = [...fieldMeta.value]
    mutable.splice(index, 1)
    setFieldMeta({ ...fieldMeta, value: mutable })
  }

  return (
    <div className="field ui segment">
      <label htmlFor="">@({label})</label>
      {fieldMeta.value && Boolean(fieldMeta.value.length) && fieldMeta.value.map((field, index) => {

        const onChange = e => onFieldChange(e.target.value, index)
        const onDelete = () => deleteField(index)

        return (
          <div className="ui fields" key={index+label}>
            <StringField key={index + label}
              value={field} onChange={onChange}
              isRequired={fieldMeta.isRequired} isEditable={fieldMeta.isEditable}
            />
            <div className="field">
              <button className={`ui button red tiny ${!fieldMeta.isEditable && 'disabled'}`}
                type="button" onClick={onDelete}
              >х</button>
            </div>
          </div>
        )
      })}
      <button className={`ui button blue small ${!fieldMeta.isEditable && 'disabled'}`}
        onClick={addField} type="button"
      >@(Добавить)
        </button>
    </div>
  )
}

export const InputsMapperDefaultState = {
  value: [''],
  isEditable: true,
  isRequired: true
}