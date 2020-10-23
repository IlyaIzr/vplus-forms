import React from 'react'
import { NumberField } from '../components/NumberField'
import { StringField } from '../components/StringField'

export const Description = ({ state, setState }) => {
  const addField = () => {
    const mutable = [...state.value, { description: '', claimAmount: '' }]
    setState({ ...state, value: mutable })
  }
  const deleteField = (index) => {
    const mutable = [...state.value]
    mutable.splice(index, 1)
    setState({ ...state, value: mutable })
  }
  return (
    <div className="ui segment">
      {state.value && Boolean(state.value.length) && state.value.map((item, index) => {
        const onChange = e => {
          const mutable = [...state.value]
          mutable[index][e.target.name] = e.target.value
          setState({ ...state, value: mutable })
        }
        const onDelete = () => deleteField(index)
        return (<div className="ui segment two fields" key={index + 'casess'}>
          <StringField label="@(Case description)" name="description"
            isRequired={true}
            value={item.description} onChange={onChange}
          />

          <NumberField label="@(Claim amount $)" name="claimAmount"
            isRequired={true}
            value={item.claimAmount} onChange={onChange} step={0.01}
          />
          <button className={`ui button red tiny ${!state.isEditable && ' disabled'}`}
            onClick={onDelete} type="button">x</button>

        </div>)
      })}
      <button className={`ui button green small ${!state.isEditable && ' disabled'}`}
        type="button" onClick={addField}>@(Добавить)</button>
    </div>
  )
}
