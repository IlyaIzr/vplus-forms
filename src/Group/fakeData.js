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

const investorsOptions = [
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
  currentOption: currentOption,
  investors: investors1, //list of included investors
  isEditable: true,
  isRequired: true
}