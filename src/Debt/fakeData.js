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

export const googleAccFieldMeta = {
  value: [],
  options: [],
  isEditable: true,
  isRequired: false
}

export const mailAccFieldMeta = {
  value: [],
  options: [],
  isEditable: true,
  isRequired: false
}

export const phoneFieldMeta = {
  value: [],
  options: [],
  isEditable: true,
  isRequired: false
}

export const vkFieldMeta = {
  value: [],
  isEditable: true,
  isRequired: false
}
export const fbFieldMeta = {
  value: [],
  isEditable: true,
  isRequired: false
}
export const blogFieldMeta = {
  value: [],
  isEditable: true,
  isRequired: false
}
export const instaFieldMeta = {
  value: [],
  isEditable: true,
  isRequired: false
}

export const forum2plus2FieldMeta = {
  value: [''],
  isEditable: true,
  isRequired: false
}

export const adressFieldMeta = {
  value: [],
  isEditable: true,
  isRequired: false
}

export const netellerFieldMeta = {
  value: [],
  options: [],
  isEditable: true,
  isRequired: false
}

export const skrillFieldMeta = {
  value: [],
  options: [],
  isEditable: true,
  isRequired: false
}

export const ecoPayzFieldMeta = {
  value: [],
  options: [],
  isEditable: true,
  isRequired: false
}

export const webMoneyFieldMeta = {
  value: [
    {
      WMID: 'testo123ud', WMWallets: [
        { label: '145151616161', value: '145151616161' },  // если нужно, могу принимать просто массив айди, но мне нужно это прописать
        { label: '145151616122', value: '145151616122' }
      ]
    }
  ],
  options: [],
  isEditable: true,
  isRequired: false
}