import React, { useEffect, useState } from 'react'
import { SelectField } from '../components/SelectField'
import { StringField } from '../components/StringField'
import { stringFieldDefaultState, selectDefaultState, optionSpreader } from '../reusable'
import { AccountSubForm } from './AccountSubForm'
import { CustomForm } from './CustomForm'
//Other
let WS
const accountsSpreader = options => {
  const res = options.length && options.map(option => {
    return ({ value: option.type, ...option })
  })
  return res
}

export const AccountForm = () => {
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

  // Social fields
  const [socialLoginField, setSocialLogin] = useState(stringFieldDefaultState)
  const onSocialLoginChange = e => setSocialLogin({ ...socialLoginField, value: e.target.value })
  const [socialNameField, setSocialName] = useState(stringFieldDefaultState)
  const onSocialNameChange = e => setSocialName({ ...socialNameField, value: e.target.value })
  const [socialSecondNameField, setSocialSecondName] = useState(stringFieldDefaultState)
  const onSocialSecondName = e => setSocialSecondName({ ...socialSecondNameField, value: e.target.value })
  const [socialThirdNameField, setSocialThirdName] = useState({ ...stringFieldDefaultState, isRequired: false })
  const onSocialThirddName = e => setSocialThirdName({ ...socialThirdNameField, value: e.target.value })


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

  const [extraContacts, setExtraContacts] = useState([{
    typeOfContact: '', valueOfContact: ''
  }])
  const addContactInfo = (type, value, index) => {
    const mutableContacts = [...extraContacts];
    mutableContacts[index][type] = value;
    setExtraContacts(mutableContacts)
  }
  const addExtraField = () => {
    const mutableContacts = [...extraContacts];
    mutableContacts.push({ typeOfContact: '', valueOfContact: '' })
    setExtraContacts(mutableContacts)
  }
  const deleteExtraField = index => {
    const mutableContacts = [...extraContacts];
    mutableContacts.splice(index, 1)
    setExtraContacts(mutableContacts)
  }

  useEffect(() => {
    async function fetcher() {
      WS = new WebsocketPromiseLiteClient({
        url: 'ws://localhost:5555'
      })
      await WS.connectionEstablished()
      const response = await WS.send('accounts', 'accountsFormData', {})
      const { accountsMetaData } = response
      if (accountsMetaData) {
        const options = optionSpreader(accountsMetaData.options)
        const accounts = accountsSpreader(accountsMetaData.accounts)
        setAccounts({ ...accountsMetaData, options, accounts })
      }

    }
    fetcher()
  }, [])

  const onSubmit = async e => {
    e.preventDefault()
    const formData = {
      socials: {  // TODO think how to send this in better format
        socialField,
        socialLoginField,
        socialNameField,
        socialSecondNameField,
        socialThirdNameField
      },
      accountsMeta,
      extraContacts
    }
    console.log(formData)
    const response = await WS.send('accounts', 'accountsFormData', formData)
  }

  return (
    <div>
      <h2>@(Аккаунты и счета)</h2>
      <form className="ui form" onSubmit={onSubmit}>

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

        <div className="ui segment">
          <h4>@(Дополнительные контакты)</h4>
          {Boolean(extraContacts.length) && extraContacts.map((formItem, index) => {
            return (
              <CustomForm type={formItem.typeOfContact} value={formItem.valueOfContact}
                index={index}
                addContactInfo={addContactInfo} deleteField={deleteExtraField}
                key={index}
              />
            )
          })}
          <button type="button" onClick={addExtraField} className="ui button teal">
            @(Добавить поле)
          </button>
          <div className="ui warning message" style={{ display: 'block' }}>@(Здесь вы можете указать телефон, текст подсказки далее...)</div>
        </div>

        <button className="ui button green" type="submit">@(Отправить)</button>

      </form>
    </div>
  )
}
