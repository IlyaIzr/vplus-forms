import React, { useEffect, useState } from 'react'

export const ManagerField = ({ field, options, isDeletable, changeFunc, removeFunc, index, payOptions }) => {
  const onChange = e => changeFunc(e, index)
  const onClick = () => removeFunc(index)
  const payPick = (e) => {
    changeFunc(e, index)
    setIsExpanded(true)
    const payOptionNeeded = payOptions.filter((option) => option.fields[0].value == e.target.value)
    setPayForm(payOptionNeeded[0])
  }
  const onPayFormChange = e => {
    changeFunc(e, index)
    const fields = [...payForm.fields]
    const fieldIndex = fields.findIndex(field => field.name == e.target.name)
    fields[fieldIndex] = { ...payForm.fields[fieldIndex], value: e.target.value }
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

  useEffect(() => {
    if (field.payMethodName) {
      const e = { target: { value: field.payMethodName } }
      payPick(e)
    }
  }, [])
  useEffect(() => {
    if (payForm.fields.length) {
      const e = { target: { value: payForm.fields[0].value, name: 'payMethodName' } }
      const e2 = { target: { value: payForm.fields[1].value, name: 'payValue' } }
      changeFunc(e2, index)
    }
  }, [payForm])


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
        <label htmlFor="payMethodName">Способ оплаты</label>
        <select name="payMethodName" className="ui dropdown"
          required onChange={payPick} value={field.payMethodName}
        >
          <option value='' key='emptyOpt'></option>
          {payOptions.length && payOptions.map((payOption, index) => {  // TODO index of 0 can cause problems
            return (
              <option value={payOption.fields[0].value} key={payOption.name + index}>{payOption.name}</option>
            )
          })}
          <option value={field.payMethodName} key='customName'>{field.payMethodName}</option>
        </select>
      </div>

      {isExpanded && <div className="ui fragment">
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
