import React, { useState, useEffect } from 'react'
import { SelectCreatableField } from '../components/SelectCreatableField'
import { StringField } from '../components/StringField'
import { stringFieldDefaultState, selectDefaultState, selectNoOptDefaultState, multifieldsDefaultState } from '../reusable'
// fake data
//
import { ThreeFields } from './ThreeFields'
import { NicknamesSForm } from './NicknamesSForm'
import { InputsMapper, InputsMapperDefaultState } from './InputsMapper'
import { SelectWrapper } from './SelectWrapper'
import { Description } from './Description'
import { AdressThreeFields } from './AdressThreeFields'
import { WMSubForm } from './WMSubForm'
import { Submit } from '../components/Submit'
// Backend
let WS
let debtFormPayload = {}


export const DebtForm = () => {
  const formAPI = {
    debtForm: {
      callForm: (payload = {}) => {
        debtFormPayload = { ...payload }
        fetcher(debtFormPayload)
      }
    }
  }
  window.formAPI = { ...window.formAPI, ...formAPI }

  //Fields
  const [arbitrageField, setArbitrageField] = useState(stringFieldDefaultState)
  const onArbitrageChange = e => setArbitrageField({ ...arbitrageField, value: e.target.value })
  const [credentialsField, setCredentialsField] = useState(multifieldsDefaultState)
  const onCredentialsChange = (index, name, value) => {
    const mutable = [...credentialsField.value]
    console.log(mutable)
    mutable[index][name] = value;
    setCredentialsField({ ...credentialsField, value: mutable })
  }
  const addExtraField = () => {
    const mutable = [...credentialsField.value]
    mutable.push({ firstName: '', secondName: '', thirdName: '', isEditable: true })
    setCredentialsField({ ...credentialsField, value: mutable })
  }
  const delCredentialsField = index => {
    const mutable = [...credentialsField.value]
    mutable.splice(index, 1)
    setCredentialsField({ ...credentialsField, value: mutable })
  }

  const [skypeField, setSkypeField] = useState(selectDefaultState)
  const onSkypeChange = options => setSkypeField({ ...skypeField, value: options })

  const [nicknameField, setNicknameField] = useState({ ...multifieldsDefaultState, options: [] })
  const onSiteChange = (options, index) => {
    const mutable = [...nicknameField.value]
    mutable[index].sites = options
    setNicknameField({ ...nicknameField, value: mutable })
  }
  const onNickChange = (name, value, index) => {
    const mutable = [...nicknameField.value]
    mutable[index][name] = value
    setNicknameField({ ...nicknameField, value: mutable })
  }
  const addNickField = () => {
    const mutable = [...nicknameField.value, { nickname: '', sites: [] }]
    setNicknameField({ ...nicknameField, value: mutable })
  }
  const deleteNickField = index => {
    const mutable = [...nicknameField.value]
    mutable.splice(index, 1)
    setNicknameField({ ...nicknameField, value: mutable })
  }

  const [gipsyTeamField, setGipsyTeamField] = useState(InputsMapperDefaultState)
  const [pokerStrategyField, setPokerStrategyField] = useState(InputsMapperDefaultState)

  const [disciplineField, setDisciplineField] = useState(selectDefaultState)
  const [descriptionField, setDescriptionField] = useState(selectNoOptDefaultState)
  const [googleAccField, setGoogleAccField] = useState(selectDefaultState)
  const [mailAccField, setMailAccField] = useState(selectDefaultState)
  const [phoneField, setPhoneField] = useState(selectDefaultState)
  const [vkField, setVkField] = useState(selectNoOptDefaultState)
  const [fbField, setFbField] = useState(selectNoOptDefaultState)
  const [blogField, setBlogField] = useState(selectNoOptDefaultState)
  const [instaField, setInstaField] = useState(selectNoOptDefaultState)
  const [forum2plus2Field, setForum2plus2Field] = useState(selectNoOptDefaultState)
  const [adressField, setAdressField] = useState(selectDefaultState)
  const [netellerField, setNetellerField] = useState(selectDefaultState)
  const [skrillField, setSkrillField] = useState(selectDefaultState)
  const [ecoPayzField, setEcoPayzField] = useState(selectDefaultState)
  const [webMoneyField, setWebMoneyField] = useState(selectNoOptDefaultState)
  //Alerts
  const [errorMsg, setErrorMsg] = useState(null)
  const [submitMsg, setSubmitMsg] = useState(null)

  const fetcher = async (payload = {}) => {
    WS = new WebsocketPromiseLiteClient({
      url: 'ws://localhost:5555'
    })
    await WS.connectionEstablished()
    const response = await WS.send('debts', 'debtFormData', payload)
    const {
      arbitrageFieldMeta,
      skypeFieldMeta,
      credentialsFieldMeta,
      nicknamesFieldMeta,
      gipsyTeamFieldMeta,
      pokerStrategyFieldMeta,
      disciplineFieldMeta,
      descriptionFieldMeta,
      googleAccFieldMeta,
      mailAccFieldMeta,
      phoneFieldMeta,
      vkFieldMeta,
      fbFieldMeta,
      blogFieldMeta,
      instaFieldMeta,
      forum2plus2FieldMeta,
      adressFieldMeta,
      netellerFieldMeta,
      skrillFieldMeta,
      ecoPayzFieldMeta,
      webMoneyFieldMeta
    } = response
    if (arbitrageFieldMeta) {
      setErrorMsg(false)
      arbitrageFieldMeta && setArbitrageField(arbitrageFieldMeta)
      skypeFieldMeta && setCredentialsField(credentialsFieldMeta)
      credentialsFieldMeta && setSkypeField(skypeFieldMeta)
      nicknamesFieldMeta && setNicknameField(nicknamesFieldMeta)
      gipsyTeamFieldMeta && setGipsyTeamField(gipsyTeamFieldMeta)
      pokerStrategyFieldMeta && setPokerStrategyField(pokerStrategyFieldMeta)
      disciplineFieldMeta && setDisciplineField(disciplineFieldMeta)
      descriptionFieldMeta && setDescriptionField(descriptionFieldMeta)
      googleAccFieldMeta && setGoogleAccField(googleAccFieldMeta)
      mailAccFieldMeta && setMailAccField(mailAccFieldMeta)
      phoneFieldMeta && setPhoneField(phoneFieldMeta)
      vkFieldMeta && setVkField(vkFieldMeta)
      fbFieldMeta && setFbField(fbFieldMeta)
      blogFieldMeta && setBlogField(blogFieldMeta)
      instaFieldMeta && setInstaField(instaFieldMeta)
      forum2plus2FieldMeta && setForum2plus2Field(forum2plus2FieldMeta)
      adressFieldMeta && setAdressField(adressFieldMeta)
      netellerFieldMeta && setNetellerField(netellerFieldMeta)
      skrillFieldMeta && setSkrillField(skrillFieldMeta)
      ecoPayzFieldMeta && setEcoPayzField(ecoPayzFieldMeta)
      webMoneyFieldMeta && setWebMoneyField(webMoneyFieldMeta)
    } else setErrorMsg('@(Ошибка подключения)')
  }

  useEffect(() => {
    fetcher(debtFormPayload)
  }, [])

  const onSubmit = async e => {
    e.preventDefault()
    const formData = {
      arbitrageField,
      skypeField,
      credentialsField,
      nicknameField,
      gipsyTeamField,
      pokerStrategyField,
      disciplineField,
      descriptionField,
      googleAccField,
      mailAccField,
      phoneField,
      vkField,
      fbField,
      blogField,
      instaField,
      forum2plus2Field,
      adressField,
      netellerField,
      skrillField,
      ecoPayzField,
      webMoneyField
    }
    console.log(formData)
    const response = await WS.send('debts', 'formSubmit', formData)
    if (response.status === 'OK') {
      setErrorMsg(false)
      response.message ? setSubmitMsg(response.message) : setSubmitMsg(true)
    } else setErrorMsg('@(Ошибка подключения при отправлении)')
  }

  return (
    <div>
      <form className="ui form" onSubmit={onSubmit}>

        <h1 className="title">@(Форма должников)</h1>
        {//Error message
          errorMsg && <div className="ui alert message">
            <h5 className="text red">{errorMsg ? errorMsg : '@(Ошибка соединения с сервером)'}</h5>
          </div>
        }

        <StringField name="arbitrage" label="@(Арбитраж)"
          isEditable={arbitrageField.isEditable} isRequired={arbitrageField.isRequired}
          value={arbitrageField.value} onChange={onArbitrageChange}
        />
        <div className="field ui segment">
          <label htmlFor="">@(ФИО)</label>
          {credentialsField.value && Boolean(credentialsField.value.length) && credentialsField.value.map((field, index) => {
            return (
              <ThreeFields key={index + 'creds'}
                value={field}
                isEditable={field.isEditable} isRequired={credentialsField.isRequired}
                deleteFunc={delCredentialsField} onChange={onCredentialsChange}
                index={index} canDelete={credentialsField.canDeleteFields}
              />
            )
          })}
          <button className={`ui button blue small ${credentialsField.isEditable ? '' : ' disabled'}`}
            onClick={addExtraField} type="button"
          >@(Добавить поле)
            </button>
        </div>

        <SelectCreatableField name="skype" label="@(Skype)"
          isEditable={skypeField.isEditable} isRequired={skypeField.isRequired}
          value={skypeField.value} onChange={onSkypeChange} isMulti={true}
        />

        <div className="ui segment">
          <label htmlFor="">@(Никнеймы)</label>
          {nicknameField.value && Boolean(nicknameField.value.length) && nicknameField.value.map((field, index) => {
            return (
              <NicknamesSForm key={index + 'nicks'}
                field={field} options={nicknameField.options}
                onSiteChange={onSiteChange} onNickChange={onNickChange} deleteField={deleteNickField}
                index={index} canDelete={nicknameField.canDeleteFields}
              />
            )
          })}
          <button className={`ui button blue small ${!nicknameField.isEditable && 'disabled'}`}
            onClick={addNickField} type="button">
            @(Добавить)
          </button>
        </div>

        <InputsMapper label="Gipsy Team"
          fieldMeta={gipsyTeamField} setFieldMeta={setGipsyTeamField}
        />

        <InputsMapper label="Poker Strategy"
          fieldMeta={pokerStrategyField} setFieldMeta={setPokerStrategyField}
        />

        <SelectWrapper label="Discipline"
          state={disciplineField} setState={setDisciplineField}
        />

        <Description state={descriptionField} setState={setDescriptionField} />

        <SelectWrapper label="Google Account"
          state={googleAccField} setState={setGoogleAccField}
        />

        <SelectWrapper label="Mail"
          state={mailAccField} setState={setMailAccField}
        />

        <SelectWrapper label="Phone"
          state={phoneField} setState={setPhoneField}
        />

        <InputsMapper label="Vkontakte"
          fieldMeta={vkField} setFieldMeta={setVkField}
        />

        <InputsMapper label="Facebook"
          fieldMeta={fbField} setFieldMeta={setFbField}
        />

        <InputsMapper label="Blog"
          fieldMeta={blogField} setFieldMeta={setBlogField}
        />

        <InputsMapper label="Instagram"
          fieldMeta={instaField} setFieldMeta={setInstaField}
        />

        <InputsMapper label="Forum 2+2"
          fieldMeta={forum2plus2Field} setFieldMeta={setForum2plus2Field}
        />

        <AdressThreeFields state={adressField} setState={setAdressField} />

        <SelectWrapper label="Neteller"
          state={netellerField} setState={setNetellerField}
        />

        <SelectWrapper label="Skrill"
          state={skrillField} setState={setSkrillField}
        />

        <SelectWrapper label="EcoPayz"
          state={ecoPayzField} setState={setEcoPayzField}
        />

        <WMSubForm state={webMoneyField} setState={setWebMoneyField} />

        <Submit state={submitMsg} setState={setSubmitMsg} />
      </form>
    </div>
  )
}
