const sberAccountForm = {
  fields: [{  //Order of fields matters. First fields value will be in select list
    type: 'text',
    value: '',
    isEditable: true,
    isRequired: true,
    name: 'sberLogin',
    label: '@(Логин Сбербанк)'
  }, {
    type: 'text',
    value: '',
    isEditable: true,
    isRequired: true,
    name: 'sberName',
    label: '@(ФИО)'
  }, {
    type: 'number',
    value: '',
    isEditable: true,
    isRequired: true,
    name: 'sberAccount',
    label: '@(Номер счёта)'
  }, {
    type: 'select',
    options: ['usd'],
    isMulti: false,
    value: ['usd'],
    isEditable: true,
    isRequired: true,
    name: 'sberCurrency',
    label: '@(Валюта)'
  }],
  type: "sberbank",
  label: "@(Сбербанк)"
}
const customAccForm = {
  fields: [{
    type: 'text',
    value: '',
    isEditable: true,
    isRequired: true,
    name: 'customLogin',
    label: '@(Логин Системы)'
  }, {
    type: 'text',
    value: '',
    isEditable: true,
    isRequired: true,
    name: 'customName',
    label: '@(ФИО)'
  }, {
    type: 'text',
    value: '',
    isEditable: true,
    isRequired: true,
    name: 'customNick',
    label: '@(Никнейм)'
  }, {
    type: 'select',
    options: ['usd', 'eur'],
    isMulti: true,
    value: [],
    isEditable: true,
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
  accounts: [accounts[1]],
  isEditable: true,
  isRequired: true,
  // not required
  firstName: "Pyotr",
  lastName: "Bobroff",
  thirdName: "Pavlovitch"
}