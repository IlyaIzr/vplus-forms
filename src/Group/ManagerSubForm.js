import React from 'react'
import { SelectField } from '../components/SelectField'
import { StringField } from '../components/StringField'

export const ManagerSubForm = ({
  manager, isEditable, options, onManagerChange, changeFunc, payOptions, index, isDeletable, removeFunc
}) => {

  // Manager select functions
  let selectManagerIdV
  const optionFormatter = options => {
    const formatedOptions = options && options.map((option) => {
      if (option.id == manager.id) selectManagerIdV = { label: option.name, value: option.id }
      return { label: option.name, value: option.id }
    })
    return formatedOptions
  }
  const formatedManagers = optionFormatter(options)
  const onSelectManager = option => onManagerChange(option.label, option.value, index)

  // PayOptionsIds
  let selectPayMethodIdV
  const payOptionsFormatter = options => {
    const formatedOptions = options && options.map((option) => {
      if (option.payMethodId == manager.payMethodId) selectPayMethodIdV = { label: option.label, value: option.payMethodId, ...option }
      return { label: option.label, value: option.payMethodId }
    })
    return formatedOptions
  }
  const formatedPayMethodIds = payOptionsFormatter(payOptions)
  // console.log(selectPayMethodIdV)
  const onPayIdSelect = option => changeFunc('payMethodId', option.value, index)

  // PayValue
  const onPayValueChange = e => changeFunc(e.target.name, e.target.value, index)

  // Del func
  const onClick = () => removeFunc(index)

  return (
    <div className="ui fields">
      <SelectField label="@(Пользователь)" name="id"
        isRequired={true} isEditable={isEditable}
        value={selectManagerIdV} options={formatedManagers} onChange={onSelectManager}
      />

      {Boolean(manager.id) && payOptions && Boolean(payOptions.length) &&
        <SelectField label="@(Способ оплаты)" name="payMethodId"
          isRequired={true} isEditable={isEditable}
          value={selectPayMethodIdV} options={formatedPayMethodIds} onChange={onPayIdSelect}
        />
      }


      {Boolean(manager.payMethodId) && Boolean(payOptions.length) && Boolean(manager.payMethodId === 'custom') &&
        <StringField label="@(Описание)" name="payMethodName"
          isRequired={selectPayMethodIdV.isRequired} isEditable={selectPayMethodIdV.isEditable}
          value={manager.payMethodName} onChange={onPayValueChange}
        />
      }

      {Boolean(manager.payMethodId) && Boolean(payOptions.length) &&
        <StringField label="@(Значение)" name="payValue"
          isRequired={selectPayMethodIdV.isRequired} isEditable={selectPayMethodIdV.isEditable}
          value={manager.payValue} onChange={onPayValueChange}
        />
      }

      <div className="field">
        <button className={isDeletable ? "ui button red" : "ui button red disabled"}
          onClick={onClick} type="button"
        >@(Удалить)
        </button>
      </div>
    </div>
  )
}
