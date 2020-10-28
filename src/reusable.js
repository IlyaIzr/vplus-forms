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
export const selectNoOptDefaultState = {
  value: '',
  isEditable: true,
  isRequired: false
}
export const multifieldsDefaultState = {
  value: [],
  isEditable: true,
  isRequired: false
}


export const optionFormatter = options => {
  const formatedOptions = options.length ? options.map((option) => {
    if (option.subtitle) return ({ label: option.name, value: option.id, subtitle: option.subtitle })
    if (option) return { label: option.name, value: option.id }
  }) : [];
  return formatedOptions
}
export const optionEmailFormatter = options => {
  const formatedOptions = options.length ? options.map((option) => {
    if (option.email) return ({ label: option.name, value: option.id, email: option.email })
    if (option) return { label: option.name, value: option.id }
  }) : [];
  return formatedOptions
}
export const optionsDBSpreaderFormatter = options => {
  const formatedOptions = options.length ? options.map((option) => {
    if (option.email) return ({ ...option, name: option.label, id: option.value })
    if (option) return { ...option, name: option.label, id: option.value }
  }) : [];
  return formatedOptions
}
export const oneOptionEmailDBFormat = option => {
  if (option && option.email) return {...option, name: option.label, id: option.value, email: option.email }
  if (option) return { name: option.label, id: option.value }
  else return null
}
export const optionSpreader = (options) => {
  const formatedOptions = options.length ? options.map((option) => {
    return ({ label: option.name, value: option.type, ...option })
  }) : [];
  return formatedOptions
}
export const oneOptionFormatter = option => {
  if (option && option.subtitle) return { label: option.name, value: option.id, subtitle: option.subtitle }
  if (option) return { label: option.name, value: option.id }
  else return null
}

export const oneOptionDBFormat = option => {
  if (option && option.subtitle) return { name: option.label, id: option.value, subtitle: option.subtitle }
  if (option) return { name: option.label, id: option.value }
  else return null
}