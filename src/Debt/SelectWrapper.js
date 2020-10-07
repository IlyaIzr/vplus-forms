import React from 'react'
import { SelectCreatableField } from '../components/SelectCreatableField'

export const SelectWrapper = ({ state, setState, label='', name=label }) => {
  const onChange = options => setState({...state, value: options})
  return (
    <SelectCreatableField name={name} label={"@("+label+")"}
      isEditable={state.isEditable} isRequired={state.isRequired}
      value={state.value} onChange={onChange} 
      options={state.options} isMulti={true}
    />
  )
}
