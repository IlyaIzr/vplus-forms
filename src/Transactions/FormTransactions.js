import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
//Fakes
import {
  groupsFieldMetaData, senderAccsMeta, recipientListMeta, senderListMeta,
  recipientsList, recipientAccounts, timeOut
} from './fakeData'

const checkMessage = 'Укажите группу'

const onSubmit = data => {
  console.log(data)
};

export const FormTransactions = () => {
  const { register, watch, handleSubmit, reset, formState, setValue, getValues } = useForm()
  const { isDirty, isSubmitting, touched, submitCount, dirtyFields } = formState //only last is used

  const [groupField, setGroupField] = useState({
    options: [],
    defOption: false,
    isEditable: true,
    isRequired: true
  })

  const [senderField, setSenderField] = useState({
    options: [],
    defOption: false,
    isEditable: false,
    isRequired: true
  })
  const [senderAccs, setSenderAccs] = useState({
    options: [],
    defOption: false,
    isEditable: false,
    isRequired: true
  })
  const [recipientField, setRecipients] = useState({
    options: [],
    defOption: false,
    isEditable: false,
    isRequired: true
  })
  const [recipientsAcc, setRecipientsAcc] = useState({
    options: [],
    defOption: false,
    isEditable: false,
    isRequired: true
  })

  // Requests
  const senderAccsRequest = (id) => setSenderAccs(senderAccsMeta)
  const recipientAccsRequest = (id) => setRecipientsAcc(senderAccsMeta)

  //Group
  useEffect(() => {
    setTimeout(() => {
      setGroupField(groupsFieldMetaData)
      if (groupsFieldMetaData.defOption) {
        setValue('group', groupsFieldMetaData.defOption.id)
        setTimeout(() => {  //call with default option
          setSenderField(senderListMeta)
          if (senderListMeta.defOption) {
            setValue('sender', senderListMeta.defOption.id, { shouldDirty: true })
            senderAccsRequest(senderListMeta.defOption.id)
          }
          setRecipients(recipientListMeta)
          if (recipientListMeta.defOption) {
            console.log(recipientListMeta.defOption.id)
            setValue('recipientId', recipientListMeta.defOption.id, { shouldDirty: true })
            recipientAccsRequest(recipientListMeta.defOption.id)
          }
        }, timeOut)
      }
    }, timeOut)
  }, []);

  const onChangeGroup = (e) => {
    setTimeout(() => {
      setTimeout(() => {  //call with selected option e.target.value
        setSenderField(senderListMeta)
        setRecipients(recipientListMeta)
      }, timeOut);
    }, timeOut);
  }

  //Sender chunk
  const onChangeSender = (e) => {
    // console.log(e.target.value);
    setTimeout(() => {
      senderAccsRequest()
    }, timeOut);
  }
  const onChangeSenderAcc = (e) => {
    console.log(e.target.value);
  }
  // Recipient chunk 
  const onChangeRecipient = e => {
    setTimeout(() => {
      recipientAccsRequest()
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
        <div className={groupField.isRequired ? "required field" : "field"}>
          <label htmlFor="group">Группа</label>
          <select name="group" ref={register} onChange={onChangeGroup} className="ui dropdown"
            required={groupField.isRequired} disabled={!groupField.isEditable}
          >
            {!dirtyFields.group && <option value=''>{checkMessage}</option>}
            {groupField.options.length && groupField.options.map((group) => {
              return (
                <option value={group.id} key={group.id}>{group.name}</option>
              )
            })}
          </select>
        </div>

        {/* USERS AND ACCOUNTS */}
        {(getValues('group') || groupsFieldMetaData.defOption.id) && <><div className="two fields">

          <div className={senderField.isRequired ? "required field" : "field"}>
            <label htmlFor="sender">Отправитель</label>
            <select name="sender" ref={register} onChange={onChangeSender} className="ui dropdown"
              required={senderField.isRequired} disabled={!senderField.isEditable}
            >
              {!dirtyFields.sender && <option value=''></option>}
              {senderField.options.length && senderField.options.map((sender) => {
                return (
                  <option value={sender.id} key={sender.id}>{sender.name}</option>
                )
              })}
            </select>
          </div>

          <div className={senderAccs.isRequired ? "required field" : "field"}>
            <label htmlFor="senderAccout">Счёт отправителя</label>
            <select name="senderAccout" ref={register} onChange={onChangeSenderAcc} className="ui dropdown"
              required={senderAccs.isRequired} disabled={!senderAccs.isEditable}
            >
              {!dirtyFields.senderAccout && <option value=''></option>}
              {senderAccs.options.length && senderAccs.options.map((sender) => {
                return (
                  <option value={sender.id} key={sender.id}>{sender.name}</option>
                )
              })}
            </select>
          </div>

        </div>

          <div className="two fields">

            <div className={recipientField.isRequired ? "required field" : "field"}>
              <label htmlFor="recipientId">Получатель</label>
              <select name="recipientId" ref={register} onChange={onChangeRecipient} className="ui dropdown"
                required={recipientField.isRequired} disabled={!recipientField.isEditable}
              >
                {!dirtyFields.recipientId && <option value=''></option>}
                {recipientField.options.length && recipientField.options.map((recepient) => {
                  return (
                    <option value={recepient.id} key={recepient.id}>{recepient.name}</option>
                  )
                })}
              </select>
            </div>

            <div className={recipientsAcc.isRequired ? "required field" : "field"}>
              <label htmlFor="recipientAccout">Счёт отправителя</label>
              <select name="recipientAccout" ref={register} onChange={onChangeRecipientAcc} className="ui dropdown"
                required={recipientsAcc.isRequired} disabled={!recipientsAcc.isEditable}
              >
                {!dirtyFields.recipientAccout && <option value=''></option>}
                {recipientsAcc.options.length && recipientsAcc.options.map((recipientAcc) => {
                  return (
                    <option value={recipientAcc.id} key={recipientAcc.id}>{recipientAcc.name}</option>
                  )
                })}
              </select>
            </div>
            
          </div></>}


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