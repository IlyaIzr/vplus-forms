import React, { useEffect, useState } from 'react'
import { selectDefaultState, stringFieldDefaultState } from '../reusable'
import { StringField } from '../components/StringField'
import { components } from 'react-select';
import './Settings.css'

let WS
let settingsPayload = {}

import { SelectField } from '../components/SelectField'
import { EmployeeEditor } from './EmployeeEditor'
import { Submit } from '../components/Submit';

export const SettingsForm = () => {

  const formAPI = {
    settingsForm: {
      callForm: (payload = {}) => {
        settingsPayload = { ...payload }
        fetcher(settingsPayload)
      }
    }
  }
  window.formAPI = { ...window.formAPI, ...formAPI }

  const [fundField, setFundField] = useState('')
  const [eMailField, setEMailField] = useState('')
  const [skypeField, setSkypeField] = useState(stringFieldDefaultState)
  const onSkypeChange = e => setSkypeField({ ...skypeField, value: e.target.value })
  //Tabs
  const [activeTab, setActiveTab] = useState(null)
  const onTabClick = e => setActiveTab(e.target.name)
  const onSkypeSubmit = async e => {
    e.preventDefault()
    const response = await sendSkype(skypeField.value)    
    if (response.status === 'OK') {
      setErrorMsg(false)
      response.message ? setSubmitMsg(response.message) : setSubmitMsg('@(Успех)')
    } else response.message ? setErrorMsg(response.message) : setErrorMsg('@(Ошибка)')
  }
  //Alerts
  const [errorMsg, setErrorMsg] = useState(null)
  const [submitMsg, setSubmitMsg] = useState(null)
  //Tab 1, passwords
  const [oldPWord, setOldPWord] = useState('')
  const onOldPWord = e => setOldPWord(e.target.value)
  const [newPWord, setNewPWord] = useState('')
  const onNewPWord = e => setNewPWord(e.target.value)
  const [newPWord2, setNewPWord2] = useState('')
  const onNewPWord2 = e => setNewPWord2(e.target.value)
  const [pWordStatus, setPWordStatus] = useState(null)
  const submitPWord = async e => {
    e.preventDefault()
    e.target.checkValidity()
    const data = {
      email: eMailField,
      oldPassword: oldPWord,
      newPassword: newPWord,
      payload: settingsPayload
    }
    console.log(data)
    const response = await passwordChange(data)
    if (response.status === 'OK') {
      resetPWords()
      response.message ? setPWordStatus(response.message) : setPWordStatus('@(Успех)')
    } else response.message ? setErrorMsg(response.message) : setErrorMsg('@(Ошибка)')
  }
  const resetPWords = () => {
    setOldPWord('')
    setNewPWord('')
    setNewPWord2('')
  }

  // Tab 2, edit employees
  const [employeesField, setEmployeesField] = useState(selectDefaultState)
  const onEmployeeChange = option => {
    console.log(option)
    setEmployeesField({ ...employeesField, value: option })
    setUpdateStatus(null)
    employeeRequest(option)
  }
  const [employeeNameField, setEmployeeNameField] = useState(stringFieldDefaultState)
  const [employeeEMailField, setEmployeeEMailField] = useState(stringFieldDefaultState)
  const [employeeFundsField, setEmployeeFundsField] = useState(selectDefaultState)
  const [updateStatus, setUpdateStatus] = useState(null)

  const deleteEmployee = async () => {
    const result = await employeeDeleteRequest(employeeNameField.value, employeeEMailField.value)
    if (result.status === 'OK') {
      resetEmployeeEdit()
      result.message ? setUpdateStatus(result.message) : setUpdateStatus('@(Успех)')
      await employeesListRequest()
    } else setErrorMsg('@(Ошибка при удалении работника)')
  }
  const submitEmployee = async e => {
    e.preventDefault()
    e.target.checkValidity()
    const data = {
      employeeNameField,
      employeeEMailField,
      employeeFundsField,
    }
    console.log('WE NEED TAT: ')
    console.log(data)
    const response = await sendEmployeeData(employeeNameField.value, employeeEMailField.value,
      employeeFundsField.value, 'employeeUpdate')
    if (response.status === 'OK') {
      resetEmployeeEdit()
      response.message ? setUpdateStatus(response.message) : setUpdateStatus('@(Успех)')
    } else response.message ? setErrorMsg(response.message) : setErrorMsg('@(Ошибка)')

  }
  const resetEmployeeEdit = () => {
    setEmployeesField({ ...employeesField, value: null })
    setEmployeeNameField({ ...employeeNameField, value: null })
    setEmployeeEMailField({ ...employeeEMailField, value: null })
    setEmployeeFundsField({ ...employeeFundsField, value: null })
    setUpdateStatus(null)
    setErrorMsg(null)
  }
  // Tab 3, add employee
  const [addEmployeeNameField, setaddEmployeeNameField] = useState(stringFieldDefaultState)
  const [addEmployeeEMailField, setaddEmployeeEMailField] = useState(stringFieldDefaultState)
  const [addEmployeeFundsField, setaddEmployeeFundsField] = useState(selectDefaultState)
  const [createStatus, setCreateStatus] = useState(null)

  const submitEmployeeCreation = async e => {
    e.preventDefault()
    e.target.checkValidity()
    const data = {
      employeeNameField: addEmployeeNameField,
      employeeEMailField: addEmployeeEMailField,
      employeeFundsField: addEmployeeFundsField,
    }
    console.log(data)
    const response = await sendEmployeeData(addEmployeeNameField.value, addEmployeeEMailField.value,
      addEmployeeFundsField.value, 'employeeCreate')
    if (response.status === 'OK') {
      resetEmployeeCreation()
      response.message ? setCreateStatus(response.message) : setCreateStatus('@(Успех)')
    } else response.message ? setErrorMsg(response.message) : setErrorMsg('@(Ошибка)')
  }
  const resetEmployeeCreation = () => {
    setaddEmployeeNameField({ ...addEmployeeNameField, value: '' })
    setaddEmployeeEMailField({ ...addEmployeeEMailField, value: '' })
    setaddEmployeeFundsField({ ...addEmployeeFundsField, value: '' })
    setCreateStatus(null)
    setErrorMsg(null)
  }

  // Requests with effects
  const employeesListRequest = async () => {
    const response = await WS.send('settings', 'employeesList', {})
    if (response.status === 'OK') {
      setEmployeesField(response.employeeFieldMeta)
    } else {
      response.message ? setErrorMsg(response.message) : setErrorMsg('@(Ошибка запроса информации о работнике)')
    }
  }
  const employeeRequest = async option => {
    const payload = {
      fundName: fundField,
      fundEmail: eMailField,
      employeeId: option.value,
      employeeEmail: option.email,
      payload: settingsPayload
    }
    const response = await WS.send('settings', 'employeeData', payload)
    if (response.status === 'OK') {
      setErrorMsg(false)
      setEmployeeNameField(response.employeeNameFieldMeta)
      setEmployeeEMailField(response.employeeEMailFieldMeta)
      setEmployeeFundsField(response.employeeFundsFieldMeta)
    } else {
      response.message ? setErrorMsg(response.message) : setErrorMsg('@(Ошибка запроса информации о работнике)')
    }
  }
  const createEmployeeOptions = async () => {
    const payload = {
      fundName: fundField,
      fundEmail: eMailField,
      payload: settingsPayload
    }
    const response = await WS.send('settings', 'employeeCreateOptions', payload)
    if (response.status === 'OK') {
      response.employeeNameFieldMeta && setaddEmployeeNameField(response.employeeNameFieldMeta)
      response.employeeEMailFieldMeta && setaddEmployeeEMailField(response.employeeEMailFieldMeta)
      response.employeeFundsFieldMeta && setaddEmployeeFundsField(response.employeeFundsFieldMeta)
    } else setErrorMsg('@(Ошибка запроса информации о работнике)')
  }
  // Pure requests
  const sendSkype = async payload => {
    const response = await WS.send('settings', 'skypeUpdate', payload)
    return response
  }
  const passwordChange = async data => {
    const payload = { ...data, payload: settingsPayload }
    const response = await WS.send('settings', 'passwordUpdate', payload)
    return response
  }
  const sendEmployeeData = async (name, email, funds, method = 'employeeUpdate') => {
    // method = 'employeeUpdate' | 'employeeCreate'
    const payload = {
      fundName: fundField,
      fundEmail: eMailField,
      name, email, funds,
      payload: settingsPayload
    }
    const response = await WS.send('settings', method, payload)
    return response
  }
  const employeeDeleteRequest = async (name, email) => {
    const payload = {
      name, email,
      fundName: fundField,
      fundEmail: eMailField,
      payload: settingsPayload
    }
    console.log(payload)
    const response = await WS.send('settings', 'employeeDelete', payload)
    return response
  }


  const fetcher = async (payload = {}) => {
    WS = new WebsocketPromiseLiteClient({
      url: 'ws://localhost:5555'
    })
    await WS.connectionEstablished()
    const response = await WS.send('settings', 'settingsFormData', payload)
    if (response.status === 'OK') {
      response.fundName && setFundField(response.fundName)
      response.fundEmail && setEMailField(response.fundEmail)
      response.skypeFieldMeta && setSkypeField(response.skypeFieldMeta)
    } else setErrorMsg('@(Ошибка подключения)')
  }

  useEffect(() => {
    fetcher(settingsPayload)
  }, [])

  useEffect(() => {
    if (activeTab == 2) {
      if (!employeesField.options.length) employeesListRequest()
    } else if (activeTab == 3) {
      if (!addEmployeeFundsField.options.length) createEmployeeOptions()
    }
  }, [activeTab])

  return (
    <div>
      <form className="ui form" onSubmit={onSkypeSubmit}>

        <div className="inline field">
          <label htmlFor="fund">@(Фонд): </label>
          <p>{fundField}</p>
        </div>

        <div className="inline field">
          <label htmlFor="fund">@(Почта): </label>
          <p>{eMailField}</p>
        </div>

        <StringField label="Skype" name="skype"
          isEditable={skypeField.isEditable} isRequired={skypeField.isRequired}
          value={skypeField.value} onChange={onSkypeChange}
        />

        <Submit state={submitMsg} setState={setSubmitMsg} />

        {/* Tab control */}
        <div className="inline">
          <button className="ui button small teal" type="button" onClick={onTabClick} name="1">
            @(Изменить пароль)
            </button>
          <button className="ui button small teal" type="button" onClick={onTabClick} name="2">
            @(Редактировать сотрудников)
            </button>
          <button className="ui button small teal" type="button" onClick={onTabClick} name="3">
            @(Добавить сотрудника)
            </button>
        </div>

      </form>
      {/* Active tabs */}
      {/* Password change */}
      {activeTab == 1 && <form className="ui form" onSubmit={submitPWord} onReset={resetPWords}>

        <StringField name="password" label="@(Старый пароль)" type="password"
          isEditable={true} isRequired={true}
          value={oldPWord} onChange={onOldPWord}
        />

        <StringField name="password" label="@(Новый пароль)" type="password"
          isEditable={true} isRequired={true}
          value={newPWord} onChange={onNewPWord}
        />
        <StringField name="password" label="@(Повторите пароль)" type="password"
          isEditable={true} isRequired={true}
          value={newPWord2} onChange={onNewPWord2}
        />

        <div className="field inline disabled">
          <label htmlFor="pwordCheck">@(Пароли совпадают)</label>
          <input type="checkbox" required name="pwordCheck" className=""
            checked={newPWord === newPWord2 && newPWord} />
        </div>
        {pWordStatus && <div className="ui alert message">
          <h5 className="text red">{pWordStatus}</h5>
        </div>}

        <button className="ui button red small" type="reset">
          @(Сбросить)
        </button>

        <Submit state={submitMsg} setState={setSubmitMsg} />

      </form>}

      {/* Employee edit */}
      {activeTab == 2 && <form className="ui form" onSubmit={submitEmployee} onReset={resetEmployeeEdit}>

        {//Error message
          errorMsg && <div className="ui alert message">
            <h5 className="text red">@(Ошибка соединения с сервером)</h5>
          </div>
        }

        <SelectField label="@(Выбор сотрудника)" name="employee"
          isEditable={employeesField.isEditable} isRequired={employeesField.isRequired}
          value={employeesField.value} options={employeesField.options}
          onChange={onEmployeeChange} optionWrapper={OptionWraper}
        />

        {employeesField.value &&

          <EmployeeEditor
            nameState={employeeNameField} setNameState={setEmployeeNameField}
            eMailState={employeeEMailField} setEMailState={setEmployeeEMailField}
            fundsState={employeeFundsField} setFundsState={setEmployeeFundsField}
          />
        }
        {updateStatus && <div className="ui alert message">
          <h5 className="text red">{updateStatus}</h5>
        </div>}
        {employeesField.value && <>
          <button className="ui button small red" type="button" onClick={deleteEmployee}>
            @(Удалить сотрудника)
          </button>
          <button className="ui button red small" type="reset">
            @(Сбросить)
          </button>

          <Submit state={submitMsg} setState={setSubmitMsg} />
        </>
        }

      </form>}

      {/* Add employee */}
      {activeTab == 3 && <form className="ui form" onSubmit={submitEmployeeCreation} onReset={resetEmployeeCreation}>

        {//Error message
          errorMsg && <div className="ui alert message">
            <h5 className="text red">@(Ошибка соединения с сервером)</h5>
          </div>
        }

        <EmployeeEditor
          nameState={addEmployeeNameField} setNameState={setaddEmployeeNameField}
          eMailState={addEmployeeEMailField} setEMailState={setaddEmployeeEMailField}
          fundsState={addEmployeeFundsField} setFundsState={setaddEmployeeFundsField}
        />

        {createStatus && <div className="ui alert message">
          <h5 className="text red">{createStatus}</h5>
        </div>}
        <button className="ui button red small" type="reset">
          @(Сбросить)
        </button>
        <Submit state={submitMsg} setState={setSubmitMsg} />

      </form>}

    </div>
  )
}

const { Option } = components
const OptionWraper = (props) => {
  return (<Option {...props}>
    {props.data.label}
    <br />
    {props.data.email}
  </Option>
  )
};