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