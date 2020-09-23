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
export const selectDefaultState = {
  value: '',
  options: [],
  isEditable: true,
  isRequired: false
}


export const optionFormatter = options => {
  const formatedOptions = options && options.map((option) => {
    return ({ label: option.name, value: option.id, subtitle: option.subtitle })
  })
  return formatedOptions
}
export const optionSpreader = (options) => {
  const formatedOptions = options.length && options.map((option) => {
    return ({ label: option.name, value: option.type, ...option })
  })
  return formatedOptions
}
export const oneOptionFormatter = option => {
  if (option) return { label: option.name, value: option.id, subtitle: option.subtitle }
}