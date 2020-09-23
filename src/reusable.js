export const stringFieldDefaultState = {
  value: '',
  isEditable: true,
  isRequired: true
}
export const numberFieldDefaultState = {
  value: '',
  isEditable: true,
  isRequired: true,
  min: '',
  max: ''
}


export const optionFormatter = options => {
  const formatedOptions = options && options.map((option) => {
    return ({ label: option.name, value: option.id, subtitle: option.subtitle })
  })
  return formatedOptions
}
export const oneOptionFormatter = option => {
  if (option) return { label: option.name, value: option.id, subtitle: option.subtitle }
}