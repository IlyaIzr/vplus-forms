import React, { useEffect, useState } from 'react'
import { stringFieldDefaultState } from '../reusable'
import { StringField } from '../components/StringField'
// Fake data
import { emailFieldMeta, fundFieldMeta, skypeFieldMeta } from './fakeData'

export const SettingsForm = () => {

  const [fundField, setFundField] = useState('')
  const [eMailField, setEMailField] = useState('')
  const [skypeField, setSkypeField] = useState(stringFieldDefaultState)
  const onSkypeChange = e => setSkypeField({ ...skypeField, value: e.target.value })

  useEffect(() => {
    setFundField(fundFieldMeta)
    setEMailField(emailFieldMeta)
    setSkypeField(skypeFieldMeta)
  }, [])

  return (
    <div>
      <form className="ui form">

        <div className="inline field">
          <label htmlFor="fund">@(Фонд): </label>
          <p>{fundField}</p>
        </div>

        <div className="inline field">
          <label htmlFor="fund">@(Почта): </label>
          <p>{eMailField}</p>
        </div>

        <StringField label="Skype" name="skype"
          isEditable={skypeField.isEditable} isRequired={skypeField.isRequired}
          value={skypeField.value} onChange={onSkypeChange} 
        />

      </form>
    </div>
  )
}
