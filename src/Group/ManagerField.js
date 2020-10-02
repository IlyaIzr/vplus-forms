import React, { useEffect, useState } from 'react'

export const ManagerField = ({ field, options, isDeletable, changeFunc, removeFunc, index, payOptions }) => {
  const onChange = e => changeFunc(e, index)
  const onClick = () => removeFunc(index)
  const payPick = (e) => {
    changeFunc(e, index)
    setIsExpanded(true)
    const optionsSearchArray = payOptions.filter((option) => option.payMethodId == e.target.value)
    const payOptionNeeded = optionsSearchArray[0]
    if (field.payValue) { // if manager has payValue seted, then overrite that value to be second fields value
      payOptionNeeded.fields[1].value = field.payValue
    }
    if (field.payMethodId === 'custom' && field.payMethodName) {  //set payMethodName if it's custom payMethod
      payOptionNeeded.fields[0].value = field.payMethodName
    }
    console.log(payOptionNeeded)
    setPayForm(payOptionNeeded)
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
    if (field.payMethodId) {
      const e = { target: { value: field.payMethodId } }
      payPick(e)
    }
  }, [])
  useEffect(() => {
    if (payForm && payForm.fields && payForm.fields.length) {
      const e = { target: { value: payForm.fields[0].value, name: 'payMethodName' } }
      const e2 = { target: { value: payForm.fields[1].value, name: 'payValue' } }
      changeFunc(e2, index)
    }
  }, [payForm])


  return (
    <div className="ui fields">
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
        <label htmlFor="payMethodId">@(Способ оплаты)</label>
        <select name="payMethodId" className="ui dropdown"
          required onChange={payPick} value={field.payMethodId}
        >
          <option value='' key='emptyOpt'></option>
          {payOptions && Boolean(payOptions.length) && payOptions.map((payOption, index) => {  // TODO index of 0 can cause problems
            return (
              <option value={payOption.payMethodId} key={payOption.label + index}>{payOption.label}</option>
            )
          })}
        </select>
      </div>

      {isExpanded && <div className="ui fragment">
        {payForm && payForm.fields && Boolean(payForm.fields.length) && payForm.fields.map((field) => {
          console.log(field.value)
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
        >@(Удалить)
        </button>
      </div>
    </div>
  )
}
