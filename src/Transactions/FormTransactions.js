import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { components } from 'react-select';
import { SelectField } from '../components/SelectField';
import { NumberField } from '../components/NumberField'
//Fakes
import {
  groupsFieldMetaData, senderAccsMeta, recipientListMeta, senderListMeta,
  recipientsList, recipientAccounts, timeOut
} from './fakeData'
//Other
const fieldSettings = {
  options: [],
  defOption: false,
  isEditable: true,
  isRequired: true
}
const checkMessage = 'Укажите группу'

const optionFormatter = options => {
  const formatedOptions = options && options.map((option) => {
    return ({ label: option.name, value: option.id, subtitle: option.subtitle })
  })
  return formatedOptions
}
const oneOptionFormatter = option => {
  if (option) return { label: option.name, value: option.id, subtitle: option.subtitle }
}


export const FormTransactions = () => {

  const [groupField, setGroupField] = useState(fieldSettings)
  const [senderField, setSenderField] = useState(fieldSettings)
  const [senderAccsField, setSenderAccs] = useState(fieldSettings)
  const [recipientField, setRecipientsField] = useState(fieldSettings)
  const [recipientsAcc, setRecipientsAcc] = useState(fieldSettings)
  const [sum, setSum] = useState('')
  const onSumChange = e => setSum(e.target.value)
  const [comission, setComission] = useState('')
  const onComissionChange = e => setComission(e.target.value)
  const [comment, setComment] = useState('')
  const onCommentChange = e => setComment(e.target.value)
  // Requests
  const groupRequest = (id) => {
    const formatedOptions = optionFormatter(groupsFieldMetaData.options)
    const formatedDefOption = oneOptionFormatter(groupsFieldMetaData.defOption)
    setGroupField({ ...groupsFieldMetaData, options: formatedOptions, defOption: formatedDefOption })
  }

  const senderRequest = (id) => {
    const options = optionFormatter(senderListMeta.options)
    const defOption = oneOptionFormatter(senderListMeta.defOption)
    console.log(defOption)
    setSenderField({ ...senderListMeta, options, defOption })
  }
  const senderAccsRequest = (id) => {
    const options = optionFormatter(senderAccsMeta.options)
    const defOption = oneOptionFormatter(senderAccsMeta.defOption)
    setSenderAccs({ ...senderAccsMeta, options, defOption })
  }
  const recipientRequest = (id) => {
    const options = optionFormatter(recipientListMeta.options)
    const defOption = oneOptionFormatter(recipientListMeta.defOption)
    setRecipientsField({ ...recipientListMeta, options, defOption })
  }
  const recipientAccsRequest = (id) => {
    const options = optionFormatter(senderAccsMeta.options)
    const defOption = oneOptionFormatter(senderAccsMeta.defOption)
    setRecipientsAcc({ ...senderAccsMeta, options, defOption })
  }


  useEffect(() => {
    setTimeout(() => {
      groupRequest()
      if (groupsFieldMetaData.defOption) {
        groupRequest(groupsFieldMetaData.defOption.value)   //value is equivalent of id
        setTimeout(() => {
          senderRequest(groupsFieldMetaData.defOption.value)
          if (senderListMeta.defOption) {
            senderAccsRequest(senderListMeta.defOption.value)
          }
          recipientRequest(groupsFieldMetaData.defOption.value)
          if (recipientListMeta.defOption) {
            recipientAccsRequest(recipientListMeta.defOption.id)
          }
        }, timeOut)
      }
    }, timeOut)
  }, []);

  // Change listeners
  const onChangeGroup = (option) => {
    setGroupField({ ...groupField, defOption: option })
    setTimeout(() => {
      setTimeout(() => {  //call with selected option e.target.value
        senderRequest(option.value)
        recipientRequest(option.value)
      }, timeOut);
    }, timeOut);
  }

  const onChangeSender = option => {
    setSenderField({ ...senderField, defOption: option })
    setTimeout(() => {
      senderAccsRequest()
    }, timeOut);
  }
  const onChangeSenderAcc = option => {
    setSenderAccs({ ...senderAccsField, defOption: option })
  }
  const onChangeRecipient = option => {
    setRecipientsField({ ...senderField, defOption: option })
    setTimeout(() => {
      recipientAccsRequest()
    }, timeOut);
  }
  const onChangeRecipientAcc = option => {
    setRecipientsAcc({ ...senderAccsField, defOption: option })
  }

  const resetSomeFields = (e) => {
    e.preventDefault()
    setSenderField(fieldSettings)
    setSenderAccs(fieldSettings)
    setRecipientsField(fieldSettings)
    setRecipientsAcc(fieldSettings)
    setSum('')
    setComission('')
    setComment('')
  }

  const onSubmit = e => {
    e.preventDefault()
    const result = {
      groupField,
      senderField,
      senderAccsField,
      recipientField,
      recipientsAcc,
      playerSum: sum,
      comission,
      comment
    }
    console.log(result)
  };

  const { Option } = components
  const ExaOption = (props) => {
    return (<Option {...props}>
      {props.data.label}
      <br />
      {props.data.subtitle}
    </Option>
    )
  };


  return (
    <div className="ui container">
      <form onSubmit={onSubmit} onReset={resetSomeFields} className="ui form">

        <SelectField isRequired={groupField.isRequired} isEditable={groupField.isEditable}
          label="Группа" name="group"
          onChange={onChangeGroup} value={groupField.defOption} options={groupField.options}
          optionWrapper={ExaOption}
        />

        {/* USERS AND ACCOUNTS */}
        {(groupField.defOption) && <><div className="two fields">

          <SelectField label="Отправитель" name="sender"
            isRequired={senderField.isRequired} isEditable={senderField.isEditable}
            onChange={onChangeSender} options={senderField.options}
            value={senderField.defOption}
          />

          <SelectField label="Счёт отправителя" name="senderAccout"
            isRequired={senderAccsField.isRequired} isEditable={senderAccsField.isEditable}
            onChange={onChangeSenderAcc} options={senderAccsField.options}
            value={senderAccsField.defOption}
          />

        </div>

          <div className="two fields">

            <SelectField label="Получатель" name="recipientId"
              isRequired={recipientField.isRequired} isEditable={recipientField.isEditable}
              onChange={onChangeRecipient} options={recipientField.options}
              value={recipientField.defOption}
            />

            <SelectField label="Счёт отправителя" name="recipientAccout"
              isRequired={recipientsAcc.isRequired} isEditable={recipientsAcc.isEditable}
              onChange={onChangeRecipientAcc} options={recipientsAcc.options}
              value={recipientsAcc.defOption}
            />

          </div></>}


        <div className="two fields">

          <NumberField label="Сумма" name="payment"
            isRequired={true} isEditable={true}
            onChange={onSumChange} value={sum}
            min={1}
          />

          <NumberField label="Комиссия" name="payment"
            isRequired={false} isEditable={true}
            onChange={onComissionChange} value={comission}
            min={1} step={0.01}
          />
        </div>

        <div>
          <label htmlFor="comment">Комментарий</label>
          <textarea name="comment" value={comment} onChange={onCommentChange} />
        </div>

        <button type="reset" className="ui button red">Сбросить</button>
        <button type="submit" className="ui button teal">Подтвердить</button>
      </form>
    </div>
  )
}