import React, { useState, useEffect } from 'react'
import { components } from 'react-select';
import { SelectField } from '../components/SelectField';
import { NumberField } from '../components/NumberField'
//Other
let WS
const fieldSettings = {
  options: [],
  defOption: false,
  isEditable: true,
  isRequired: true
}

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
  const groupRequest = async (id) => {
    const data = await WS.send('transactions', 'groupData', {})
    const formatedOptions = optionFormatter(data.options)
    const formatedDefOption = oneOptionFormatter(data.defOption)
    const result = { ...data, options: formatedOptions, defOption: formatedDefOption }
    setGroupField(result)
    return result
  }

  const senderRequest = async (id) => {
    const data = await WS.send('transactions', 'usersData', {})
    console.log(data)
    const options = optionFormatter(data.options)
    const defOption = oneOptionFormatter(data.defOption)
    const result = { ...data, options, defOption }
    setSenderField(result)
    if (defOption && defOption.value) { senderAccsRequest() }
    return result
  }
  const senderAccsRequest = async (id) => {
    const data = await WS.send('transactions', 'accountsData', {})
    const options = optionFormatter(data.options)
    const defOption = oneOptionFormatter(data.defOption)
    setSenderAccs({ ...data, options, defOption })
  }
  const recipientRequest = async (id) => {
    const data = await WS.send('transactions', 'usersData', {})
    const options = optionFormatter(data.options)
    const defOption = oneOptionFormatter(data.defOption)
    const result = { ...data, options, defOption }
    setRecipientsField(result)
    if (defOption && defOption.value) { recipientAccsRequest() }
    return result
  }
  const recipientAccsRequest = async (id) => {
    const data = await WS.send('transactions', 'accountsData', {})
    const options = optionFormatter(data.options)
    const defOption = oneOptionFormatter(data.defOption)
    setRecipientsAcc({ ...data, options, defOption })
  }
  const postFormRequest = async data => {
    const response = await WS.send('transactions', 'accountsData', data)
  }

  useEffect(() => {
    async function fetcher() {
      WS = new WebsocketPromiseLiteClient({
        url: 'ws://localhost:5555'
      })
      await WS.connectionEstablished()
      const groupField = await groupRequest()
      if (groupField.defOption && groupField.defOption.id) {
        const senderField = await senderRequest()
        if (senderField.defOption && senderField.defOption.id) {
          await senderAccsRequest()
        }
        const recipField = await recipientRequest()
        if (recipField.defOption && recipField.defOption.id) {
          await recipientAccsRequest()
        }
      }
      // WS.close()
    }
    fetcher()
  }, []);

  // const testo = async () => {
  // } 

  // Change listeners
  const onChangeGroup = async (option) => {
    setGroupField({ ...groupField, defOption: option })
    await senderRequest(option.value)
    await recipientRequest(option.value) //TODO
  }

  const onChangeSender = async option => {
    setSenderField({ ...senderField, defOption: option })
    await senderAccsRequest()
  }
  const onChangeSenderAcc = async option => {
    await setSenderAccs({ ...senderAccsField, defOption: option })
  }
  const onChangeRecipient = async option => {
    setRecipientsField({ ...senderField, defOption: option })
    await recipientAccsRequest()
  }
  const onChangeRecipientAcc = async option => {
    await setRecipientsAcc({ ...senderAccsField, defOption: option })
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
    postFormRequest(result)
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
          label="@(Группа)" name="group"
          onChange={onChangeGroup} value={groupField.defOption} options={groupField.options}
          optionWrapper={ExaOption}
        />

        {/* USERS AND ACCOUNTS */}
        {(groupField.defOption) && <><div className="two fields">

          <SelectField label="@(Отправитель)" name="sender"
            isRequired={senderField.isRequired} isEditable={senderField.isEditable}
            onChange={onChangeSender} options={senderField.options}
            value={senderField.defOption}
          />

          <SelectField label="@(Счёт отправителя)" name="senderAccout"
            isRequired={senderAccsField.isRequired} isEditable={senderAccsField.isEditable}
            onChange={onChangeSenderAcc} options={senderAccsField.options}
            value={senderAccsField.defOption}
          />

        </div>

          <div className="two fields">

            <SelectField label="@(Получатель)" name="recipientId"
              isRequired={recipientField.isRequired} isEditable={recipientField.isEditable}
              onChange={onChangeRecipient} options={recipientField.options}
              value={recipientField.defOption}
            />

            <SelectField label="@(Счёт отправителя)" name="recipientAccout"
              isRequired={recipientsAcc.isRequired} isEditable={recipientsAcc.isEditable}
              onChange={onChangeRecipientAcc} options={recipientsAcc.options}
              value={recipientsAcc.defOption}
            />

          </div></>}


        <div className="two fields">

          <NumberField label="@(Сумма)" name="payment"
            isRequired={true} isEditable={true}
            onChange={onSumChange} value={sum}
            min={1}
          />

          <NumberField label="@(Комиссия)" name="comission"
            isRequired={false} isEditable={true}
            onChange={onComissionChange} value={comission}
            min={1} step={0.01}
          />
        </div>

        <div>
          <label htmlFor="comment">@(Комментарий)</label>
          <textarea name="comment" value={comment} onChange={onCommentChange} />
        </div>

        <button type="reset" className="ui button red">@(Сбросить)</button>
        <button type="submit" className="ui button teal">@(Подтвердить)</button>
      </form>
    </div>
  )
}