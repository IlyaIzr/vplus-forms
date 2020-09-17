import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
//Fake data
import {
  timeout, roomsFieldMeta, tournamentsNumberMeta,
  playerRiskMeta, fundRiskMeta, extraInfoMeta
} from './fakeData'
// Extra stuff
const animatedComponents = makeAnimated()
const numberFieldDefaultState = {
  value: '',
  isEditable: true,
  isRequired: true,
  min: '',
  max: ''
}
const stringFieldDefaultState = {
  value: '',
  isEditable: true,
  isRequired: true
}

export const PackageForm = () => {

  const [roomsField, setRoomsField] = useState({
    options: [],
    isEditable: false,
    isRequired: true,
    value: []
  })
  const onRoomsChange = options => {
    setRoomsField({ ...roomsField, value: options })
  }

  const [tournamentsField, setTournamentsField] = useState(numberFieldDefaultState)
  const onTournamentsFieldChange = e => setTournamentsField({
    ...tournamentsField, value: e.target.value
  })

  //two-sides slider
  const [playerRisk, setPlayerRisk] = useState(50)
  const [playerRiskField, setPlayerRiskField] = useState({ ...numberFieldDefaultState, max: 100, min: 0 })
  const [fundRiskField, setFundRiskField] = useState({ ...numberFieldDefaultState, max: 100, min: 0 })
  const onRiskChange = e => {
    if (e.target.name === 'playerRiskField' || e.target.name === 'playerRisk') {
      setPlayerRisk(e.target.value)
      setPlayerRiskField({ ...playerRiskField, value: e.target.value })
      setFundRiskField({ ...fundRiskField, value: 100 - e.target.value })
    } else if (e.target.name === 'fundRiskField') {
      setPlayerRisk(100 - e.target.value)
      setPlayerRiskField({ ...playerRiskField, value: 100 - e.target.value })
      setFundRiskField({ ...fundRiskField, value: e.target.value })
    }
  }

  const [extraInfoField, setExtraInfoField] = useState({...stringFieldDefaultState, isRequired: false})
  const onExtraInfoChange = e => setExtraInfoField({...extraInfoField, value: e.target.value})

  useEffect(() => {
    setTimeout(() => {
      const options = []
      roomsFieldMeta.options.forEach((serverOption) => {
        options.push({ value: serverOption.id, label: serverOption.name })
      })
      const value = []
      roomsFieldMeta.value.forEach((serverValue) => {
        value.push({ value: serverValue.id, label: serverValue.name })
      })
      setRoomsField({ ...roomsFieldMeta, options, value })
      setTournamentsField(tournamentsNumberMeta)
      // slider sets
      setPlayerRiskField(playerRiskMeta)
      setFundRiskField(fundRiskMeta)
      setPlayerRisk(playerRiskMeta.value)
      // end of slider sets
      setExtraInfoField(extraInfoMeta)
    }, timeout);
  }, [])

  return (
    <div className="ui container">
      <br />
      <form className="ui from">
        <h3 className="title">Новый пакет</h3>


        <div className={`ui field ${tournamentsField.isRequired && 'required'}`} >
          <label htmlFor="tournamentsField">Количество турниров в пакете</label>
          <input type="number" value={tournamentsField.value} required={tournamentsField.isRequired}
            disabled={!tournamentsField.isEditable} min={tournamentsField.min} max={tournamentsField.max}
            onChange={onTournamentsFieldChange}
          />
        </div>


        <h4 className="title">Заявленные доли рисков в пакете</h4>
        <div className="three fields">
          <br />

          <div className={`field ${playerRiskField.isRequired && 'required'}`} >
            <label htmlFor="playerRiskField">Игрок</label>
            <input type="number" value={playerRisk} required={playerRiskField.isRequired}
              disabled={!playerRiskField.isEditable} min={playerRiskField.min} max={playerRiskField.max}
              onChange={onRiskChange} name='playerRiskField'
            />
          </div>

          <div className="field">
            <input type="range" name="playerRisk" value={playerRisk} onChange={onRiskChange} />
          </div>

          <div className={`field ${fundRiskField.isRequired && 'required'}`} >
            <label htmlFor="fundRiskField">Фонд</label>
            <input type="number" value={100 - playerRisk} required={fundRiskField.isRequired}
              disabled={!fundRiskField.isEditable} min={fundRiskField.min} max={fundRiskField.max}
              onChange={onRiskChange} name='fundRiskField'
            />
          </div>

        </div>
        <hr />

        <div className="two">

        </div>

        <div className="field">
          <label htmlFor="rooms">Выберите один или несколько румов</label>
          <Select name="rooms" options={roomsField.options} isMulti onChange={onRoomsChange}
            components={animatedComponents} value={roomsField.value}
          />
        </div>

        <div className="field">
          <label htmlFor="extraInfoField">Дополнительные условия пакета</label>
          <textarea name="extraInfoField" cols="100" rows="10" value={extraInfoField.value}
          onChange={onExtraInfoChange} disabled={!extraInfoField.isEditable}/>
        </div>
      </form>
    </div>
  )
}
