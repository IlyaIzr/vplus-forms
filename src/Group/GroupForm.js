import React, { useEffect, useState } from 'react'
// Fake data
import { groupFieldMeta, timeout, disciplineFieldMeta, investorsMeta } from './fakeData';
import { InvestorField } from './InvestorField';
const stringFieldDefaultState = {
  value: '',
  isEditable: true,
  isRequired: true
}

const onSubmit = e => {
  e.preventDefault(); console.log(e)
};



export const GroupForm = () => {

  const [groupNameField, setGroupNameField] = useState(stringFieldDefaultState)
  const onGroupNameChange = e => {
    const newObj = { ...groupNameField, value: e.target.value }
    setGroupNameField(newObj)
  }

  const [disciplineField, setDisciplineField] = useState({
    options: [],
    defOption: false, // mutable 
    isEditable: true,
    isRequired: true
  })
  const onDisciplineChange = e => {
    const newObj = { ...disciplineField, defOption: e.target.value }
    setDisciplineField(newObj)
  }

  const [investorsField, setInvestorsField] = useState({
    options: [],  // list of possible investors
    currentOption: { name: '', id: '', share: 100 },
    investors: [], //list of included investors
    isEditable: true,
    isRequired: true
  })
  const onInvestorValueChange = e => {
    const newObj = {
      ...investorsField,
      currentOption: { ...investorsField.currentOption, [e.target.name]: e.target.value }
    }
    setInvestorsField(newObj)
  }


  useEffect(() => {
    setTimeout(() => {
      setGroupNameField(groupFieldMeta)
      setDisciplineField(disciplineFieldMeta)
      setInvestorsField(investorsMeta)
    }, timeout);
  }, [])


  return (
    <div className="ui conainer">
      <form onSubmit={onSubmit} className="ui form">

        <div className={groupNameField.isRequired ? "required field" : "field"}>
          <label htmlFor="group">Группа</label>
          <input type="text" name="group" value={groupNameField.value} onChange={onGroupNameChange}
            required={groupNameField.isRequired} disabled={!groupNameField.isEditable}
          />
        </div>

        <div className={disciplineField.isRequired ? "required field" : "field"}>
          <label htmlFor="discipline">Дисциплина</label>
          <select name="discipline" onChange={onDisciplineChange} className="ui dropdown"
            required={disciplineField.isRequired} disabled={!disciplineField.isEditable}
            value={disciplineField.defOption.id}
          >
            {disciplineField.options.length && disciplineField.options.map((discipline) => {
              return (
                <option value={discipline.id} key={discipline.id}>{discipline.name}</option>
              )
            })}
          </select>
        </div>

        <h3 className="ui title">Руководящий состав</h3>

        <InvestorField field={investorsField} changeFunc={onInvestorValueChange} />
        <button className="ui button green" type="button">Добавить</button>

        <hr />

        
        <button type="submit" className="ui red button">Sub</button>
      </form>
    </div>
  )
}
