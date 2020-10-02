import React, { useState, useEffect } from 'react'
import { components } from 'react-select';
import { SelectField } from '../components/SelectField';
import { NumberField } from '../components/NumberField'
//Other
let WS
const fieldSettings = {
  options: [],
  value: false,
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
  const groupRequest = async (msg) => {
    const data = await WS.send('transactions', 'groupData', {})
    const formatedOptions = optionFormatter(data.options)
    const formatedvalue = oneOptionFormatter(data.value)
    const result = { ...data, options: formatedOptions, value: formatedvalue }
    setGroupField(result)
    return result
  }

  const senderRequest = async (msg = {}) => {
    console.log('sender req')
    const data = await WS.send('transactions', 'usersData', msg)
    if (data) {
      const options = optionFormatter(data.options)
      const value = oneOptionFormatter(data.value)
      const result = { ...data, options, value }
      setSenderField(result)
      if (value && value.value) { senderAccsRequest() }
      return result
    }
  }
  const senderAccsRequest = async (msg = {}) => {
    const data = await WS.send('transactions', 'accountsData', msg)
    if (data) {
      const options = optionFormatter(data.options)
      const value = oneOptionFormatter(data.value)
      setSenderAccs({ ...data, options, value })
    }
  }
  const recipientRequest = async (msg = {}) => {
    const data = await WS.send('transactions', 'usersData', msg)
    if (data) {
      const options = optionFormatter(data.options)
      const value = oneOptionFormatter(data.value)
      const result = { ...data, options, value }
      setRecipientsField(result)
      if (value && value.value) { recipientAccsRequest() }
      return result
    }
  }
  const recipientAccsRequest = async (msg = {}) => {
    const data = await WS.send('transactions', 'accountsData', msg)
    if (data) {
      const options = optionFormatter(data.options)
      const value = oneOptionFormatter(data.value)
      setRecipientsAcc({ ...data, options, value })
    }
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
      console.log(groupField)
      if (groupField.value && groupField.value.value) {
        const senderField = await senderRequest()
        if (senderField.value && senderField.value.value) {
          await senderAccsRequest()
        }
        const recipField = await recipientRequest()
        if (recipField.value && recipField.value.value) {
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
    setGroupField({ ...groupField, value: option })
    await senderRequest(groupField)
    await recipientRequest(groupField) //TODO
  }

  const onChangeSender = async option => {
    setSenderField({ ...senderField, value: option })
    await senderAccsRequest(senderField)
  }
  const onChangeSenderAcc = option => {
    setSenderAccs({ ...senderAccsField, value: option })
  }
  const onChangeRecipient = async option => {
    setRecipientsField({ ...recipientField, value: option })
    await recipientAccsRequest(recipientField)
  }
  const onChangeRecipientAcc = option => {
    setRecipientsAcc({ ...senderAccsField, value: option })
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
    <div>
      <form onSubmit={onSubmit} onReset={resetSomeFields} className="ui form">

        <SelectField isRequired={groupField.isRequired} isEditable={groupField.isEditable}
          label="@(Группа)" name="group"
          onChange={onChangeGroup} value={groupField.value} options={groupField.options}
          optionWrapper={ExaOption}
        />

        {/* USERS AND ACCOUNTS */}
        {/* TODO enable fields, but make disable by def */}
        {(groupField.value) && <><div className="two fields">

          <SelectField label="@(Отправитель)" name="sender"
            isRequired={senderField.isRequired} isEditable={senderField.isEditable}
            onChange={onChangeSender} options={senderField.options}
            value={senderField.value}
          />

          <SelectField label="@(Счёт отправителя)" name="senderAccout"
            isRequired={senderAccsField.isRequired} isEditable={senderAccsField.isEditable}
            onChange={onChangeSenderAcc} options={senderAccsField.options}
            value={senderAccsField.value}
          />

        </div>

          <div className="two fields">

            <SelectField label="@(Получатель)" name="recipientId"
              isRequired={recipientField.isRequired} isEditable={recipientField.isEditable}
              onChange={onChangeRecipient} options={recipientField.options}
              value={recipientField.value}
            />

            <SelectField label="@(Счёт отправителя)" name="recipientAccout"
              isRequired={recipientsAcc.isRequired} isEditable={recipientsAcc.isEditable}
              onChange={onChangeRecipientAcc} options={recipientsAcc.options}
              value={recipientsAcc.value}
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