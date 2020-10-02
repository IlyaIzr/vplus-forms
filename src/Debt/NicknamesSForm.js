import React from 'react'
import { SelectCreatableField } from '../components/SelectCreatableField'
import { StringField } from '../components/StringField'

export const NicknamesSForm = ({ field, options, onSiteChange, onNickChange, index }) => {
  const onSiteSelect = options => onSiteChange(options, index)
  const onStringChange = e => onNickChange(e.target.name, e.target.value, index)
  return (
    <div>
      <SelectCreatableField name="site" label="@(сайт)"
        isEditable={true} isRequired={true} isMulti={true}
        options={options} value={field.sites}
        onChange={onSiteSelect}
      />
      <StringField name="nickname" label="@(никнейм)"
        value={field.nickname} onChange={onStringChange}
      />

      <StringField name="email" label="@(никнейм)"
        value={field.email} onChange={onStringChange}
      />
    </div>
  )
}
