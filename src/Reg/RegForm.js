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
    const formData = {
      main: {
        login: loginField, "e-mail": eMailField, "password": passwordField
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
    if (!loginField || !eMailField || !passwordField || passwordField !== passwordField2) {
      setTabIndex(0)
      setValidationPopup(true)
      //Tab 2 validation failed case
    } else if (!firstNameField || !secondNameField) {
      setValidationPopup(true)
      setTabIndex(1)
    } else {
      setValidationPopup(false)
      console.log(formData)
      const response = await WS.send('accounts', 'accountsFormData', formData)
    }
  }

  useEffect(() => {

    async function fetcher() {
      WS = new WebsocketPromiseLiteClient({
        url: 'ws://localhost:5555'
      })
      await WS.connectionEstablished()
      const response = await WS.send('accounts', 'accountsFormData', {})
      const { accountsMetaData } = response
      const options = optionSpreader(accountsMetaData.options)
      const accounts = accountsSpreader(accountsMetaData.accounts)
      setAccounts({ ...accountsMetaData, options, accounts })

    }
    fetcher()
    // return () => {
    //   cleanup
    // }
  }, [])


  return (
    <div className="ui container">
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
      </div>

      <form className="ui form" onSubmit={onSubmit}>
        {tabIndex === 0 && <>
          <div className="field required">
            <label htmlFor="name">@(Логин)</label>
            <input name="name" type="text" value={loginField} onChange={onLoginFieldChange} required />
          </div>
          <div className="field required">
            <label htmlFor="email">@(E-mail)</label>
            <input name="email" type="email" value={eMailField} onChange={onEMailFieldChange} required />
          </div>
          <div className="field required">
            <label htmlFor="password">@(Пароль)</label>
            <input type="password" value={passwordField} onChange={onPasswordFieldChange} required
              minLength="6" />
          </div>
          <div className="field required">
            <label htmlFor="password">@(Повторите пароль)</label>
            <input type="password" value={passwordField2} onChange={onPasswordFieldChange2} required />
          </div>
          <div className="field inline">
            <label htmlFor="pwordCheck">@(Пароли совпадают)</label>
            <input type="checkbox" required name="pwordCheck"
              checked={passwordField === passwordField2 && passwordField} />
          </div>
        </>}


        {tabIndex === 1 && <>
          <div className="three fields">

            <div className="field required">
              <label htmlFor="firstName">@(Имя)</label>
              <input name="firstName" type="text" value={firstNameField} onChange={onFirstNameChange} required />
            </div>

            <div className="field required">
              <label htmlFor="secondName">@(Фамилия)</label>
              <input name="secondName" type="text" value={secondNameField} onChange={onSecondNameChange} required />
            </div>

            <div className="field">
              <label htmlFor="thirdName">@(Отчество)</label>
              <input name="thirdName" type="text" value={thirdNameField} onChange={onThirdNameChange} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="country">@(Страна)</label>
            <input name="country" type="text" value={countryField} onChange={onCountryChange} />
          </div>

          <div className="field">
            <label htmlFor="adress">@(Адрес)</label>
            <input name="adress" type="text" value={adressField} onChange={onAdressChange} />
          </div>

          <div className="two fields">

            <div className="field">
              <label htmlFor="phone">@(Телефон)</label>
              <input name="phone" type="text" value={phoneField} onChange={onPhoneChange} />
            </div>

            <div className="field">
              <label htmlFor="birtdate">@(Дата рождения)</label>
              <input name="birtdate" type="date" value={bDateField} onChange={onBDateChange} />
            </div>
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

        <button type='submit' className="ui button teal">@(Отправить)</button>
      </form>
    </div>
  )
}
