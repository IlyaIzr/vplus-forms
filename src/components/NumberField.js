import React from 'react'

export const NumberField = ({
  isRequired = false,
  name = '',
  label = false,
  min = false,
  max = false,
  step = false,
  isEditable = true,
  value,
  onChange
}) => {
  return (
    <div className={`field ${isRequired && 'required'}`} >
      {label && <label htmlFor={name}>{label}</label>}
      <input type="number" name={name} value={value}
        required={isRequired} disabled={!isEditable} onChange={onChange}
        min={min ? min : undefined} max={max ? max : undefined} step={step ? step : undefined}
      />
    </div>
  )
}
