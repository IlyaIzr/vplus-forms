import React, { useState, useEffect } from 'react'
import { SelectField } from '../components/SelectField'
import { SelectCreatableField } from '../components/SelectCreatableField'
import { StringField } from '../components/StringField'
import { NumberField } from '../components/NumberField'
import { stringFieldDefaultState, selectDefaultState, optionSpreader, multifieldsDefaultState } from '../reusable'
// fake data
import {
  formTitle, arbitrageFieldMeta, skypeFieldMeta,
  credentialsFieldMeta, nicknamesFieldMeta, gipsyTeamFieldMeta,
  pokerStrategyFieldMeta, disciplineFieldMeta, descriptionFieldMeta
} from './fakeData'
//
import { ThreeFields } from './ThreeFields'
import { NicknamesSForm } from './NicknamesSForm'
import { InputsMapper, InputsMapperDefaultState } from './InputsMapper'
import { SelectWrapper } from './SelectWrapper'
import { Description } from './Description'


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
  const [descriptionField, setDescriptionField] = useState({
    value: [],
    isEditable: true,
    isRequired: true
  })

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

        <Description state={descriptionField} setState={setDescriptionField}/>

        <button className="ui button teal" type="submit">@(Отправить)</button>
      </form>
    </div>
  )
}
