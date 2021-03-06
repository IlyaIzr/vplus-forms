import React, { useEffect, useState } from 'react'
import './Package.css'
import { SelectField } from '../components/SelectField'
import { numberFieldDefaultState, stringFieldDefaultState } from '../reusable'
import { Submit } from '../components/Submit'
// Extra stuff
let WS
let userInfoPayload = {}


export const PackageForm = () => {

  const formAPI = {
    packageForm: {
      callForm: (userInfo = {}) => {
        userInfoPayload = { ...userInfo }
        fetcher(userInfoPayload)
      }
    }
  }
  window.formAPI = { ...window.formAPI, ...formAPI }

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
  //Alerts
  const [errorMsg, setErrorMsg] = useState(null)
  const [submitMsg, setSubmitMsg] = useState(null)


  async function fetcher(userInfo) {
    WS = new WebsocketPromiseLiteClient({
      url: 'ws://localhost:5555'
    })
    await WS.connectionEstablished()
    console.log('request did run with user info of');
    console.log(userInfo);
    const response = await WS.send('packages', 'packageFormData', { userInfo })
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

    if (roomsFieldMeta) {
      setErrorMsg(false)
      const options = []
      await roomsFieldMeta.options.forEach((serverOption) => {
        options.push({ value: serverOption.id, label: serverOption.name })
      })

      const value = []
      await roomsFieldMeta.value.forEach((serverValue) => {
        value.push({ value: serverValue.id, label: serverValue.name })
      })
      setRoomsField({ ...roomsFieldMeta, options, value })
    } else setErrorMsg('@(Ошибка подключения)')

    tournamentsNumberMeta && setTournamentsField(tournamentsNumberMeta)
    // slider sets
    playerRiskMeta && setPlayerRiskField(playerRiskMeta)
    fundRiskMeta && setFundRiskField(fundRiskMeta)
    playerRiskMeta && setPlayerRisk(playerRiskMeta.value)
    // end of slider sets
    BIMeta && setABIField(BIMeta)
    BRSumField && setBRSumField(BRSumField)
    RollbackField && setRollbackField(RollbackField)
    BuyInsField && setBuyInsField(BuyInsField)
    ExtraInfoField && setExtraInfoField(ExtraInfoField)

    // WS.close()
  }

  useEffect(() => {

    fetcher(userInfoPayload)
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
      extraInfoField,
      payload: userInfoPayload
    }
    const response = await WS.send('packages', 'formSubmit', { dataSubmit: formData, dataSender: userInfoPayload })
    if (response.status === 'OK') {
      setErrorMsg(false)
      response.message ? setSubmitMsg(response.message) : setSubmitMsg(true)
    } else setErrorMsg('@(Ошибка подключения при отправлении)')
  }
  const onReset = () => {
    setRoomsField({ ...roomsField, value: [] })
    setTournamentsField({ ...tournamentsField, value: '' })
    setPlayerRiskField({ ...numberFieldDefaultState, max: 100, min: 0 })
    setFundRiskField({ ...numberFieldDefaultState, max: 100, min: 0 })
    setPlayerRisk(50)
    setABIField({ ...aBIField, value: '' })
    setBRSumField({ ...bRSumField, value: '' })
    setRollbackField({ ...rollbackField, value: '' })
    setBuyInsField({ ...buyInsField, value: '' })
    setExtraInfoField({ ...stringFieldDefaultState, isRequired: false })
  }

  return (
    <div>
      <form className="ui form" onSubmit={onSubmit} onReset={onReset}>
        <h3 className="title">@(Новый пакет)</h3>

        {//Error message
          errorMsg && <div className="ui alert message">
            <h5 className="text red">{errorMsg ? errorMsg : '@(Ошибка соединения с сервером)'}</h5>
          </div>
        }

        <div className={`field ${tournamentsField.isRequired && 'required'}`} >
          <label htmlFor="tournamentsField">@(Количество турниров в пакете) </label>
          <input type="number" value={tournamentsField.value} required={tournamentsField.isRequired}
            disabled={!tournamentsField.isEditable} min={tournamentsField.min} max={tournamentsField.max}
            onChange={onTournamentsFieldChange} name="tournamentsField" step={0.01}
          />
        </div>


        <h4 className="title">@(Заявленные доли рисков в пакете)</h4>
        <div className="three fields">

          <div className={`field ${playerRiskField.isRequired && 'required'}`} >
            <label htmlFor="playerRiskField">Игрок</label>
            <input type="number" value={playerRisk} required={playerRiskField.isRequired}
              disabled={!playerRiskField.isEditable} min={playerRiskField.min} max={playerRiskField.max}
              onChange={onRiskChange} name='playerRiskField' step={0.01}
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
              onChange={onRiskChange} name='fundRiskField' step={0.01}
            />
          </div>

        </div>

        <div className="ui horizontal divider"></div>

        <div className="two fields">

          <div className={`field ${aBIField.isRequired && 'required'}`} >
            <label htmlFor="buyInsField">@(Рекомендованное количество БИ)</label>
            <input type="number" value={aBIField.value} required={aBIField.isRequired}
              disabled={!aBIField.isEditable} min={aBIField.min} max={aBIField.max}
              onChange={onABIFieldChange} step={0.01}
            />
          </div>

          <div className={`field ${bRSumField.isRequired && 'required'}`} >
            <label htmlFor="buyInsField">@(Сумма игрока в своей БР)</label>
            <input type="number" value={bRSumField.value} required={bRSumField.isRequired}
              disabled={!bRSumField.isEditable} min={bRSumField.min} max={bRSumField.max}
              onChange={onBRSumFieldChange} step={0.01}
            />
          </div>
        </div>

        <div className="two fields">

          <div className={`field ${rollbackField.isRequired && 'required'}`} >
            <label htmlFor="rollbackField">@(Величина отката игроку)</label>
            <input type="number" value={rollbackField.value} required={rollbackField.isRequired}
              disabled={!rollbackField.isEditable} min={rollbackField.min} max={rollbackField.max}
              onChange={onRollbackChange} name='rollbackField' step={0.01}
            />
          </div>

          <div className={`field ${buyInsField.isRequired && 'required'}`} >
            <label htmlFor="buyInsField">@(Кол-во байинов на счету игрока)</label>
            <input type="number" value={buyInsField.value} required={buyInsField.isRequired}
              disabled={!buyInsField.isEditable} min={buyInsField.min} max={buyInsField.max}
              onChange={onBuyInsFieldChange} step={0.01}
            />
          </div>
        </div>

        <SelectField label='Выберите один или несколько румов' options={roomsField.options}
          isMulti={true} onChange={onRoomsChange} value={roomsField.value} name="rooms"
          isRequired={roomsField.isRequired}
        />

        <div className="field">
          <label htmlFor="extraInfoField">@(Дополнительные условия пакета)</label>
          <textarea name="extraInfoField" cols="100" rows="10" value={extraInfoField.value}
            onChange={onExtraInfoChange} disabled={!extraInfoField.isEditable} />
        </div>


        <button type='reset' className='ui button red'>@(Сбросить поля)</button>
        <Submit state={submitMsg} setState={setSubmitMsg} />
      </form>
    </div>
  )
}
