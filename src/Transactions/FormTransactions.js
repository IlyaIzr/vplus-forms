import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// Fake data
const groupsData = [
  { name: 'Alpha', id: '1a' },
  { name: 'Beta', id: '2a' },
  { name: 'Gamma', id: '3a' }
]
const senderList = [
  { name: 'Piotr', id: '1414' },
  { name: 'Ivan', id: '14414' },
]
const senderAccounts = [
  '14125215215', '1521512515', '1521512512515'
]
const recipientsList = [
  { name: 'Anton', id: '1414242' },
  { name: 'Johny', id: '1441425252' },
]
const recipientAccounts = [
  '14125215215aa', '1521512515aa', '152151251251aa5'
]
const timeOut = 800
const checkMessage = 'Укажите группу'

export const FormTransactions = () => {
  const { register, watch, handleSubmit, reset, formState, setValue } = useForm()
  const { isDirty, isSubmitting, touched, submitCount, dirtyFields } = formState; //only last is used

  const [gropus, setGropus] = useState([]);
  const [sender, setSender] = useState([])
  const [senderAcc, setSenderAcc] = useState([])
  const [recipients, setRecipients] = useState([])
  const [recipientsAcc, setRecipientsAcc] = useState([])

  useEffect(() => {
    // kinda server call 
    setTimeout(() => {
      setGropus(groupsData)
    }, timeOut);
  }, []);


  const onSubmit = data => {
    alert(JSON.stringify(data))
  };

  const onChangeGroup = (e) => {
    // console.log(e.target.value);
    setTimeout(() => {
      setSender(senderList);
      setRecipients(recipientsList)
    }, timeOut);
  }
  //Sender chunk
  const onChangeSender = (e) => {
    // console.log(e.target.value);
    setTimeout(() => {
      setSenderAcc(senderAccounts)
    }, timeOut);
  }
  const onChangeSenderAcc = (e) => {
    console.log(e.target.value);
  }
  // Recipient chunk 
  const onChangeRecipient = e => {
    setTimeout(() => {
      setRecipientsAcc(recipientAccounts)
    }, timeOut);
  }
  const onChangeRecipientAcc = (e) => {
    console.log(e.target.value);
  }

  const resetSomeFields = (e) => {
    setValue('sender', '')
    setValue('senderAccout', '')
    setValue('recipient', '')
    setValue('recipientAccout', '')
    setValue('payment', '')
    setValue('comission', '')
    setValue('comment', '')
  }

  return (
    <div className="ui container">
      <form onSubmit={handleSubmit(onSubmit)} className="ui form">
        <div className="required field">
          <label htmlFor="group">Группа</label>
          <select name="group" ref={register} onChange={onChangeGroup} required className="ui dropdown">
            {!dirtyFields.group && <option value=''>{checkMessage}</option>}
            {gropus.length && gropus.map((group) => {
              return (
                <option value={group.name} key={group.id}>{group.name}</option>
              )
            })}
          </select>
        </div>

        <div className="two fields">

          <div className="required field">
            <label htmlFor="sender">Отправитель</label>
            <select name="sender" ref={register} onChange={onChangeSender} required className="ui dropdown" >
              {!dirtyFields.group && <option value=''>{checkMessage}</option>}
              {!dirtyFields.sender && <option value=''></option>}
              {sender.length && sender.map((aSender) => {
                return (
                  <option value={aSender.name} key={aSender.id}>{aSender.name}</option>
                )
              })}
            </select>
          </div>

          <div className="required field">
            <label htmlFor="senderAccout">Счёт отправителя</label>
            <select name="senderAccout" ref={register} onChange={onChangeSenderAcc} required className="ui dropdown">
              {senderAcc.length && senderAcc.map((aSenderAcc) => {
                return (
                  <option value={aSenderAcc} key={aSenderAcc}>{aSenderAcc}</option>
                )
              })}
            </select>
          </div>

        </div>

        <div className="two fields">
          <div className="required field">
            <label htmlFor="recipient">Получатель</label>
            <select name="recipient" ref={register} onChange={onChangeRecipient} required className="ui dropdown">
              {!dirtyFields.group && <option value=''>{checkMessage}</option>}
              {!dirtyFields.recipient && <option value=''></option>}
              {recipients.length && recipients.map((recepient) => {
                return (
                  <option value={recepient.name} key={recepient.id}>{recepient.name}</option>
                )
              })}
            </select>
          </div>

          <div className="required field">
            <label htmlFor="recipientAccout">Счёт получателя</label>
            <select name="recipientAccout" ref={register} onChange={onChangeRecipientAcc} required className="ui dropdown">
              {recipientsAcc.length && recipientsAcc.map((recipientAcc) => {
                return (
                  <option value={recipientAcc} key={recipientAcc}>{recipientAcc}</option>
                )
              })}
            </select>
          </div>
        </div>


        <div className="two fields">

          <div className="required field">
            <label htmlFor="payment">Сумма</label>
            <input name="payment" type="number" min="1" step="0.01" ref={register} required />
          </div>

          <div className="field">
            <label htmlFor="comission">Комиссия</label>
            <input name="comission" type="number" min="0" step="0.01" ref={register} />
          </div>
        </div>

        <div>
          <label htmlFor="comment">Комментарий</label>
          <textarea name="comment" ref={register} />
        </div>

        <button type="button" className="ui button red" onClick={resetSomeFields}>Сбросить</button>
        <button type="submit" className="ui button">Подтвердить</button>
      </form>
    </div>
  )
}