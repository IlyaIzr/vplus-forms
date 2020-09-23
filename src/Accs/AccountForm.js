import React, { useState } from 'react'
import { SelectField } from '../components/SelectField'
import { StringField } from '../components/StringField'
import { stringFieldDefaultState } from '../reusable'

export const AccountForm = () => {
  const [socialField, setSocialField] = useState({
    options: [
      { label: '@(Отменить выбор)', value: '' },
      { label: 'VK', value: 'vk' },
      { label: 'Facebook', value: 'facebook' }
    ],
    value: '',
    isEditable: true,
    isRequired: false,
  })
  const onSocialChange = option => setSocialField({ ...socialField, value: option })

  const [socialLoginField, setSocialLogin] = useState(stringFieldDefaultState)
  const onSocialLoginChange = e => setSocialLogin({ ...socialLoginField, value: e.target.value })
  const [socialNameField, setSocialName] = useState(stringFieldDefaultState)
  const onSocialNameChange = e => setSocialName({ ...socialNameField, value: e.target.value })
  const [socialSecondNameField, setSocialSecondName] = useState(stringFieldDefaultState)
  const onSocialSecondName = e => setSocialSecondName({ ...socialSecondNameField, value: e.target.value })
  const [socialThirdNameField, setSocialThirdName] = useState({ ...stringFieldDefaultState, isRequired: false })
  const onSocialThirddName = e => setSocialThirdName({ ...socialThirdNameField, value: e.target.value })


  return (
    <div className="ui container"><br />
      <h2>@(Аккаунты и счета)</h2>
      <form className="ui form">

        <div className="ui segment">
          <h4>@(Соцсети)</h4>
          <SelectField label="@(Выберите соцсеть)" name="social"
            isRequired={socialField.isRequired} isEditable={socialField.isEditable}
            options={socialField.options} value={socialField.value} onChange={onSocialChange}
          />

          {socialField.value && socialField.value.value && <div>
            <StringField label="@(Логин или почта)" name="socialLogin"
              isRequired={socialLoginField.isRequired} isEditable={socialLoginField.isEditable}
              value={socialLoginField.value} onChange={onSocialLoginChange}
            />
            <div className="three fields">
              <StringField label="@(Имя)" name="socialName"
                isRequired={socialNameField.isRequired} isEditable={socialNameField.isEditable}
                value={socialNameField.value} onChange={onSocialNameChange}
              />
              <StringField label="@(Фамилия)" name="socialSecondName"
                isRequired={socialSecondNameField.isRequired} isEditable={socialSecondNameField.isEditable}
                value={socialSecondNameField.value} onChange={onSocialSecondName}
              />
              <StringField label="@(Отчество)" name="socialThirdName"
                isRequired={socialThirdNameField.isRequired} isEditable={socialThirdNameField.isEditable}
                value={socialThirdNameField.value} onChange={onSocialThirddName}
              />
            </div>
          </div>}
        </div>

      </form>
    </div>
  )
}
