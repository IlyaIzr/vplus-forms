import React, { useEffect, useState } from 'react'
import CreateProject from './Draft';
// Fake data
import { groupFieldMeta, timeout, disciplineFieldMeta, investorsMeta, managersMeta,
   playerSumNumberMeta, tournamentsNumberMeta, playerBuyInsMeta } from './fakeData';
import { InvestorField } from './InvestorField';
import { ManagerField } from './ManagerField';
const stringFieldDefaultState = {
  value: '',
  isEditable: true,
  isRequired: true
}
const numberFieldDefaultState = {
  value: '',
  isEditable: true,
  isRequired: true,
  min: '',
  max: ''
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
  const addManagerField = () => {
    const managers = [...managersField.managers, {
      name: managersField.options[0].name,
      id: managersField.options[0].id,
      payMethodName: managersField.payOptions[0].fields[0].value,
      payValue: managersField.payOptions[0].fields[1].value
    }]
    setManagersField({
      ...managersField, managers
    })
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
    setManagersField(newObj)
  }

  const [contractField, setContractField] = useState(null)
  const onChangeContract = (value) => {
    setContractField(value);
    // console.log(contractField) //works
  }

  const [tournamentsField, setTournamentsField] = useState(numberFieldDefaultState)
  const onTournamentsFieldChange = e => setTournamentsField({
    ...tournamentsField, value: e.target.value
  })
  const [playerSumField, setPlayerSumField] = useState(numberFieldDefaultState)
  const onPlayerSumFieldChange = e => setPlayerSumField({
    ...playerSumField, value: e.target.value
  })  
  const [buyInsField, setBuyInsField] = useState(numberFieldDefaultState)
  const onBuyInsFieldChange = e => setBuyInsField({
    ...buyInsField, value: e.target.value
  })

  useEffect(() => {
    setTimeout(() => {
      setGroupNameField(groupFieldMeta)
      setDisciplineField(disciplineFieldMeta)
      setInvestorsField(investorsMeta)
      setManagersField(managersMeta)
      setTournamentsField(tournamentsNumberMeta)
      setPlayerSumField(playerSumNumberMeta)
      setBuyInsField(playerBuyInsMeta)
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
              <ManagerField key={field.id + index}
                changeFunc={onManagerValueChange} index={index} field={field} payOptions={managersField.payOptions}
                options={managersField.options} removeFunc={removeManagerField} isDeletable={isDeletable}
              />
            )
          }) : null}
          <button type="button" onClick={addManagerField}
            className={managersField.options <= managersField.managers ? "ui button green disabled" : "ui button green"}
          >Добавить</button>

        </div>

        <div className="ui segment">
          <CreateProject createProject={onChangeContract} />
        </div>

        <div className="ui segment">
          <h3 className="title">Шаблон пакета</h3>
          <div className="three fields">

            <div className={`field ${tournamentsField.isRequired && 'required'}`} >
              <label htmlFor="tournamentsField">Количество турниров</label>
              <input type="number" value={tournamentsField.value} required={tournamentsField.isRequired}
                disabled={!tournamentsField.isEditable} min={tournamentsField.min} max={tournamentsField.max}
                onChange={onTournamentsFieldChange}
              />
            </div>

            <div className={`field ${playerSumField.isRequired && 'required'}`} >
              <label htmlFor="playerSumField">Сумма игрока в свой БР</label>
              <input type="number" value={playerSumField.value} required={playerSumField.isRequired}
                disabled={!playerSumField.isEditable} min={playerSumField.min} max={playerSumField.max}
                onChange={onPlayerSumFieldChange}
              />
            </div>
            
            <div className={`field ${buyInsField.isRequired && 'required'}`} >
              <label htmlFor="buyInsField">Кол-во байинов на счету</label>
              <input type="number" value={buyInsField.value} required={buyInsField.isRequired}
                disabled={!buyInsField.isEditable} min={buyInsField.min} max={buyInsField.max}
                onChange={onBuyInsFieldChange}
              />
            </div>

          </div>

          
        </div>

        <button type="submit" className="ui red button">Sub</button>
      </form>

    </div>
  )
}
