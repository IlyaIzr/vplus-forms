export const groupFieldMeta = {
  value: 'Test group 1', //or '' , or false?
  isEditable: true,
  isRequired: true
}

const disciplines = [
  { name: 'discipline1', id: 'discipline1ID' },
  { name: 'discipline2', id: 'discipline2ID' },
  { name: 'discipline3', id: 'discipline3ID' }
]
export const disciplineFieldMeta = {
  options: disciplines,
  defOption: { name: 'discipline2', id: 'discipline2ID' }, //or false
  isEditable: true,
  isRequired: true
}

export const timeout = 500

export const investorsOptions = [
  { name: 'Sergay', id: 'userId1a2rs' },
  { name: 'Pyotr', id: 'userId12412' },
  { name: 'Stepan', id: 'userId1241fa' },
  { name: 'Anton', id: 'userId124g3s' }
]
const currentOption = { name: 'Stepan', id: 'userId1241fa', share: 100 }
const investors = [
  { name: 'Pyotr', id: 'userId12412', share: 40 },
  { name: 'Anton', id: 'userId124g3s', share: 60 }]

const investors1 = [
  { name: 'Pyotr', id: 'userId12412', share: 100 }]

export const investorsMeta = {
  options: investorsOptions,  // list of possible investors
  investors: [], //list of included investors
  isEditable: true,
  isRequired: true
}


const paymentFormHourRate = {
  fields: [{  //Order is crucual. First fields value will be in select list
    type: 'text',
    value: 'По часам',
    isEditable: false,
    isRequired: true,
    name: 'payMethodName',
    label: 'Способ оплаты'
  }, {
    type: 'nubmer',
    value: '20',
    isEditable: true,
    isRequired: true,
    name: 'payValue',
    min: 0
  }],
  name: 'По часам',
  payType: 'byHours'
}
const paymentFormManual = {
  fields: [{
    type: 'text',
    value: '',
    isEditable: true,
    isRequired: true,
    label: 'Способ оплаты',
    name: 'payMethodName'
  }, {
    type: 'string',
    value: '',
    isEditable: true,
    isRequired: false,
    name: 'payValue',
    label: 'Количество'
  }],
  name: 'Вручную',
  payType: 'custom'
}
const managers = [
  { name: 'Pyotr', id: 'userId12412', payType: 'byHours', payMethodName: 'По часам', payValue: '20' },
  { name: 'Alexy', id: 'userIAff12', payType: 'custom', payMethodName: 'Вручную', payValue: '20' }
]
export const managersMeta = {
  options: investorsOptions,
  payOptions: [paymentFormHourRate, paymentFormManual],
  managers: [],
  isEditable: true,
  isRequired: true
}

export const tournamentsNumberMeta = {  
  value: 5000,
  isEditable: true,
  isRequired: true,
  min: 0
}
export const playerSumNumberMeta = {  
  value: 5000,
  isEditable: true,
  isRequired: true,
  min: 0
}
export const playerBuyInsMeta = {  
  value: 70,
  isEditable: true,
  isRequired: true,
  min: 0
}

export const playerRiskMeta = {  
  value: 40,
  isEditable: true,
  isRequired: true,
  min: 0,
  max: 100
}
export const fundRiskMeta = {  
  value: 60,
  isEditable: true,
  isRequired: true,
  min: 0,
  max: 100
}