import React, { useEffect, useState } from 'react'
import { Submit } from '../components/Submit'
let WS
let reportFormPayload = {}

export const ReportForm = () => {

  const formAPI = {
    reportForm: {
      callForm: (payload = {}) => {
        reportFormPayload = { ...payload }
        fetcher(reportFormPayload)
      }
    }
  }
  window.formAPI = { ...window.formAPI, ...formAPI }

  const [formData, setFormData] = useState([])
  const [listOfUsers, setListOfUsers] = useState([])
  const [accountsInfo, setAccountsInfo] = useState({})
  const [newData, setNewData] = useState({
    date: 'SET ON SERVER?',
    accounts: null
  })

  //Alerts
  const [errorMsg, setErrorMsg] = useState(null)
  const [submitMsg, setSubmitMsg] = useState(null)

  const fetcher = async (payload = {}) => {
    WS = new WebsocketPromiseLiteClient({
      url: 'ws://localhost:5555'
    })
    await WS.connectionEstablished()
    const response = await WS.send('reports', 'reportFormData', payload)
    responseHandler(response)
  }

  const responseHandler = response => {
    const reportForm = response && response.reports
    const accountsMeta = response && response.accountsMeta
    if (response.status === 'OK') {
      setErrorMsg(false)
      setFormData(reportForm)
      setAccountsInfo(accountsMeta)
      const alisia = Object.keys(accountsMeta)
      setListOfUsers(alisia)
      let testo = { ...newData }
      alisia.map(user => {
        const mutable = { ...testo.accounts }
        mutable[user] = {
          name: user,
          loadSum: accountsMeta[user].loadSumValue,
          tournCount: accountsMeta[user].tournCountValue
        }
        testo = { ...testo, accounts: mutable }
      })
      setNewData(testo)
      if (response.message) {
        return response.message
      } else return '@(Информация обновлена)'
    } else setErrorMsg('@(Ошибка подключения)')

  }

  useEffect(() => {
    fetcher(reportFormPayload)
  }, [])

  const dateLooperTh = array => {
    const result = []
    for (let i = 0; i < 5; i++) {
      const reportItem = array[i];
      if (reportItem) result.push(<th key={reportItem.date + i}>{reportItem.date}</th>)
      else result.push(<th key={'emptyobj' + i}> 0 </th>)
    }
    return result
  }

  const dateLooperTd = (name, key) => {
    const result = []
    for (let i = 0; i < 5; i++) {
      const dateObject = formData[i];
      if (dateObject && dateObject.accounts[name]) {
        result.push(<td key={dateObject.accounts[name][key] + i}>{dateObject.accounts[name][key]}</td>)
      }
      else result.push(<th key={'emptyobj' + i}>0</th>)
    }
    return result
  }

  const onSubmit = async e => {
    e.preventDefault()
    const toSend = { ...newData.accounts }
    
    const response = await WS.send('reports', 'formSubmit', { dataSubmit: toSend, dataSender: reportFormPayload })
    if (response.status === 'OK') {
      const response = await WS.send('reports', 'reportFormData', reportFormPayload)
      const msg = responseHandler(response)
      setErrorMsg(false)
      msg ? setSubmitMsg(msg) : setSubmitMsg(true)
    } else setErrorMsg(response.message ? response.message : '@(Ошибка подключения при отправлении)')
  }

  const onReset = () => {
    listOfUsers && listOfUsers.length && listOfUsers.map((user) => {
      const mutable = { ...newData.accounts }
      mutable[user].loadSum = ''
      mutable[user].tournCount = ''
      setNewData({ ...newData, accounts: mutable })
    })
  }

  return (
    <form className="ui form" onSubmit={onSubmit} onReset={onReset}>
      {//Error message
        errorMsg && <div className="ui alert message">
          <h5 className="text red">{errorMsg ? errorMsg : '@(Ошибка соединения с сервером)'}</h5>
        </div>
      }
      <button className="ui button teal small right floated" type="submit">@(Отправить)</button>
      <table className="ui celled table compact stackable">
        <thead>
          <tr>
            <th rowSpan="2">@(Название)</th>
            <th rowSpan="2">@(Для заполнения)</th>
            <th colSpan="5">@(Предыдущие заполнения)</th>
          </tr>
          <tr>
            {dateLooperTh(formData)}
          </tr>
        </thead>

        <>
          {Boolean(formData.length) && Boolean(listOfUsers.length) && listOfUsers.map((item, index) => {
            const onChange = e => {
              const mutable = { ...newData.accounts }
              mutable[item] = { ...mutable[item], [e.target.name]: e.target.value }
              setNewData({ ...newData, accounts: mutable })
            }
            return (<tbody key={index + item}>

              <tr><td colSpan="7" className="positive">{item}</td></tr>
              <tr>
                <td>{accountsInfo[item].loadSumName}</td>
                <td>

                  {newData.accounts && newData.accounts[item] &&
                    <input type="number" name="loadSum" required
                      value={newData.accounts[item].loadSum ? newData.accounts[item].loadSum : '0'}
                      onChange={onChange} min="0" step={0.01}
                    />
                  }

                </td>
                {dateLooperTd(item, 'loadSum')}
              </tr>

              <tr>
                <td>{accountsInfo[item].tournCountName}</td>
                <td>

                  {newData.accounts && newData.accounts[item] &&
                    <input type="number" name="tournCount" required
                      value={newData.accounts[item].tournCount ? newData.accounts[item].tournCount : '0'}
                      onChange={onChange} min="0" step={0.01}
                    />
                  }

                </td>
                {dateLooperTd(item, 'tournCount')}
              </tr>
            </tbody>)
          })}
        </>
      </table>
      <button className="ui button red" type="reset">@(Сбросить)</button>
      <Submit state={submitMsg} setState={setSubmitMsg} />

    </form>
  )
}
