import React, { useEffect, useState } from 'react'
import { reportForm } from './fakeData'

export const ReportForm = () => {
  const [formData, setFormData] = useState([])
  const [listOfUsers, setListOfUsers] = useState([])
  const [newData, setNewData] = useState({
    date: 'SET ON SERVER?',
    accounts: null
  })

  useEffect(() => {
    setFormData(reportForm)
    const alisia = Object.keys(reportForm[0].accounts)
    setListOfUsers(alisia)
    let testo = { ...newData }
    alisia.map(user => {
      const mutable = { ...testo.accounts }
      mutable[user] = { name: user, loadSum: '', tournCount: '' }
      testo = { ...testo, accounts: mutable }
    })
    setNewData(testo)
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

  return (
    <form className="ui form"> <table className="ui celled table">

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
            setNewData({ ...newData.date, accounts: mutable })
          }
          return (<tbody key={index + item}>

            <tr><td colSpan="7">{item}</td></tr>
            <tr>
              <td>@(Количество турниров)</td>
              <td>

                {newData.accounts && newData.accounts[item] &&
                  <input type="number" name="tournCount"
                    value={newData.accounts[item].tournCount} onChange={onChange} min="0"
                  />
                }

              </td>
              {dateLooperTd(item, 'tournCount')}
            </tr>
            
            <tr>
              <td>@(Сумма загрузки)</td>
              <td>

                {newData.accounts && newData.accounts[item] &&
                  <input type="number" name="loadSum"
                    value={newData.accounts[item].loadSum} onChange={onChange} min="0"
                  />
                }

              </td>
              {dateLooperTd(item, 'loadSum')}
            </tr>
          </tbody>)
        })}
      </>
    </table> </form>
  )
}
