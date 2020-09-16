import React, { useState } from 'react'

export const ManagerField = ({ field, options, isDeletable, changeFunc, removeFunc, index, payOptions }) => {
  const onChange = e => changeFunc(e, index)
  const onClick = () => removeFunc(index)
  const payPick = (e) => {
    setIsExpanded(true)
    setPayForm(payOptions[e.target.value])
  }
  const onPayFormChange = e => {
    changeFunc(e, index)
    const fields = [...payForm.fields]
    const fieldIndex = fields.findIndex(field => field.name == e.target.name)
    fields[fieldIndex] = {...payForm.fields[fieldIndex], value: e.target.value}
    console.log(fields)
    setPayForm({
      ...payForm,
      fields
    })
  }

  const [isExpanded, setIsExpanded] = useState(false)
  const [payForm, setPayForm] = useState({
    name: '',
    fields: []
  })

  return (
    <div className="ui three fields">
      <div className="required field">
        <label htmlFor="id">Пользователь</label>
        <select name="id" className="ui dropdown"
          required onChange={onChange} value={field && field.id}
        >
          {options.length && options.map((manager) => {
            return (
              <option value={manager.id} key={manager.id + Math.random(100)}>{manager.name}</option>
            )
          })}
        </select>
      </div>


      <div className="required field">
        <label htmlFor="id">Способ оплаты</label>
        <select name="id" className="ui dropdown"
          required onChange={payPick} value={''}
        >
          <option value='' key='emptyOpt'></option>
          {payOptions.length && payOptions.map((payOption, index) => {  // TODO index of 0 can cause problems
            return (
              <option value={index} key={payOption.name + index}>{payOption.name}</option>
            )
          })}
        </select>
      </div>

      {isExpanded && <div className="field">
        {payForm.fields.length && payForm.fields.map((field) => {
          return (
            <div className={`field ${field.isRequired && 'required'}`} key={field.name}>
              {field.label && <label htmlFor={field.name}>{field.label}</label>}
              <input type={field.type} value={field.value} disabled={!field.isEditable} name={field.name}
                min={field.min} max={field.max} onChange={onPayFormChange}
              />
            </div>
          )
        })}
      </div>}


      <div className="field">
        <button className={isDeletable ? "ui button red" : "ui button red disabled"}
          onClick={onClick} type="button"
        >Удалить
        </button>
      </div>
    </div>
  )
}
