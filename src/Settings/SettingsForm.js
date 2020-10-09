import React, { useEffect, useState } from 'react'
import { selectDefaultState, stringFieldDefaultState } from '../reusable'
import { StringField } from '../components/StringField'
import { components } from 'react-select';
// Fake data
import {
  emailFieldMeta, employeesListResponse, employeeResponse,
  fundFieldMeta, skypeFieldMeta, employeeCreateOptions
} from './fakeData'
import { SelectField } from '../components/SelectField'
import { EmployeeEditor } from './EmployeeEditor'

export const SettingsForm = () => {

  const [fundField, setFundField] = useState('')
  const [eMailField, setEMailField] = useState('')
  const [skypeField, setSkypeField] = useState(stringFieldDefaultState)
  const onSkypeChange = e => setSkypeField({ ...skypeField, value: e.target.value })
  //Tabs
  const [activeTab, setActiveTab] = useState(null)
  const onTabClick = e => setActiveTab(e.target.name)
  //Error msg  
  const [errorMsg, setErrorMsg] = useState(null)
  //Tab 1, passwords
  const [oldPWord, setOldPWord] = useState('')
  const onOldPWord = e => setOldPWord(e.target.value)
  const [newPWord, setNewPWord] = useState('')
  const onNewPWord = e => setNewPWord(e.target.value)
  const [newPWord2, setNewPWord2] = useState('')
  const onNewPWord2 = e => setNewPWord2(e.target.value)
  const [pWordStatus, setPWordStatus] = useState(null)
  const submitPWord = e => {
    e.preventDefault()
    e.target.checkValidity()
    const data = {
      fund: fundField,
      email: eMailField,
      oldPassword: oldPWord,
      newPassword: newPWord
    }
    console.log(data)
    resetPWords()
    setPWordStatus('Success')
  }
  const resetPWords = () => {
    setOldPWord('')
    setNewPWord('')
    setNewPWord2('')
  }
  // Tab 2, edit employees
  const [employeesField, setEmployeesField] = useState(selectDefaultState)
  const onEmployeeChange = option => {
    setEmployeesField({ ...employeesField, value: option })
    employeeRequest(option)
  }
  const [employeeNameField, setEmployeeNameField] = useState(stringFieldDefaultState)
  const [employeeEMailField, setEmployeeEMailField] = useState(stringFieldDefaultState)
  const [employeeFundsField, setEmployeeFundsField] = useState(selectDefaultState)
  const [employeeIsAdmin, setEmployeeIsAdmin] = useState(stringFieldDefaultState)

  const deleteEmployee = async () => {
    const result = await employeeDeleteRequest()
    if (result === 'OK') {
      resetEmployeeEdit()
      employeesListRequest()
    } else setErrorMsg('@(Ошибка при удалении работника)')
  }
  const submitEmployee = async e => {
    e.preventDefault()
    e.target.checkValidity()
    const data = {
      employeeNameField,
      employeeEMailField,
      employeeFundsField,
      employeeIsAdmin
    }
    console.log(data)
    resetEmployeeEdit()
  }
  const resetEmployeeEdit = () => {
    setEmployeesField({ ...employeesField, value: null })
    setEmployeeNameField({ ...employeeNameField, value: null })
    setEmployeeEMailField({ ...employeeEMailField, value: null })
    setEmployeeFundsField({ ...employeeFundsField, value: null })
    setEmployeeIsAdmin({ ...employeeIsAdmin, value: null })
  }
  // Tab 3, add employee
  const [addEmployeeNameField, setaddEmployeeNameField] = useState(stringFieldDefaultState)
  const [addEmployeeEMailField, setaddEmployeeEMailField] = useState(stringFieldDefaultState)
  const [addEmployeeFundsField, setaddEmployeeFundsField] = useState(selectDefaultState)
  const [addEmployeeIsAdmin, setaddEmployeeIsAdmin] = useState(stringFieldDefaultState)

  const submitEmployeeCreation = async e => {
    e.preventDefault()
    e.target.checkValidity()
    const data = {
      employeeNameField: addEmployeeNameField,
      employeeEMailField: addEmployeeEMailField,
      employeeFundsField: addEmployeeFundsField,
      employeeIsAdmin: addEmployeeIsAdmin
    }
    console.log(data)
  }
  const resetEmployeeCreation = () => {
    setaddEmployeeNameField({ ...addEmployeeNameField, value: '' })
    setaddEmployeeEMailField({ ...addEmployeeEMailField, value: '' })
    setaddEmployeeFundsField({ ...addEmployeeFundsField, value: '' })
    setaddEmployeeIsAdmin({ ...addEmployeeIsAdmin, value: '' })
  }

  // Requests with effects
  const employeesListRequest = async () => {
    const response = employeesListResponse
    if (response.status === 'OK') {
      setEmployeesField(response.employeeFieldMeta)
    } else {
      setErrorMsg('@(Ошибка запроса информации о работнике)')
    }
  }
  const employeeRequest = async option => {
    const response = employeeResponse
    if (response.status === 'OK') {
      setErrorMsg(false)
      setEmployeeNameField(response.employeeNameFieldMeta)
      setEmployeeEMailField(response.employeeEMailFieldMeta)
      setEmployeeFundsField(response.employeeFundsFieldMeta)
      setEmployeeIsAdmin(response.employeeIsAdminFieldMeta)
    } else {
      setErrorMsg('@(Ошибка запроса информации о работнике)')
    }
  }
  const employeeDeleteRequest = async () => {
    const payload = {
      name: employeeNameField.value,
      email: employeeEMailField.value,
      funds: employeeFundsField.value
    }
    const response = 'OK'
    return response
  }
  const createEmployeeOptions = async () => {
    const response = employeeCreateOptions
    if (response.status === 'OK') {
      console.log(response)
      response.employeeNameFieldMeta && setaddEmployeeNameField(response.employeeNameFieldMeta)
      response.employeeEMailFieldMeta && setaddEmployeeEMailField(response.employeeEMailFieldMeta)
      response.employeeFundsFieldMeta && setaddEmployeeFundsField(response.employeeFundsFieldMeta)
      response.employeeIsAdminFieldMeta && setaddEmployeeIsAdmin(response.employeeIsAdminFieldMeta)
    } else setErrorMsg('@(Ошибка запроса информации о работнике)')
  }

  useEffect(() => {
    //tab 1
    setFundField(fundFieldMeta)
    setEMailField(emailFieldMeta)
    setSkypeField(skypeFieldMeta)
  }, [])

  useEffect(() => {
    if (activeTab == 2) {
      if (!employeesField.options.length) employeesListRequest()
    } else if (activeTab == 3) {
      if (!employeesField.options.length) createEmployeeOptions()
    }
  }, [activeTab])

  return (
    <div>
      <form className="ui form">

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

        <button className="ui button green small" type="submit">
          @(Подтвредить)
        </button>

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
            isAdminState={employeeIsAdmin} setisAdminState={setEmployeeIsAdmin}
          />
        }
        {employeesField.value && <>
          <button className="ui button small red" type="button" onClick={deleteEmployee}>
            @(Удалить сотрудника)
          </button>
          <button className="ui button red small" type="reset">
            @(Сбросить)
          </button>
          <button className="ui button green small" type="submit">
            @(Подтвредить)
          </button>
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
          isAdminState={addEmployeeIsAdmin} setisAdminState={setaddEmployeeIsAdmin}
        />

        <button className="ui button red small" type="reset">
          @(Сбросить)
        </button>
        <button className="ui button green small" type="submit">
          @(Подтвредить)
        </button>

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