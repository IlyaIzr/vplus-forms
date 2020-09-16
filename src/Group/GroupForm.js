import React, { useEffect, useState } from 'react'
// Fake data
import { groupFieldMeta, timeout, disciplineFieldMeta, investorsMeta, managersMeta, investorsOptions } from './fakeData';
import { InvestorField } from './InvestorField';
import { ManagerField } from './ManagerField';
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
    investors: [  //list of included investors
      { name: '', id: '', share: 100 }
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
    setInvestorsField(newObj)
  }
  const addField = () => {
    const investors = [...investorsField.investors, {
      name: investorsField.options[0].name,
      id: investorsField.options[0].id,
      share: 1
    }]
    investors[0].share -= 1
    setInvestorsField({
      ...investorsField, investors //TODO a way to generate id
    })
  }
  const removeField = index => {
    const investors = [...investorsField.investors]
    investors.splice(index, 1)
    setInvestorsField({ ...investorsField, investors })
  }
  let total = 0; investorsField.investors.map(investor => total += Number(investor.share))

  const [managersField, setManagersField] = useState({
    options: [],
    payOptions: [],
    managers: [
      { name: '', id: '' },
    ],
    isEditable: true,
    isRequired: true
  })
  const removeManagerField = index => {
    const managers = [...managersField.managers]
    managers.splice(index, 1)
    setManagersField({ ...managersField, managers })
  }
  const onManagerValueChange = (e, index) => {
    const managers = [...managersField.managers]
    managers[index] = { ...managers[index], [e.target.name]: e.target.value }
    
    if (e.target.name === 'id') {
      const currentOption = managersField.options.filter(option => option.id == e.target.value)
      managers[index] = { ...managers[index], name: currentOption[0].name }
    }
    const newObj = {
      ...managersField,
      managers
    }
    console.log(newObj.managers)
    setManagersField(newObj)
  }



  useEffect(() => {
    setTimeout(() => {
      setGroupNameField(groupFieldMeta)
      setDisciplineField(disciplineFieldMeta)
      setInvestorsField(investorsMeta)
      setManagersField(managersMeta)
    }, timeout);
  }, [])


  return (
    <div className="ui conainer" style={{ padding: '20px' }}>
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
        <hr />

        <div className="ui segment">
          <h4 className="ui title">Назначьте одного или нескольких инвесторов</h4>
          {investorsField.investors.length ? investorsField.investors.map((field, index) => {
            const isDeletable = investorsField.investors.length > 1
            return (
              <InvestorField key={field.id + index}
                field={field} changeFunc={onInvestorValueChange} index={index}
                options={investorsField.options} removeFunc={removeField} isDeletable={isDeletable}
              />
            )
          }) : null}
          <button type="button" onClick={addField}
            className={investorsField.options <= investorsField.investors ? "ui button green disabled" : "ui button green"}
          >Добавить</button>
          <span className={total == 100 ? "ui green text" : "ui red text"}>
            {'Суммарно процентов: ' + total}
          </span>
        </div>

        <div className="ui segment">
          <h4 className="ui title">Назначьте одного или нескольких управляющих</h4>
          {managersField.managers && managersField.managers.length ? managersField.managers.map((field, index) => {
            const isDeletable = managersField.managers.length > 1
            return (
              <ManagerField key={field.id+index}
                changeFunc={onManagerValueChange} index={index} field={field} payOptions={managersField.payOptions}
                options={managersField.options} removeFunc={removeManagerField} isDeletable={isDeletable}
              />
            )
          }) : null}

        </div>


        <button type="submit" className="ui red button">Sub</button>
      </form>
    </div>
  )
}
