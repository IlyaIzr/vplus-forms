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