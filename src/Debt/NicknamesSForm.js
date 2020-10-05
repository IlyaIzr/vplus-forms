import React, { useEffect, useState } from 'react'
import { SelectCreatableField } from '../components/SelectCreatableField'
import { StringField } from '../components/StringField'

export const NicknamesSForm = ({ field, options, onSiteChange, onNickChange, index, deleteField, canDelete }) => {
  const onSiteSelect = options => onSiteChange(options, index)
  const onStringChange = e => onNickChange(e.target.name, e.target.value, index)
  const onClick = () => deleteField(index)

  const [nickIsReq, setNickIsReq] = useState(true)
  const [emailIsReq, setEmailIsReq] = useState(true)
  useEffect(() => {
    if (field.email) {
      setNickIsReq(false)
      setEmailIsReq(true)
    } else {
      setNickIsReq(true)
      setEmailIsReq(false)
    }
  }, [field.nickname, field.email])

  return (
    <div className="ui segment">

      <SelectCreatableField name="site" label="@(сайт)"
        isEditable={true} isRequired={true} isMulti={true}
        options={options} value={field.sites}
        onChange={onSiteSelect}
      />

      <StringField name="nickname" label="@(никнейм)"
        value={field.nickname} onChange={onStringChange}
        isRequired={nickIsReq}
      />

      <div className="ui horizontal divider">@(или)</div>

      <StringField name="email" label="@(e-mail)"
        value={field.email} onChange={onStringChange}
        isRequired={emailIsReq}
      />
      <button className={`ui button red tiny ${!canDelete && ' disabled'}`} onClick={onClick}>@(x)</button>
    </div>
  )
}
