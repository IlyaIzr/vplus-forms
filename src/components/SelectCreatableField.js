import React from 'react'
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()

export const SelectCreatableField = ({
  isRequired = false,
  isEditable = true,
  name = '',
  isMulti = false,
  onChange,
  value,
  label,
  options=false,
  optionWrapper = false
}) => {
  const isFilledF = () => {
    if (Array.isArray(value)) {
      if (value.length) { return 'a' } else { return '' }
    } else {
      if (value && value.value) { return 'a' } else { return '' }
    }
  }
  let isFilled = isFilledF()
  return (
    <div className={isRequired ? "required field" : "field"}>
      {label && <label htmlFor={name}>{label}</label>}
      <CreatableSelect options={options}
        components={optionWrapper ? { Option: optionWrapper } : animatedComponents}
        name={name} onChange={onChange} isDisabled={!isEditable}
        value={value} isMulti={isMulti} isClearable
      />
      {isRequired && <input type="text" value={isFilled} required={isRequired}
        style={{ opacity: 0, height: 0, padding: 0 }} tabIndex={-1} autoComplete="off"
      />}
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