export const formTitle = 'Форма мошенников'
export const arbitrageFieldMeta = {
  value: 'Арбитраж из сервера',
  isEditable: true,
  isRequired: true
}

export const skypeFieldMeta = {
  value: [{ label: "skype1", value: "skype1" }, { label: "skype33", value: "skype2" }],
  isEditable: true,
  isRequired: true
}

export const credentialsFieldMeta = {
  value: [{ firstName: 'Anton', secondName: 'Pavlovitch', thirdName: 'Checkov', isEditable: false }],
  isEditable: true, // can or can not add fields
  canDeleteFields: false,
  isRequired: {
    firstName: true,
    secondName: true,
    thirdName: false
  }
}

const db_data_sites = [
  { label: "Pokersite1", value: "pokas2314" },
  { label: "Pokersite2", value: "pokafas2314" },
  { label: "Pokersite5", value: "p2fas2314" }
]
export const nicknamesFieldMeta = {
  options: db_data_sites,
  value: [
    {
      nickname: 'Anton',
      sites: [
        { label: "PokerNow", value: "po5514" },
        { label: "Pokersite1", value: "pokas2314" }
      ]
    }
  ],
  isEditable: true, // can or can not add fields
  canDeleteFields: false,
  isRequired: true
}

export const gipsyTeamFieldMeta = {
  value: ['gipsyTeam1', 'gipsyTeam2'],
  isEditable: true,
  isRequired: true
}

export const pokerStrategyFieldMeta = {
  value: [],
  isEditable: true,
  isRequired: true
}


const db_data_disciplines = [
  { label: "Mixed", value: "mixed" },
  { label: "Chicago", value: "chicago1" },
  { label: "Chinese", value: "trump" }
]
export const disciplineFieldMeta = {
  value: [],
  options: db_data_disciplines,
  isEditable: true,
  isRequired: true
}

export const descriptionFieldMeta = {
  value: [
    { description: 'papa rpaa pa', claimAmount: '300' }
  ],
  isEditable: true,
  isRequired: true
}