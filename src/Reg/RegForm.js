import React, { useState, useEffect } from 'react'
import { SelectField } from '../components/SelectField'
import { StringField } from '../components/StringField'
import { stringFieldDefaultState, selectDefaultState, optionSpreader } from '../reusable'
import { AccountSubForm } from '../Accs/AccountSubForm'
//Other
let WS
const accountsSpreader = options => {
  const res = options.length && options.map(option => {
    return ({ value: option.type, ...option })
  })
  return res
}

export const RegForm = () => {
  // Tabs
  const [tabIndex, setTabIndex] = useState(0)
  const onTabClick = e => setTabIndex(Number(e.target.name))
  const [validationPopup, setValidationPopup] = useState(false)
  //Error msg  
  const [errorMsg, setErrorMsg] = useState(null)
  // Tab 1 fields
  const [loginField, setLoginField] = useState(stringFieldDefaultState)
  const onLoginFieldChange = e => setLoginField({ ...loginField, value: e.target.value })

  const [eMailField, setEMailField] = useState(stringFieldDefaultState)
  const onEMailFieldChange = e => setEMailField({ ...eMailField, value: e.target.value })

  const [roleField, setRoleField] = useState({
    options: [
      { label: '@(Владелец)', value: 'root' },
      { label: '@(Админ)', value: 'admin' },
      { label: '@(Пользователь)', value: 'user' }
    ],
    value: { label: '@(Пользователь)', value: 'user' },
    isRequired: true,
    isEditable: true
  })
  const onRoleChange = option => setRoleField({ ...roleField, value: option })


  const [passwordField, setPasswordField] = useState({ stringFieldDefaultState, minLength: 4 })
  const onPasswordFieldChange = e => setPasswordField({ ...passwordField, value: e.target.value })
  const [passwordField2, setPasswordField2] = useState(stringFieldDefaultState)
  const onPasswordFieldChange2 = e => setPasswordField2({ ...passwordField2, value: e.target.value })
  // Tab 2 fiedls
  const [firstNameField, setFirstNameField] = useState(stringFieldDefaultState)
  const onFirstNameChange = e => setFirstNameField({ ...firstNameField, value: e.target.value })


  const [secondNameField, setSecondNameField] = useState(stringFieldDefaultState)
  const onSecondNameChange = e => setSecondNameField({ ...secondNameField, value: e.target.value })

  const [thirdNameField, setThirdNameField] = useState(stringFieldDefaultState)
  const onThirdNameChange = e => setThirdNameField({ ...thirdNameField, value: e.target.value })

  const [countryField, setCountryField] = useState(stringFieldDefaultState)
  const onCountryChange = e => setCountryField({ ...countryField, value: e.target.value })

  const [adressField, setAdressField] = useState(stringFieldDefaultState)
  const onAdressChange = e => setAdressField({ ...adressField, value: e.target.value })

  const [phoneField, setPhoneField] = useState(stringFieldDefaultState)
  const onPhoneChange = e => setPhoneField({ ...phoneField, value: e.target.value })

  const [bDateField, setBDateField] = useState(stringFieldDefaultState)
  const onBDateChange = e => setBDateField({ ...bDateField, value: e.target.value })

  // Tab 3 fields
  const [socialField, setSocialField] = useState({
    options: [
      { label: '@(Отменить выбор)', value: '' },
      { label: 'VK', value: 'vk' },
      { label: 'Facebook', value: 'facebook' }
    ],
    value: '',
    isEditable: true,
    isRequired: false,
  })
  const onSocialChange = option => setSocialField({ ...socialField, value: option })

  // _subTab3 Social fields
  const [socialLoginField, setSocialLogin] = useState(stringFieldDefaultState)
  const onSocialLoginChange = e => setSocialLogin({ ...socialLoginField, value: e.target.value })
  const [socialNameField, setSocialName] = useState(stringFieldDefaultState)
  const onSocialNameChange = e => setSocialName({ ...socialNameField, value: e.target.value })
  const [socialSecondNameField, setSocialSecondName] = useState(stringFieldDefaultState)
  const onSocialSecondName = e => setSocialSecondName({ ...socialSecondNameField, value: e.target.value })
  const [socialThirdNameField, setSocialThirdName] = useState({ ...stringFieldDefaultState, isRequired: false })
  const onSocialThirddName = e => setSocialThirdName({ ...socialThirdNameField, value: e.target.value })

  // _subTab3 Accounts fields
  const [accountsMeta, setAccounts] = useState({
    ...selectDefaultState, accounts: [
      { type: '', value: '' }  //and may be some userNames from higher component. TBD
    ]
  })
  const onAccountTypeChange = (option, index) => {
    const accounts = [...accountsMeta.accounts];
    const account = {
      label: option.label,
      value: option.value,
      type: option.type
    }
    option.fields.forEach((field) => {
      account[field.name] = field.value
    })
    accounts[index] = account
    setAccounts({ ...accountsMeta, accounts })
  }
  const onCustomAccChange = (name, value, index) => {
    const accounts = [...accountsMeta.accounts];
    accounts[index][name] = value
    setAccounts({ ...accountsMeta, accounts })
  }
  const addAccField = () => {
    const accounts = [...accountsMeta.accounts];
    accounts.push({ type: '', value: '' })
    setAccounts({ ...accountsMeta, accounts })
  }
  const deleteField = (index) => {
    const accounts = [...accountsMeta.accounts];
    accounts.splice(index, 1)
    setAccounts({ ...accountsMeta, accounts })
  }
  // _subTab3 extra info field


  const onSubmit = async e => {
    e.preventDefault()
    e.target.checkValidity()
    const formData = {
      main: {
        // login: loginField, "e-mail": eMailField, "password": passwordField
        loginField, eMailField, passwordField, role: roleField.value.value
      },
      personal: {
        firstName: firstNameField,
        secondName: secondNameField,
        thirdName: thirdNameField,
        country: countryField,
        adress: adressField,
        phone: phoneField,
        birthday: bDateField
      },
      accounts: accountsMeta
    }

    // Tab 1 validation failed case
    if (!loginField.value || !eMailField.value || !passwordField.value ||
      passwordField.value !== passwordField2.value) {
      setTabIndex(0)
      setValidationPopup(true)
      //Tab 2 validation failed case
    } else if (!firstNameField.value || !secondNameField.value) {
      setValidationPopup(true)
      setTabIndex(1)
    } else {
      setValidationPopup(false)
      console.log(formData)
      const response = await WS.send('registrations', 'registrationFormData', formData)
      if (response.loginFieldMeta) {
        setErrorMsg(false)
        onReset()
      } else setErrorMsg('@(Ошибка подключения при отправлении)')
    }
  }

  useEffect(() => {

    async function fetcher() {
      WS = new WebsocketPromiseLiteClient({
        url: 'ws://localhost:5555'
      })
      await WS.connectionEstablished()
      const regResponse = await WS.send('registrations', 'registrationFormData', {})
      if (regResponse.loginFieldMeta) {
        setErrorMsg(false)
        const {
          loginFieldMeta,
          eMailFieldMeta,
          passwordFieldMeta,
          firstNameFieldMeta,
          secondNameFieldMeta,
          thirdNameFieldMeta,
          countryFieldMeta,
          adressFieldMeta,
          phoneFieldMeta,
          bDateFieldMeta,
          accountsMetaData
        } = regResponse
        setLoginField(loginFieldMeta)
        setEMailField(eMailFieldMeta)
        setPasswordField(passwordFieldMeta)
        setPasswordField2(passwordFieldMeta)
        setFirstNameField(firstNameFieldMeta)
        setSecondNameField(secondNameFieldMeta)
        setThirdNameField(thirdNameFieldMeta)
        setCountryField(countryFieldMeta)
        setAdressField(adressFieldMeta)
        setPhoneField(phoneFieldMeta)
        setBDateField(bDateFieldMeta)
        const options = optionSpreader(accountsMetaData.options)
        const accounts = accountsSpreader(accountsMetaData.accounts)
        setAccounts({ ...accountsMetaData, options, accounts })
      } else {
        setErrorMsg(true)
      }

    }
    fetcher()
    // return () => {
    //   cleanup
    // }
  }, [])

  const onReset = () => {
    //Basic info
    setLoginField({ ...loginField, value: '' })
    setEMailField({ ...eMailField, value: '' })
    setPasswordField({ ...passwordField, value: '' })
    setPasswordField2({ ...passwordField2, value: '' })
    setRoleField({ ...roleField, value: { label: '@(Пользователь)', value: 'user' } })
    // Personal info
    setFirstNameField({ ...firstNameField, value: '' })
    setSecondNameField({ ...secondNameField, value: '' })
    setThirdNameField({ ...thirdNameField, value: '' })
    setCountryField({ ...countryField, value: '' })
    setAdressField({ ...adressField, value: '' })
    setPhoneField({ ...phoneField, value: '' })
    setBDateField({ ...bDateField, value: '' })
    //accounts tab
    setAccounts({ ...accountsMeta, accounts: [] })
    setSocialLogin({ ...socialField, value: '' })
    setSocialName({ ...socialNameField, value: '' })
    setSocialSecondName({ ...socialSecondNameField, value: '' })
    setSocialThirdName({ ...socialThirdNameField, value: '' })
  }

  return (
    <div>
      <div className="ui fragment">
        <button onClick={onTabClick} className={`ui button ${tabIndex === 0 && 'secondary'}`} name="0">
          @(Основная информация)
        </button>
        <button onClick={onTabClick} className={`ui button ${tabIndex === 1 && 'secondary'}`} name="1">
          @(Личная информация)
        </button>
        <button onClick={onTabClick} className={`ui button ${tabIndex === 2 && 'secondary'}`} name="2">
          @(Аккаунты и счета)
        </button>
        {validationPopup && <div className="ui warning message">
          <h5 className="text red">@(Заполните все обязательные поля)</h5>
        </div>}
        {//Error message
          errorMsg && <div className="ui alert message">
            <h5 className="text red">{errorMsg ? errorMsg : '@(Ошибка соединения с сервером)'}</h5>
          </div>}
      </div>
      <br />

      <form className="ui form" onSubmit={onSubmit} onReset={onReset}>
        {tabIndex === 0 && <>
          <StringField name="name" label="@(Логин)"
            isEditable={loginField.isEditable} isRequired={loginField.isRequired}
            value={loginField.value} onChange={onLoginFieldChange}
          />
          <StringField name="email" label="@(E-mail)" type="email"
            isEditable={eMailField.isEditable} isRequired={eMailField.isRequired}
            value={eMailField.value} onChange={onEMailFieldChange}
          />

          <SelectField name="role" label="@(Роль)"
            isRequired={roleField.isRequired} isEditable={roleField.isEditable}
            value={roleField.value} options={roleField.options} onChange={onRoleChange}
          />

          <StringField name="password" label="@(Пароль)" type="password"
            isEditable={passwordField.isEditable} isRequired={passwordField.isRequired}
            value={passwordField.value} onChange={onPasswordFieldChange}
            minLength={passwordField.minLength || 6}
          />
          <StringField name="password" label="@(Повторите пароль)" type="password"
            isEditable={passwordField2.isEditable} isRequired={passwordField2.isRequired}
            value={passwordField2.value} onChange={onPasswordFieldChange2}
            minLength={passwordField.minLength || 6}
          />

          <div className="field inline disabled">
            <label htmlFor="pwordCheck">@(Пароли совпадают)</label>
            <input type="checkbox" required name="pwordCheck" className=""
              checked={passwordField.value === passwordField2.value && passwordField.value} />
          </div>
        </>}


        {tabIndex === 1 && <>
          <div className="three fields">

            <StringField name="firstName" label="@(Имя)"
              isEditable={firstNameField.isEditable} isRequired={firstNameField.isRequired}
              value={firstNameField.value} onChange={onFirstNameChange}
            />

            <StringField name="secondName" label="@(Фамилия)"
              isEditable={secondNameField.isEditable} isRequired={secondNameField.isRequired}
              value={secondNameField.value} onChange={onSecondNameChange}
            />

            <StringField name="thirdName" label="@(Отчество)"
              isEditable={thirdNameField.isEditable} isRequired={thirdNameField.isRequired}
              value={thirdNameField.value} onChange={onThirdNameChange}
            />
          </div>


          <StringField name="country" label="@(Страна)"
            isEditable={countryField.isEditable} isRequired={countryField.isRequired}
            value={countryField.value} onChange={onCountryChange}
          />

          <StringField name="adress" label="@(Адрес)"
            isEditable={adressField.isEditable} isRequired={adressField.isRequired}
            value={adressField.value} onChange={onAdressChange}
          />


          <div className="two fields">

            <StringField name="phone" label="@(Телефон)"
              isEditable={phoneField.isEditable} isRequired={phoneField.isRequired}
              value={phoneField.value} onChange={onPhoneChange}
            />

            <StringField name="birtdate" label="@(Дата рождения)" type="date"
              isEditable={bDateField.isEditable} isRequired={bDateField.isRequired}
              value={bDateField.value} onChange={onBDateChange}
            />
          </div>

        </>}


        {tabIndex === 2 && <>
          <div className="ui segment">
            <h4>@(Счета)</h4>
            {Boolean(accountsMeta.accounts.length) && accountsMeta.accounts.map((account, index) => {
              const canDelete = accountsMeta.accounts.length > 1
              return (<div className="ui clearing  segment" key={index}>

                <AccountSubForm account={account} options={accountsMeta.options}
                  isEditable={accountsMeta.isEditable} isRequired={accountsMeta.isRequired}
                  onAccountTypeChange={onAccountTypeChange} index={index}
                  onCustomAccChange={onCustomAccChange} deleteField={deleteField} canDelete={canDelete}
                />
              </div>)
            })}
            <button className="ui button green" type="button" onClick={addAccField}>@(Добавить)</button>
          </div>

          <div className="ui segment">
            <h4>@(Соцсети)</h4>
            <SelectField label="@(Выберите соцсеть)" name="social"
              isRequired={socialField.isRequired} isEditable={socialField.isEditable}
              options={socialField.options} value={socialField.value} onChange={onSocialChange}
            />

            {socialField.value && socialField.value.value && <div>
              <StringField label="@(Логин или почта)" name="socialLogin"
                isRequired={socialLoginField.isRequired} isEditable={socialLoginField.isEditable}
                value={socialLoginField.value} onChange={onSocialLoginChange}
              />
              <div className="three fields">
                <StringField label="@(Имя)" name="socialName"
                  isRequired={socialNameField.isRequired} isEditable={socialNameField.isEditable}
                  value={socialNameField.value} onChange={onSocialNameChange}
                />
                <StringField label="@(Фамилия)" name="socialSecondName"
                  isRequired={socialSecondNameField.isRequired} isEditable={socialSecondNameField.isEditable}
                  value={socialSecondNameField.value} onChange={onSocialSecondName}
                />
                <StringField label="@(Отчество)" name="socialThirdName"
                  isRequired={socialThirdNameField.isRequired} isEditable={socialThirdNameField.isEditable}
                  value={socialThirdNameField.value} onChange={onSocialThirddName}
                />
              </div>
            </div>}
          </div>

        </>}

        <button className="ui button red" type="reset">@(Сбросить поля)</button>
        <button type='submit' className="ui button teal">@(Отправить)</button>
      </form>
    </div>
  )
}
