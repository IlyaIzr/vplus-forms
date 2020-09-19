import React, { useState } from 'react'
const stringFieldDefaultState = {
  value: '',
  isEditable: true,
  isRequired: true
}

export const RegForm = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const onTabClick = e => setTabIndex(Number(e.target.name))
  const [validationPopup, setValidationPopup] = useState(false)
  const switchValidation = () => setValidationPopup(!validationPopup)
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
  const onSecondNameChange = e => setSecondNameField(e.target.value)

  const [thirdNameField, setThirdNameField] = useState('')
  const onThirdNameChange = e => setThirdNameField(e.target.value)

  const [countryField, setCountryField] = useState('')
  const onCountryChange = e => setCountryField(e.target.value)

  const [adressField, setAdressField] = useState('')
  const onAdressChange = e => setAdressField(e.target.value)

  const [phoneField, setPhoneField] = useState('')
  const onPhoneChange = e => setPhoneField(e.target.value)

  const [bDateField, setBDateField] = useState('')
  const onBDateChange = e => setBDateField(e.target.value)


  const onSubmit = e => {
    e.preventDefault()

    // Tab 1 validation failed case
    if (!loginField || !eMailField || !passwordField || passwordField !== passwordField2) {
      setTabIndex(0)
      setValidationPopup(true)
      //Tab 2 validation failed case
    } else if (!firstNameField || !secondNameField) {
      setValidationPopup(true)
      setTabIndex(1)
    } else {
      setValidationPopup(false)
      console.log({ loginField, eMailField, passwordField })
    }
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
        {validationPopup && <div className="ui warning message">
          <h5 className="text red">Заполните все обязательные поля</h5>
        </div>}
      </div>

      <form className="ui form" onSubmit={onSubmit}>
        {tabIndex === 0 && <>
          <div className="field required">
            <label htmlFor="name">Логин</label>
            <input name="name" type="text" value={loginField} onChange={onLoginFieldChange} required />
          </div>
          <div className="field required">
            <label htmlFor="email">E-mail</label>
            <input name="email" type="email" value={eMailField} onChange={onEMailFieldChange} required />
          </div>
          <div className="field required">
            <label htmlFor="password">Пароль</label>
            <input type="password" value={passwordField} onChange={onPasswordFieldChange} required />
          </div>
          <div className="field required">
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

            <div className="field required">
              <label htmlFor="firstName">Имя</label>
              <input name="firstName" type="text" value={firstNameField} onChange={onFirstNameChange} required />
            </div>

            <div className="field required">
              <label htmlFor="secondName">Фамилия</label>
              <input name="secondName" type="text" value={secondNameField} onChange={onSecondNameChange} required />
            </div>

            <div className="field">
              <label htmlFor="thirdName">Отчество</label>
              <input name="thirdName" type="text" value={thirdNameField} onChange={onThirdNameChange} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="country">Страна</label>
            <input name="country" type="text" value={countryField} onChange={onCountryChange} />
          </div>

          <div className="field">
            <label htmlFor="adress">Адрес</label>
            <input name="adress" type="text" value={adressField} onChange={onAdressChange} />
          </div>

          <div className="two fields">

            <div className="field">
              <label htmlFor="phone">Телефон</label>
              <input name="phone" type="text" value={phoneField} onChange={onPhoneChange} />
            </div>

            <div className="field">
              <label htmlFor="birtdate">Дата рождения</label>
              <input name="birtdate" type="date" value={bDateField} onChange={onBDateChange} />
            </div>
          </div>

        </>}

        <button type='submit' className="ui button teal">Submit</button>
      </form>
    </div>
  )
}
