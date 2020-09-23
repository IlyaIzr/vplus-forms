import React from 'react'
import { SelectField } from '../components/SelectField'


export const AccountSubForm = ({
  account,
  options,
  isRequired = true,
  isEditable = true,
  onAccountTypeChange,
  index
}) => {
  const onTypeChange = option => onAccountTypeChange(option, index)
  return (
    <div>
      <SelectField label="@(Тип платежной системы)" name="accountType"
        isRequired={isRequired} isEditable={isEditable}
        options={options} value={account} onChange={onTypeChange}
      />

      {account.value && <h3>Here other fields will renda</h3>}
    </div>
  )
}
