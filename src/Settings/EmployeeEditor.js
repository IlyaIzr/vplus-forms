import React from 'react'
import { SelectField } from '../components/SelectField'
import { StringField } from '../components/StringField'
import { components } from 'react-select';

export const EmployeeEditor = ({
  nameState, setNameState,
  eMailState, setEMailState,
  fundsState, setFundsState
}) => {
  const onNameChange = e => setNameState({ ...nameState, value: e.target.value })
  const onEMailChange = e => setEMailState({ ...eMailState, value: e.target.value })
  const onSelect = option => setFundsState({ ...fundsState, value: option })

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
        isMulti={true} optionWrapper={OptionWraper}
      />
      <h4>@(Возможность добавлять сотрудников)</h4>
      {Boolean(fundsState.value) && Boolean(fundsState.value.length) && fundsState.value.map((fund, index) => {
        const onCheckbox = e => {
          const mutable = [...fundsState.value]
          {/* mutable[index].isAdmin = e.target.checked */}
          mutable[index].isAdmin = !mutable[index].isAdmin
          setFundsState({ ...fundsState, value: mutable })
        }
        const pe = ()=> onCheckbox()
        return (<div key={fund.id} onClick={onCheckbox}
          className={`employeeAdditionRow ${fund.isAdmin ? "employeeIsAdmin" : "employeeNotAdmin"}`} >
          <span>{fund.label}</span>
          <input type="checkbox" checked={fund.isAdmin} onClick={pe} />
        </div>)
      })
      }

    </div>
  )
}


const { Option } = components
const OptionWraper = (props) => {
  return (<Option {...props} className={props.data.isAdmin ? "optionHasExtra" : "optionDefault"}>
    {props.data.label}
    <div>
      @(Возможность добавлять) <input
        type="checkbox" name={props.data.value} checked={props.data.isAdmin}
        style={{ marginTop: 4 }}
      />
    </div>
  </Option>
  )
};