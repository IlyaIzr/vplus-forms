import React, { useEffect, useState } from 'react'
import './Package.css'
import { SelectField } from '../components/SelectField'
//Fake data
import {
  timeout, roomsFieldMeta, tournamentsNumberMeta,
  playerRiskMeta, fundRiskMeta, extraInfoMeta, aBIMeta
} from './fakeData'
// Extra stuff

let WS
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
  const onRoomsChange = options => { setRoomsField({ ...roomsField, value: options }) }

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

  const [aBIField, setABIField] = useState(numberFieldDefaultState)
  const onABIFieldChange = e => setABIField({ ...aBIField, value: e.target.value })

  const [bRSumField, setBRSumField] = useState(numberFieldDefaultState)
  const onBRSumFieldChange = e => setBRSumField({ ...bRSumField, value: e.target.value })

  const [rollbackField, setRollbackField] = useState({ ...numberFieldDefaultState })
  const onRollbackChange = e => { setRollbackField({ ...rollbackField, value: e.target.value }) }

  const [buyInsField, setBuyInsField] = useState(numberFieldDefaultState)
  const onBuyInsFieldChange = e => setBuyInsField({ ...buyInsField, value: e.target.value })

  const [extraInfoField, setExtraInfoField] = useState({ ...stringFieldDefaultState, isRequired: false })
  const onExtraInfoChange = e => setExtraInfoField({ ...extraInfoField, value: e.target.value })


  useEffect(() => {
    async function fetcher() {
      WS = new WebsocketPromiseLiteClient({
        url: 'ws://localhost:5555'
      })
      await WS.connectionEstablished()
      const response = await WS.send('package', 'packageFormData', {})
      const {
        roomsFieldMeta,
        tournamentsNumberMeta,
        playerRiskMeta,
        fundRiskMeta,
        BIMeta,
        BRSumField,
        RollbackField,
        BuyInsField,
        ExtraInfoField
      } = response

      const options = []
      await roomsFieldMeta.options.forEach((serverOption) => {
        options.push({ value: serverOption.id, label: serverOption.name })
      })
      const value = []
      await roomsFieldMeta.value.forEach((serverValue) => {
        value.push({ value: serverValue.id, label: serverValue.name })
      })
      
      setRoomsField({ ...roomsFieldMeta, options, value })
      setTournamentsField(tournamentsNumberMeta)
      // slider sets
      setPlayerRiskField(playerRiskMeta)
      setFundRiskField(fundRiskMeta)
      setPlayerRisk(playerRiskMeta.value)
      // end of slider sets
      setABIField(BIMeta)
      setBRSumField(BRSumField)
      setRollbackField(RollbackField)
      setBuyInsField(BuyInsField)
      setExtraInfoField(ExtraInfoField)

      // WS.close()
    }
    fetcher()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      roomsField,
      tournamentsField,
      playerRiskField,
      fundRiskField,
      aBIField,
      bRSumField,
      rollbackField,
      buyInsField,
      extraInfoField
    }
    console.log(formData)    
    const response = await WS.send('package', 'packageFormData', formData)
  }
  const onReset = () => {
    setRoomsField({ ...roomsField, value: [] })
    setTournamentsField(numberFieldDefaultState)
    setPlayerRiskField({ ...numberFieldDefaultState, max: 100, min: 0 })
    setFundRiskField({ ...numberFieldDefaultState, max: 100, min: 0 })
    setPlayerRisk(50)
    setABIField(numberFieldDefaultState)
    setBRSumField(numberFieldDefaultState)
    setRollbackField(numberFieldDefaultState)
    setBuyInsField(numberFieldDefaultState)
    setExtraInfoField({ ...stringFieldDefaultState, isRequired: false })
  }

  return (
    <div className="ui container">
      <form className="ui form" onSubmit={onSubmit} onReset={onReset}>
        <h3 className="title">Новый пакет</h3>


        <div className={`field ${tournamentsField.isRequired && 'required'}`} >
          <label htmlFor="tournamentsField">Количество турниров в пакете </label>
          <input type="number" value={tournamentsField.value} required={tournamentsField.isRequired}
            disabled={!tournamentsField.isEditable} min={tournamentsField.min} max={tournamentsField.max}
            onChange={onTournamentsFieldChange} name="tournamentsField"
          />
        </div>


        <h4 className="title">Заявленные доли рисков в пакете</h4>
        <div className="three fields">

          <div className={`field ${playerRiskField.isRequired && 'required'}`} >
            <label htmlFor="playerRiskField">Игрок</label>
            <input type="number" value={playerRisk} required={playerRiskField.isRequired}
              disabled={!playerRiskField.isEditable} min={playerRiskField.min} max={playerRiskField.max}
              onChange={onRiskChange} name='playerRiskField'
            />
          </div>

          <div className="field positionRelative">
            <input type="range" name="playerRisk" value={playerRisk} onChange={onRiskChange}
              className="inputRange" />
          </div>

          <div className={`field ${fundRiskField.isRequired && 'required'}`} >
            <label htmlFor="fundRiskField">Фонд</label>
            <input type="number" value={100 - playerRisk} required={fundRiskField.isRequired}
              disabled={!fundRiskField.isEditable} min={fundRiskField.min} max={fundRiskField.max}
              onChange={onRiskChange} name='fundRiskField'
            />
          </div>

        </div>

        <div className="ui horizontal divider"></div>

        <div className="two fields">

          <div className={`field ${aBIField.isRequired && 'required'}`} >
            <label htmlFor="buyInsField">Рекомендованное количество БИ</label>
            <input type="number" value={aBIField.value} required={aBIField.isRequired}
              disabled={!aBIField.isEditable} min={aBIField.min} max={aBIField.max}
              onChange={onABIFieldChange}
            />
          </div>

          <div className={`field ${bRSumField.isRequired && 'required'}`} >
            <label htmlFor="buyInsField">Сумма игрока в своей БР</label>
            <input type="number" value={bRSumField.value} required={bRSumField.isRequired}
              disabled={!bRSumField.isEditable} min={bRSumField.min} max={bRSumField.max}
              onChange={onBRSumFieldChange}
            />
          </div>
        </div>

        <div className="two fields">

          <div className={`field ${rollbackField.isRequired && 'required'}`} >
            <label htmlFor="rollbackField">Величина отката игроку</label>
            <input type="number" value={rollbackField.value} required={rollbackField.isRequired}
              disabled={!rollbackField.isEditable} min={rollbackField.min} max={rollbackField.max}
              onChange={onRollbackChange} name='rollbackField'
            />
          </div>

          <div className={`field ${buyInsField.isRequired && 'required'}`} >
            <label htmlFor="buyInsField">Кол-во байинов на счету игрока</label>
            <input type="number" value={buyInsField.value} required={buyInsField.isRequired}
              disabled={!buyInsField.isEditable} min={buyInsField.min} max={buyInsField.max}
              onChange={onBuyInsFieldChange}
            />
          </div>
        </div>

        <SelectField label='Выберите один или несколько румов' options={roomsField.options}
          isMulti={true} onChange={onRoomsChange} value={roomsField.value} name="rooms"
          isRequired={roomsField.isRequired}
        />

        <div className="field">
          <label htmlFor="extraInfoField">Дополнительные условия пакета</label>
          <textarea name="extraInfoField" cols="100" rows="10" value={extraInfoField.value}
            onChange={onExtraInfoChange} disabled={!extraInfoField.isEditable} />
        </div>


        <button type='reset' className='ui button red'>Сбросить поля</button>
        <button type='submit' className='ui button green'>Отправить</button>
      </form>
    </div>
  )
}
