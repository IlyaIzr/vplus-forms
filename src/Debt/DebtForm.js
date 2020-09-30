import React, { useState, useEffect } from 'react'
import { SelectField } from '../components/SelectField'
import { StringField } from '../components/StringField'
import { NumberField } from '../components/NumberField'
import { stringFieldDefaultState, selectDefaultState, optionSpreader } from '../reusable'
// fake data
import { formTitle } from './fakeData'


export const DebtForm = () => {
  //Fields
  const [title, setTitle] = useState('')

  useEffect(() => {
    setTitle(formTitle)

  }, [])

  return (
    <div className="ui container">
      <form className="ui form">
        <h1 className="title">{title}</h1>

      </form>
    </div>
  )
}
