import React from 'react'
import { SelectCreatableField } from '../components/SelectCreatableField'
import { StringField } from '../components/StringField'

export const WMSubForm = ({ state, setState }) => {

  const addField = () => {
    const mutable = [...state.value, { WMID: '', WMWallets: [] }]
    setState({ ...state, value: mutable })
  }
  const deleteField = (index) => {
    const mutable = [...state.value]
    mutable.splice(index, 1)
    setState({ ...state, value: mutable })
  }

  return (
    <div className="ui segment">
      <label htmlFor="">WebMoney</label>
      <br />
      {        state.value && Boolean(state.value.length) && state.value.map((field, index) => {

        const onChange = e => {
          const mutable = [...state.value]
          mutable[index][e.target.name] = e.target.value
          setState({ ...state, value: mutable })
        }
        const onSelect = options => {
          const mutable = [...state.value]
          mutable[index].WMWallets = options
          setState({ ...state, value: mutable })
        }
        const onDelete = () => deleteField(index)
        return (
          <div className="ui segment two fields" key={index + 'wmoney'}>

            <StringField label="@(WMID)" name="WMID"
              isRequired={false}
              value={field.WMID} onChange={onChange}
            />

            <SelectCreatableField label="@(Кошельки)" name="WMWallets"
              value={field.WMWallets} onChange={onSelect} isMulti={true}
            />

            <button className={`ui button red tiny ${!state.isEditable && ' disabled'}`}
              onClick={onDelete} type="button">x</button>

          </div>
        )
      })}
      <button className={`ui button green small ${!state.isEditable && ' disabled'}`}
        type="button" onClick={addField}>@(Добавить)</button>

    </div>
  )
}
