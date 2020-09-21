import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()

export const SelectField = ({
  isRequired = false,
  isEditable = true,
  name = '',
  isMulti = false,
  onChange,
  value,
  label,
  options,
  optionWrapper = false
}) => {
  return (
    <div className={isRequired ? "required field" : "field"}>
      <div className="field">
        {label && <label htmlFor={name}>{label}</label>}
        <Select options={options}
          components={optionWrapper ? { Option: optionWrapper } : animatedComponents}
          name={name} onChange={onChange} required={isRequired} disabled={!isEditable}
          value={value} isMulti={isMulti}
        />
      </div>
    </div>
  )
}

/**
 * option wrapper example:
 *
 *  const OptionWraper = (props) => {
 *    return (<Option {...props}>
 *      {props.data.label}
 *      <br />
 *      {props.data.subtitle}
 *    </Option>
 *    )
 *  };
 */