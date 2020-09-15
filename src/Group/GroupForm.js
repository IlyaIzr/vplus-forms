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
    // currentOption: { name: '', id: '', share: 100 },
    investors: [  //list of included investors
      { name: 'Pyotr', id: 'userId12412', share: 100 }
    ],
    isEditable: true,
    isRequired: true
  })
  const onInvestorValueChange = (e, index) => {

    const investors = [...investorsField.investors]
    investors[index] = { ...investors[index], [e.target.name]: e.target.value }
    // Set according name to obj. I know... it's bad
    if (e.target.name === 'id') {
      const currentOption = investorsField.options.filter(option => option.id == e.target.value)
      investors[index] = { ...investors[index], name: currentOption[0].name }
    }
    const newObj = {
      ...investorsField,
      investors
    }
    console.log(newObj.investors[0])
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


        {investorsField.investors.length ? investorsField.investors.map((field, index) => {
          return (
            <InvestorField key={field.id}
              field={field} changeFunc={onInvestorValueChange} index={index}
              options={investorsField.options} />
          )
        }) : null}
        <button className="ui button green" type="button">Добавить</button>

        <hr />


        <button type="submit" className="ui red button">Sub</button>
      </form>
    </div>
  )
}
