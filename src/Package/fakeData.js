export const roomsFieldMeta = {
  options: [
    { name: 'redroom', id: 142 },
    { name: 'blueroom', id: 122 },
    { name: 'grayroom', id: 152 },
  ],
  isEditable: true,
  isRequired: true,
  value: [{ name: 'redroom', id: 142 }]
}

export const timeout = 500


export const tournamentsNumberMeta = {  
  value: '',
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

export const extraInfoMeta = {
  value: '',
  isEditable: true,
  isRequired: false
}

export const aBIMeta = {  
  value: '',
  isEditable: true,
  isRequired: true,
  min: 0
}