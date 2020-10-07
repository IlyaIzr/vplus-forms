import React, { useState, useEffect } from 'react'
import { SelectCreatableField } from '../components/SelectCreatableField'
import { StringField } from '../components/StringField'
import { stringFieldDefaultState, selectDefaultState, selectNoOptDefaultState, multifieldsDefaultState } from '../reusable'
// fake data
import {
  formTitle, arbitrageFieldMeta, skypeFieldMeta,
  credentialsFieldMeta, nicknamesFieldMeta, gipsyTeamFieldMeta,
  pokerStrategyFieldMeta, disciplineFieldMeta, descriptionFieldMeta, phoneFieldMeta,
  googleAccFieldMeta, mailAccFieldMeta, vkFieldMeta, fbFieldMeta, blogFieldMeta,
  instaFieldMeta, forum2plus2FieldMeta, adressFieldMeta
} from './fakeData'
//
import { ThreeFields } from './ThreeFields'
import { NicknamesSForm } from './NicknamesSForm'
import { InputsMapper, InputsMapperDefaultState } from './InputsMapper'
import { SelectWrapper } from './SelectWrapper'
import { Description } from './Description'
import { AdressThreeFields } from './AdressThreeFields'


export const DebtForm = () => {
  //Fields
  const [title, setTitle] = useState('')
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
    setCredentialsField(mutable)
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
  const [pokerStrategy, setPokerStrategy] = useState(InputsMapperDefaultState)

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

  useEffect(() => {
    setTitle(formTitle)
    setArbitrageField(arbitrageFieldMeta)
    setCredentialsField(credentialsFieldMeta)
    setSkypeField(skypeFieldMeta)
    setNicknameField(nicknamesFieldMeta)
    setGipsyTeamField(gipsyTeamFieldMeta)
    setPokerStrategy(pokerStrategyFieldMeta)
    setDisciplineField(disciplineFieldMeta)
    setDescriptionField(descriptionFieldMeta)
    setGoogleAccField(googleAccFieldMeta)
    setMailAccField(mailAccFieldMeta)
    setPhoneField(phoneFieldMeta)
    setVkField(vkFieldMeta)
    setFbField(fbFieldMeta)
    setBlogField(blogFieldMeta)
    setInstaField(instaFieldMeta)
    setForum2plus2Field(forum2plus2FieldMeta)
    setAdressField(adressFieldMeta)
  }, [])

  const onSubmit = e => {
    e.preventDefault()
    const formData = {
      arbitrageField,
      credentialsField,
      skypeField,
      nicknameField,
      gipsyTeamField,
      pokerStrategy
    }
    console.log(formData)
  }

  return (
    <div className="ui container">
      <form className="ui form" onSubmit={onSubmit}>

        <h1 className="title">{title}</h1>

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
          <button className={`ui button blue small ${!credentialsField.isEditable && 'disabled'}`}
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
          fieldMeta={pokerStrategy} setFieldMeta={setPokerStrategy}
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

        <AdressThreeFields state={adressField} setState={setAdressField}/>

        <button className="ui button teal" type="submit">@(Отправить)</button>
      </form>
    </div>
  )
}
