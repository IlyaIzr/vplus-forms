import React, { useState, useEffect } from 'react'
import { SelectField } from '../components/SelectField'
import { SelectCreatableField } from '../components/SelectCreatableField'
import { StringField } from '../components/StringField'
import { NumberField } from '../components/NumberField'
import { stringFieldDefaultState, selectDefaultState, optionSpreader } from '../reusable'
// fake data
import { formTitle, arbitrageFieldMeta, skypeFieldMeta } from './fakeData'


export const DebtForm = () => {
  //Fields
  const [title, setTitle] = useState('')
  const [arbitrageField, setArbitrageField] = useState(stringFieldDefaultState)
  const onArbitrageChange = e => setArbitrageField({ ...arbitrageField, value: e.target.value })
  const [skypeField, setSkypeField] = useState(selectDefaultState)
  const onSkypeChange = options => setSkypeField({ ...skypeField, value: options })

  useEffect(() => {
    setTitle(formTitle)
    setArbitrageField(arbitrageFieldMeta)
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

        <SelectCreatableField name="skype" label="@(Skype)"
          isEditable={skypeField.isEditable} isRequired={skypeField.isRequired}
          value={skypeField.value} onChange={onSkypeChange} isMulti={true}
        />
        
      </form>
    </div>
  )
}
