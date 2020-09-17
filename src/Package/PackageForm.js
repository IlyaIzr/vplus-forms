import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
//Fake data
import { timeout, roomsFieldMeta } from './fakeData';
// Extra stuff
const animatedComponents = makeAnimated();

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
    }, timeout);
  }, [])

  return (
    <div className="ui container">
      <br />
      <form className="ui from">
        <div className="field">
          <label htmlFor="rooms">Выберите один или несколько румов</label>
          <Select name="rooms" options={roomsField.options} isMulti onChange={onRoomsChange}
            components={animatedComponents} value={roomsField.value}
          />
        </div>
      </form>
    </div>
  )
}
