import React, { useEffect, useState } from 'react'
// Fake data
import { groupFieldMeta, timeout, disciplineFieldMeta } from './fakeData';
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

  useEffect(() => {
    setTimeout(() => {
      setGroupNameField(groupFieldMeta)
      setDisciplineField(disciplineFieldMeta)
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


        <button type="submit" className="ui red button">Sub</button>
      </form>
    </div>
  )
}
