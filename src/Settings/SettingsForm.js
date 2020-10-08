import React, { useState } from 'react'
import { stringFieldDefaultState } from '../reusable'

export const SettingsForm = () => {

  const [fundField, setFundField] = useState('')
  const [eMailField, setEMailField] = useState('')
  const [skypeField, setSkypeField] = useState(stringFieldDefaultState)



  return (
    <div>
      <form className="ui form">
        <div className="field">
          <label htmlFor="fund">@(Фонд)</label>
          <p>{fundField}</p>
        </div>
      </form>
    </div>
  )
}
