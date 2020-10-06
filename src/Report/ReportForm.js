import React, { useEffect, useState } from 'react'
import { reportForm } from './fakeData'

export const ReportForm = () => {
  const [formData, setFormData] = useState({
    value: [], isEditable: true
  })
  // const [prevDates, setPrevDates] = useState([])

  useEffect(() => {
    setFormData(reportForm)
  }, [])

  const dateLooperTh = datesArr => {
    const result = []
    for (let i = 0; i < 5; i++) {
      const dateObject = datesArr[i];
      if (dateObject) result.push(<th key={dateObject.date + i}>{dateObject.date}</th>)
      else result.push(<th key={'emptyobj' + i}>0</th>)
    }
    return result
  }

  const dateLooperTd = (datesArr, key) => {
    const result = []
    for (let i = 0; i < 5; i++) {
      const dateObject = datesArr[i];
      if (dateObject) result.push(<td key={dateObject[key] + i}>{dateObject[key]}</td>)
      else result.push(<th key={'emptyobj' + i}>0</th>)
    }
    return result
  }

  return (
    <form className="ui form">

      {formData.value && Boolean(formData.value.length) && formData.value.map((roomItem, index) => {
        const onChange = e => {
          const mutable = [...formData.value]
          mutable[index][e.target.name] = e.target.value
          setFormData({ ...formData, value: mutable })
        }

        return (<table className="ui celled table" key={index + 'table'}>
          <thead>
            <tr className="warning"><th colSpan="7">{roomItem.label}</th></tr>
            <tr>
              <th rowSpan="2"></th>
              <th rowSpan="2">@(для заполнения)</th>
              <th colSpan="5">@(Предыдущие заполнения)</th>
            </tr>
            <tr>
              {roomItem.prevData && Boolean(roomItem.prevData.length) && dateLooperTh(roomItem.prevData)}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>@(Название рума)</td>
              <td>
                <input type="text" name="roomName" value={roomItem.roomName} onChange={onChange} />
              </td>
              {roomItem.prevData && Boolean(roomItem.prevData.length) && dateLooperTd(roomItem.prevData, 'roomName')}
            </tr>

            <tr>
              <td>@(Сумма загрузки)</td>
              <td>
                <input type="number" name="loadSum" value={roomItem.loadSum} onChange={onChange} />
              </td>
              {roomItem.prevData && Boolean(roomItem.prevData.length) && dateLooperTd(roomItem.prevData, 'loadSum')}
            </tr>
          </tbody>

        </table>)
      })}

    </form>
  )
}
