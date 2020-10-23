import React, { useState, useEffect } from 'react'
import { components } from 'react-select';
import { SelectField } from '../components/SelectField';
import { NumberField } from '../components/NumberField'
import { Submit } from '../components/Submit';
import { optionFormatter, oneOptionFormatter, oneOptionDBFormat } from '../reusable'
// import { optionFormatter } from '../reusable'
//Other
let WS
let transactionsFormPayload = {}
const fieldSettings = {
  options: [],
  value: false,
  isEditable: true,
  isRequired: true
}



export const FormTransactions = () => {
  const formAPI = {
    transactionsForm: {
      callForm: (payload = {}) => {
        transactionsFormPayload = { ...payload }
        fetcher(transactionsFormPayload)
      }
    }
  }
  window.formAPI = { ...window.formAPI, ...formAPI }

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
  //Alerts
  const [errorMsg, setErrorMsg] = useState(null)
  const [alertMsg, setAlertMsg] = useState(null)

  // Requests with effects
  const groupRequest = async (msg = {}) => {
    const data = await WS.send('transactions', 'groupData', msg)
    if (data) {
      setErrorMsg(false)
      const formatedOptions = optionFormatter(data.options)
      const formatedvalue = oneOptionFormatter(data.value)
      const result = { ...data, options: formatedOptions, value: formatedvalue }
      setGroupField(result)
      return result
    } else setErrorMsg(true)
  }

  const senderRequest = async (msg = {}) => {
    const data = await WS.send('transactions', 'usersDataSenders', msg)
    if (data) {
      setErrorMsg(false)
      const options = optionFormatter(data.options)
      const value = oneOptionFormatter(data.value)
      const result = { ...data, options, value }
      setSenderField(result)
      if (value && value.value) { senderAccsRequest() }
      return result
    } else setErrorMsg(true)
  }
  const senderAccsRequest = async (msg = {}) => {
    const data = await WS.send('transactions', 'accountsDataSender', msg)
    if (data) {
      setErrorMsg(false)
      const options = optionFormatter(data.options)
      const value = oneOptionFormatter(data.value)
      setSenderAccs({ ...data, options, value })
    } else setErrorMsg(true)
  }
  const recipientRequest = async (msg = {}) => {
    const data = await WS.send('transactions', 'usersDataRecipients', msg)
    if (data) {
      setErrorMsg(false)
      const options = optionFormatter(data.options)
      const value = oneOptionFormatter(data.value)
      const result = { ...data, options, value }
      setRecipientsField(result)
      if (value && value.value) { recipientAccsRequest() }
      return result
    } else setErrorMsg(true)
  }
  const recipientAccsRequest = async (msg = {}) => {
    const data = await WS.send('transactions', 'accountsDataRecipients', msg)
    if (data) {
      setErrorMsg(false)
      const options = optionFormatter(data.options)
      const value = oneOptionFormatter(data.value)
      setRecipientsAcc({ ...data, options, value })
    } else setErrorMsg(true)
  }
  const postFormRequest = async data => {
    const response = await WS.send('transactions', 'formSubmit', data)
    if (response.status === 'OK') {
      setErrorMsg(false)
      response.message ? setAlertMsg(response.message) : setAlertMsg(true)
    } else setErrorMsg(true)
  }
  
  const fetcher = async (payload = {}) => {
    console.log('transactions called with payload: ')
    console.log(payload)
    WS = new WebsocketPromiseLiteClient({
      url: 'ws://localhost:5555'
    })
    await WS.connectionEstablished()
    const groupField = await groupRequest(payload)
    if (groupField.value && groupField.value.value) {
      const senderField = await senderRequest(groupField.value)
      if (senderField.value && senderField.value.value) {
        await senderAccsRequest(senderField.value)
      }
      const recipField = await recipientRequest(groupField.value)
      if (recipField.value && recipField.value.value) {
        await recipientAccsRequest(recipField.value)
      }
    }
  }

  useEffect(() => {
    fetcher(transactionsFormPayload)
  }, []);

  // useEffect(() => {
  //   const formAPI = {
  //     ...window.formAPI,
  //     reset: () => resetSomeFields(),
  //     setGroupValue: (value) => {
  //       setGroupField({ ...groupField, value })
  //     }
  //   }
  //   window.formAPI = formAPI
  // }, [
  //   groupField,
  //   senderField,
  //   senderAccsField,
  //   recipientField,
  //   recipientsAcc,
  //   sum,
  //   comission,
  //   comment])


  // Change listeners
  const onChangeGroup = async (option) => {
    const newState = { ...groupField, value: option }
    setGroupField(newState)
    const formated = oneOptionDBFormat(option)
    await senderRequest(formated)
    await recipientRequest(formated) //TODO
  }

  const onChangeSender = async option => {
    const newState = { ...senderField, value: option }
    const formated = oneOptionDBFormat(option)
    setSenderField(newState)
    await senderAccsRequest(formated)
  }
  const onChangeSenderAcc = option => {
    setSenderAccs({ ...senderAccsField, value: option })
  }
  const onChangeRecipient = async option => {
    const newState = { ...recipientField, value: option }
    const formated = oneOptionDBFormat(option)
    setRecipientsField(newState)
    await recipientAccsRequest(formated)
  }
  const onChangeRecipientAcc = option => {
    setRecipientsAcc({ ...senderAccsField, value: option })
  }

  const resetSomeFields = (e) => {
    e && e.preventDefault()
    setSenderField({ ...senderField, value: '' })
    setSenderAccs({ ...senderAccsField, value: '' })
    setRecipientsField({ ...recipientField, value: '' })
    setRecipientsAcc({ ...recipientsAcc, value: '' })
    setSum('')
    setComission('')
    setComment('')
  }

  const onSubmit = e => {
    e && e.preventDefault()
    const result = {
      groupField: {...groupField, value: oneOptionDBFormat(groupField.value)},
      senderField : {...senderField, value: oneOptionDBFormat(senderField.value)},
      senderAccsField : {...senderAccsField, value: oneOptionDBFormat(senderAccsField.value)},
      recipientField : {...recipientField, value: oneOptionDBFormat(recipientField.value)},
      recipientsAcc : {...recipientsAcc, value: oneOptionDBFormat(recipientsAcc.value)},
      playerSum: sum,
      comission,
      comment,
      payload: transactionsFormPayload
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
      <form onSubmit={onSubmit} onReset={resetSomeFields} className="ui form" id="transactionsForm">

        {//Error message
          errorMsg && <div className="ui alert message">
            <h5 className="text red">@(Ошибка соединения с сервером)</h5>
          </div>}

        <SelectField isRequired={groupField.isRequired} isEditable={groupField.isEditable}
          label="@(Группа)" name="group"
          onChange={onChangeGroup} value={groupField.value} options={groupField.options}
          optionWrapper={ExaOption}
        />

        {/* USERS AND ACCOUNTS */}
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

            <SelectField label="@(Счёт получателя)" name="recipientAccout"
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
            min={0} 
          />
        </div>

        <div>
          <label htmlFor="comment">@(Комментарий)</label>
          <textarea name="comment" value={comment} onChange={onCommentChange} />
        </div>

        <button type="reset" className="ui button red">@(Сбросить)</button>
        <Submit state={alertMsg} setState={setAlertMsg} timeout={2000}/>
      </form>
    </div>
  )
}