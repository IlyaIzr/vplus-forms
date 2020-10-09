import React from 'react'
import { SelectField } from '../components/SelectField'
import { StringField } from '../components/StringField'

export const EmployeeEditor = ({
  nameState, setNameState,
  eMailState, setEMailState,
  fundsState, setFundsState,
  isAdminState, setisAdminState
}) => {
  const onNameChange = e => setNameState({ ...nameState, value: e.target.value })
  const onEMailChange = e => setEMailState({ ...eMailState, value: e.target.value })
  const onSelect = option => setFundsState({ ...fundsState, value: option })
  const onCheck = () => setisAdminState({ ...isAdminState, value: !isAdminState.value })

  return (
    <div>

      <StringField label="@(Имя)" name="name" className="inline"
        isEditable={nameState.isEditable} isRequired={nameState.isRequired}
        value={nameState.value} onChange={onNameChange}
      />

      <StringField label="@(Почта)" name="email" type="email" className="inline"
        isEditable={eMailState.isEditable} isRequired={eMailState.isRequired}
        value={eMailState.value} onChange={onEMailChange}
      />

      <SelectField label="@(Фонд)" name="fund"
        isEditable={fundsState.isEditable} isRequired={fundsState.isRequired}
        value={fundsState.value} onChange={onSelect} options={fundsState.options}
        isMulti={true}
      />

      <div className="field">
        <label htmlFor="isAdmin">@(Возможность добавлять сотрудников)</label>
        <input type="checkbox" name="isAdmin" checked={isAdminState.value}
          className={!isAdminState.isEditable ? 'disabled' : ''}
          required={false}
          onChange={onCheck}
        />
      </div>

    </div>
  )
}
