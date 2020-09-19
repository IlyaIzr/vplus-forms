import React, { useState } from 'react'
const stringFieldDefaultState = {
  value: '',
  isEditable: true,
  isRequired: true
}

export const RegForm = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const onTabClick = e => setTabIndex(Number(e.target.name))
  // Tab 1 fields
  const [loginField, setLoginField] = useState('')
  const onLoginFieldChange = e => setLoginField(e.target.value)

  const [eMailField, setEMailField] = useState('test@remove.later')
  const onEMailFieldChange = e => setEMailField(e.target.value)

  const [passwordField, setPasswordField] = useState('')
  const onPasswordFieldChange = e => setPasswordField(e.target.value)
  const [passwordField2, setPasswordField2] = useState('')
  const onPasswordFieldChange2 = e => setPasswordField2(e.target.value)
  // Tab 2 fiedls
  const [firstNameField, setFirstNameField] = useState('')
  const onFirstNameChange = e => setFirstNameField(e.target.value)

  const [secondNameField, setSecondNameField] = useState('')
  const onSecondNameChange= e => setSecondNameField(e.target.value)

  const [thirdNameField, setThirdNameField] = useState('')
  const onThirdNameChange= e => setThirdNameField(e.target.value)


  const onSubmit = e => {
    e.preventDefault()
    if (!loginField) {
      setTabIndex(0)
    }
    if (!passwordField) {
      setTabIndex(1)
    }
    console.log({ loginField, loginField1: passwordField })
  }


  return (
    <div className="ui container">
      <div className="ui fragment">
        <button onClick={onTabClick} className={`ui button ${tabIndex === 0 && 'secondary'}`} name="0">
          Основная информация
          </button>
        <button onClick={onTabClick} className={`ui button ${tabIndex === 1 && 'secondary'}`} name="1">
          Личная информация
          </button>
        <button onClick={onTabClick} className={`ui button ${tabIndex === 2 && 'secondary'}`} name="2">
          Аккаунты и счета
          </button>
      </div>

      <form className="ui form" onSubmit={onSubmit}>
        {tabIndex === 0 && <>
          <div className="field">
            <label htmlFor="name">Логин</label>
            <input name="name" type="text" value={loginField} onChange={onLoginFieldChange} required />
          </div>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input name="email" type="email" value={eMailField} onChange={onEMailFieldChange} required />
          </div>
          <div className="field">
            <label htmlFor="password">Пароль</label>
            <input type="password" value={passwordField} onChange={onPasswordFieldChange} required />
          </div>
          <div className="field">
            <label htmlFor="password">Повторите пароль</label>
            <input type="password" value={passwordField2} onChange={onPasswordFieldChange2} required />
          </div>
          <div className="field inline">
            <label htmlFor="pwordCheck">Пароли совпадают</label>
            <input type="checkbox" required name="pwordCheck"
              checked={passwordField === passwordField2 && passwordField} />
          </div>
        </>}


        {tabIndex === 1 && <>
          <div className="three fields">

            <div className="field">
              <label htmlFor="firstName">Имя</label>
              <input name="firstName" type="text" value={firstNameField} onChange={onFirstNameChange} required />
            </div>

            <div className="field">
              <label htmlFor="secondName">Фамилия</label>
              <input name="secondName" type="text" value={secondNameField} onChange={onSecondNameChange} required />
            </div>

            <div className="field">
              <label htmlFor="thirdName">Отчество</label>
              <input name="thirdName" type="text" value={thirdNameField} onChange={onThirdNameChange} />
            </div>
          </div>
        </>}

        <button type='submit' className="ui button teal">Submit</button>
      </form>
    </div>
  )
}
