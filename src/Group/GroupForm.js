import React, { useEffect, useState } from 'react'
import CreateProject from './Draft'
import './Group.css'
// Fake data
import { InvestorField } from './InvestorField'
import { StringField } from '../components/StringField'
import { NumberField } from '../components/NumberField'
import { ManagerSubForm } from './ManagerSubForm'
import { numberFieldDefaultState, selectDefaultState, stringFieldDefaultState } from '../reusable'
let WS
let groupFormPayload = {}


export const GroupForm = () => {

  const formAPI = {
    groupForm: {
      callForm: (payload = {}) => {
        groupFormPayload = { ...payload }
        fetcher(groupFormPayload)
      }
    }
  }
  window.formAPI = { ...window.formAPI, ...formAPI }

  const [groupNameField, setGroupNameField] = useState(stringFieldDefaultState)
  const onGroupNameChange = e => {
    const newObj = { ...groupNameField, value: e.target.value }
    setGroupNameField(newObj)
  }

  const [disciplineField, setDisciplineField] = useState(selectDefaultState)
  const onDisciplineChange = e => {
    const newObj = { ...disciplineField, value: e.target.value }
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
      share: 100
    }]
    if (investorsField.investors.length) {
      investors[0].share -= 1
      investors[investors.length - 1].share = 1
    }
    setInvestorsField({
      ...investorsField, investors
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
    console.log(managersField.payOptions[0])
    const managers = [...managersField.managers, {
      name: managersField.options[0] && managersField.options[0].name,
      id: managersField.options[0] && managersField.options[0].id,
      payMethodId: managersField.payOptions[0] && managersField.payOptions[0].payMethodId,
      payValue: managersField.payOptions[0] && managersField.payOptions[0].payValueField && managersField.payOptions[0].payValueField.value
    }]
    setManagersField({
      ...managersField, managers
    })
  }
  const onManagerChange = (name, id, index) => {
    const managers = [...managersField.managers]
    managers[index] = { ...managers[index], name, id }
    setManagersField({ ...managersField, managers })
  }
  const onManagerValueChange = (name, value, index) => {
    const managers = [...managersField.managers]
    managers[index] = { ...managers[index], [name]: value }
    setManagersField({ ...managersField, managers })
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
  const onPlayerSumFieldChange = e => setPlayerSumField({ ...playerSumField, value: e.target.value })
  const [buyInsField, setBuyInsField] = useState(numberFieldDefaultState)
  const onBuyInsFieldChange = e => setBuyInsField({ ...buyInsField, value: e.target.value })

  //two-sides slider
  const [playerRisk, setPlayerRisk] = useState(50)
  const [playerRiskField, setPlayerRiskField] = useState({ ...numberFieldDefaultState, max: 100, min: 0 })
  const [fundRiskField, setFundRiskField] = useState({ ...numberFieldDefaultState, max: 100, min: 0 })
  const onRiskChange = e => {
    if (e.target.name === 'playerRiskField' || e.target.name === 'playerRisk') {
      setPlayerRisk(e.target.value)
      setPlayerRiskField({ ...playerRiskField, value: e.target.value })
      setFundRiskField({ ...fundRiskField, value: 100 - e.target.value })
    } else if (e.target.name === 'fundRiskField') {
      setPlayerRisk(100 - e.target.value)
      setPlayerRiskField({ ...playerRiskField, value: 100 - e.target.value })
      setFundRiskField({ ...fundRiskField, value: e.target.value })
    }
  }

  const [rollbackField, setRollbackField] = useState({ ...numberFieldDefaultState, max: 100, min: 0 })
  const onRollbackChange = e => {
    setRollbackField({ ...rollbackField, value: e.target.value })
  }
  //Error msg  
  const [errorMsg, setErrorMsg] = useState(null)

  const onSubmit = async e => {
    e.preventDefault();
    const formData = {
      groupNameField,
      disciplineField,
      investorsField,
      managersField,
      contractField,
      tournamentsField,
      playerSumField,
      buyInsField,
      playerRiskField,
      fundRiskField,
      rollbackField
    }
    console.log(formData)
    const response = await WS.send('groups', 'groupFormData', formData)
    response ? setErrorMsg(false) : setErrorMsg('@(Ошибка подключения)')
  }

  const onReset = () => {
    setGroupNameField({ ...groupNameField, value: '' })
    setDisciplineField({ ...disciplineField, value: [] })
    setInvestorsField({ ...investorsField, investors: [] })
    setManagersField({ ...managersField, managers: [] })
    setTournamentsField({ ...tournamentsField, value: '' })
    setPlayerSumField({ ...playerSumField, value: '' })
    setBuyInsField({ ...buyInsField, value: '' })
    setPlayerRiskField({ ...playerRiskField, value: 50 })
    setFundRiskField({ ...fundRiskField, value: 50 })
    setPlayerRisk(50)
    setRollbackField({ ...rollbackField, value: 0 })
  }


  const fetcher = async (payload = {}) => {
    WS = new WebsocketPromiseLiteClient({
      url: 'ws://localhost:5555'
    })
    await WS.connectionEstablished()
    console.log('form called with payload: ')
    console.log(payload)
    const response = await WS.send('groups', 'groupFormData', payload)
    response ? setErrorMsg(false) : setErrorMsg('@(Ошибка подключения)')
    const {
      groupFieldMeta,
      disciplineFieldMeta,
      investorsFieldMeta,
      managersFieldMeta,
      tournamentsNumberMeta,
      playerSumNumberMeta,
      playerBuyInsMeta,
      playerRiskMeta,
      fundRiskMeta,
      rollbackMeta } = response
    groupFieldMeta && setGroupNameField(groupFieldMeta)
    disciplineFieldMeta && setDisciplineField(disciplineFieldMeta)
    investorsFieldMeta && setInvestorsField(investorsFieldMeta)
    managersFieldMeta && setManagersField(managersFieldMeta)
    tournamentsNumberMeta && setTournamentsField(tournamentsNumberMeta)
    playerSumNumberMeta && setPlayerSumField(playerSumNumberMeta)
    playerBuyInsMeta && setBuyInsField(playerBuyInsMeta)
    // slider sets
    playerRiskMeta && setPlayerRiskField(playerRiskMeta)
    fundRiskMeta && setFundRiskField(fundRiskMeta)
    playerRiskMeta && setPlayerRisk(playerRiskMeta.value)
    // end of slider sets
    rollbackMeta && setRollbackField(rollbackMeta)
    // WS.close()
  }

  useEffect(() => {
    fetcher(groupFormPayload)
  }, [])


  return (
    <div>
      <form onSubmit={onSubmit} onReset={onReset} className="ui form">

        {//Error message
          errorMsg && <div className="ui alert message">
            <h5 className="text red">{errorMsg ? errorMsg : '@(Ошибка соединения с сервером)'}</h5>
          </div>
        }

        <StringField isRequired={groupNameField.isRequired} value={groupNameField.value}
          onChange={onGroupNameChange} isEditable={groupNameField.isEditable} label="@(Группа)"
          name="group"
        />

        <div className={disciplineField.isRequired ? "required field" : "field"}>
          <label htmlFor="discipline">@(Дисциплина)</label>
          <select name="discipline" onChange={onDisciplineChange} className="ui dropdown"
            required={disciplineField.isRequired} disabled={!disciplineField.isEditable}
            value={disciplineField.value.id}
          >
            {disciplineField.options.length && disciplineField.options.map((discipline) => {
              return (
                <option value={discipline.id} key={discipline.id}>{discipline.name}</option>
              )
            })}
          </select>
        </div>

        <div className="ui horizontal divider">@(Руководящий состав)</div>

        <div className="ui segment">
          <h4 className="ui title">@(Назначьте одного или нескольких инвесторов)</h4>
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
          >@(Добавить)</button>
          <span className={total == 100 ? "ui green text" : "ui red text"} htmlFor="total">
            {'@(Суммарно процентов): ' + total}
          </span>
          <div className="ui checkbox">
            <input type="checkbox" name="total" checked={total == 100} required />
          </div>
        </div>

        <div className="ui segment">
          <h4 className="ui title">@(Назначьте одного или нескольких управляющих)</h4>
          {managersField.managers && managersField.managers.length ? managersField.managers.map((field, index) => {
            const isDeletable = managersField.managers.length > 1
            return (<ManagerSubForm key={index + 'manag'}
              manager={field} options={managersField.options} payOptions={managersField.payOptions}
              isEditable={managersField.managersField}
              changeFunc={onManagerValueChange} removeFunc={removeManagerField} onManagerChange={onManagerChange}
              index={index} isDeletable={isDeletable}
            />
            )
          }) : null}
          <button type="button" onClick={addManagerField}
            className={managersField.options <= managersField.managers ? "ui button green disabled" : "ui button green"}
          >@(Добавить)</button>

        </div>

        <div className="ui segment">
          <CreateProject createProject={onChangeContract} />
        </div>

        <div className="ui segment">
          <h3 className="title">@(Шаблон пакета)</h3>
          <div className="three fields">

            <NumberField isRequired={tournamentsField.isRequired} isEditable={tournamentsField.isEditable}
              label="@(Количество турниров)" value={tournamentsField.value} onChange={onTournamentsFieldChange}
              min={tournamentsField.min} max={tournamentsField.max}
            />

            <div className={`field ${playerSumField.isRequired && 'required'}`} >
              <label htmlFor="playerSumField">@(Сумма игрока в свой БР)</label>
              <input type="number" value={playerSumField.value} required={playerSumField.isRequired}
                disabled={!playerSumField.isEditable} min={playerSumField.min} max={playerSumField.max}
                onChange={onPlayerSumFieldChange}
              />
            </div>

            <div className={`field ${buyInsField.isRequired && 'required'}`} >
              <label htmlFor="buyInsField">@(Кол-во байинов на счету)</label>
              <input type="number" value={buyInsField.value} required={buyInsField.isRequired}
                disabled={!buyInsField.isEditable} min={buyInsField.min} max={buyInsField.max}
                onChange={onBuyInsFieldChange}
              />
            </div>

          </div>

          <h4 className="title">@(Заявленные доли рисков)</h4>
          <div className="three fields">

            <div className={`field ${playerRiskField.isRequired && 'required'}`} >
              <label htmlFor="playerRiskField">@(Игрок)</label>
              <input type="number" value={playerRisk} required={playerRiskField.isRequired}
                disabled={!playerRiskField.isEditable} min={playerRiskField.min} max={playerRiskField.max}
                onChange={onRiskChange} name='playerRiskField'
              />
            </div>

            <div className="field positionRelative">
              <input type="range" name="playerRisk" value={playerRisk} onChange={onRiskChange} className="inputRange" />
            </div>

            <div className={`field ${fundRiskField.isRequired && 'required'}`} >
              <label htmlFor="fundRiskField">@(Фонд)</label>
              <input type="number" value={100 - playerRisk} required={fundRiskField.isRequired}
                disabled={!fundRiskField.isEditable} min={fundRiskField.min} max={fundRiskField.max}
                onChange={onRiskChange} name='fundRiskField'
              />
            </div>

          </div>

          <div className="two fields">

            <div className={`field ${rollbackField.isRequired && 'required'}`} >
              <label htmlFor="rollbackField">@(Откат игрока)</label>
              <input type="number" value={rollbackField.value} required={rollbackField.isRequired}
                disabled={!rollbackField.isEditable} min={rollbackField.min} max={rollbackField.max}
                onChange={onRollbackChange} name='rollbackField'
              />
            </div>

            <div className="field positionRelative">
              <input type="range" name="rollbackRange" value={rollbackField.value} onChange={onRollbackChange}
                className="inputRange" />
            </div>

          </div>

        </div>

        <button className="ui red button" type="reset">@(Сбросить поля)</button>
        <button type="submit" className={`ui teal button ${(!managersField.managers.length) && 'disabled'}`}>
          @(Отправить)
        </button>
      </form>

    </div>
  )
}
