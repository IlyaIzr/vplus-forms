import React, { useState, useEffect } from 'react'
import { SelectField } from '../components/SelectField'
import { SelectCreatableField } from '../components/SelectCreatableField'
import { StringField } from '../components/StringField'
import { NumberField } from '../components/NumberField'
import { stringFieldDefaultState, selectDefaultState, optionSpreader, multifieldsDefaultState } from '../reusable'
// fake data
import { formTitle, arbitrageFieldMeta, skypeFieldMeta, credentialsFieldMeta } from './fakeData'
import { ThreeFields } from './ThreeFields'


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

  useEffect(() => {
    setTitle(formTitle)
    setArbitrageField(arbitrageFieldMeta)
    setCredentialsField(credentialsFieldMeta)
    setSkypeField(skypeFieldMeta)
  }, [])

  return (
    <div className="ui container">
      <form className="ui form">

        <h1 className="title">{title}</h1>

        <StringField name="arbitrage" label="@(Арбитраж)"
          isEditable={arbitrageField.isEditable} isRequired={arbitrageField.isRequired}
          value={arbitrageField.value} onChange={onArbitrageChange}
        />
        <div className="field ui segment">
          <label htmlFor="">@(ФИО)</label>
          {credentialsField.value && Boolean(credentialsField.value) && credentialsField.value.map((field, index) => {
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

      </form>
    </div>
  )
}
