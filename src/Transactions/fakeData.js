const groupsData = [
  { name: 'Alpha', id: '114aZ' },
  { name: 'Beta', id: '2aaaZ' },
  { name: 'Gamma', id: '31414aZ' }
]
export const groupsFieldMetaData = {
  options: groupsData,
  defOption: { name: 'Beta', id: '2aaaZ' }, //or false
  isEditable: true,
  isRequired: true
}


const senderList = [
  { name: 'Piotr', id: '1414S' },
  { name: 'Ivan', id: '14414S' },
  { name: 'Alex', id: '14414swS' },
]
export const senderListMeta = {
  options: senderList,
  defOption: { name: 'Alex', id: '14414swS' }, //option objector false
  isEditable: true,
  isRequired: true
}


const senderAccounts = [
  {id: 'pe23pe23', name: 'Sber23'},
  {id: 'pe23pe123423', name: 'Alpha23'}
]
export const senderAccsMeta = {
  options: senderAccounts,
  defOption: false,
  isEditable: true,
  isRequired: true
}


const recipientsList = [
  { name: 'Anton', id: '1414242' },
  { name: 'Johny', id: '1441ag5252' },
  { name: 'Donald', id: '144ss252' },
]
export const recipientListMeta = {
  options: recipientsList,
  defOption: { name: 'Donald', id: '144ss252' },
  isEditable: false,
  isRequired: true
}


export const recipientAccounts = [
  '14125215215aa', '1521512515aa', '152151251251aa5'
]

export const timeOut = 800