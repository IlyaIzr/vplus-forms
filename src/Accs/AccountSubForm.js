import React, { useEffect, useState } from 'react'
import { SelectField } from '../components/SelectField'
import { StringField } from '../components/StringField'
import { NumberField } from '../components/NumberField'


export const AccountSubForm = ({
  account,
  options,
  isRequired = true,
  isEditable = true,
  onAccountTypeChange,
  onCustomAccChange,
  index,
  deleteField,
  canDelete
}) => {
  const [fields, setFields] = useState([])

  const onTypeChange = option => onAccountTypeChange(option, index)
  const onFieldChange = e => onCustomAccChange(e.target.name, e.target.value, index)
  const onDeleteClick = () => deleteField(index)

  useEffect(() => {
    const optionToRender = options.filter(option => option.value === account.value)
    const _ = optionToRender[0]
    if (_) setFields(_.fields)
  }, [account.value])

  return (
    <div>
      <SelectField label="@(Тип платежной системы)" name="accountType"
        isRequired={isRequired} isEditable={isEditable}
        options={options} value={account} onChange={onTypeChange}
      />
      <div className="fields">
        {Boolean(fields.length) && fields.map((item) => {
          if (item.type === 'text') return (
            <StringField label={item.label} name={item.name}
              isRequired={item.isRequired} isEditable={item.isEditable}
              value={account[item.name]} onChange={onFieldChange}
              key={item.name + 'txt' + account.value}
            />
          )
          if (item.type === 'number') return (
            <NumberField label={item.label} name={item.name}
              isRequired={item.isRequired} isEditable={item.isEditable}
              value={account[item.name]} onChange={onFieldChange}
              step={item.step} min={item.min} max={item.max}
              key={item.name + 'txt' + account.value}
            />
          )
        })}
      </div>
      <button className={`ui right floated button red ${!canDelete && "disabled"}`} type="button"
        onClick={onDeleteClick}>
        @(Удалить)
      </button>

    </div>
  )
}
