const sberAccountForm = {
  fields: [{  //Order of fields matters. First fields value will be in select list
    type: 'text',
    value: '',
    isEditable: true,
    isRequired: true,
    name: 'login',  //names will be key names in response object
    label: '@(Логин Сбербанк)'
  }, {
    type: 'text',
    value: '',
    isEditable: true,
    isRequired: true,
    name: 'name',
    label: '@(ФИО)'
  }, {
    type: 'number',
    value: '',
    isEditable: true,
    isRequired: true,
    name: 'account',
    label: '@(Номер счёта)'
  }, {
    type: 'text',
    value: 'usd',
    isEditable: false,
    isRequired: true,
    name: 'currency',
    label: '@(Валюта)'
  }],
  type: "sberbank",
  label: "@(Сбербанк)"
}
const customAccForm = {
  fields: [{
    type: 'text', // 'text' or 'number' or 'select'
    value: '',
    isEditable: true,
    isRequired: true,
    name: 'login',
    label: '@(Логин Системы)'
  }, {
    type: 'text',
    value: '',
    isEditable: true,
    isRequired: true,
    name: 'name',
    label: '@(ФИО)'
  }, {
    type: 'text',
    value: '',
    isEditable: true,
    isRequired: true,
    name: 'nickname',
    label: '@(Никнейм)'
  }, {
    type: 'text',
    value: 'usd',
    isEditable: false,
    isRequired: true,
    name: 'customCurrency',
    label: '@(Валюта)'
  }],
  type: "custom",
  label: "@(Другой)"
}
const accounts = [
  {
    login: 'PyotrB', firstName: "Pyotr", lastName: "Bobroff", thirdName: "Pavlovitch",
    id: 'py22py', currency: "eur", type: "sberbank", label: "@(Сбербанк)"
  },
  {
    login: 'Sommer', firstName: "Anton", lastName: "Petroff", thirdName: "",
    nickname: 'sommer', currency: "usd", type: "custom", label: "@(Внутренний)"
  }
]
export const accountsMetaData = {
  options: [sberAccountForm, customAccForm],
  accounts: [accounts[0]],
  isEditable: true,
  isRequired: true,
  // not required
  firstName: "Pyotr",
  lastName: "Bobroff",
  thirdName: "Pavlovitch"
}