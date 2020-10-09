export const fundFieldMeta = 'Fund 1'
export const emailFieldMeta = 'testo@mail.ru'

export const skypeFieldMeta = {
  value: 'anton',
  isEditable: true,
  isRequired: true
}

//Response for sucesessful password change
const response = {
  status: 'OK',
  // error: 'error message' // if status false | null | undefined | 'ERR'
}

//Employee edit
const db_data_employees = [
  { label: 'Pyotr Velikiy', value: 'pyotr@1.com', email: 'pyotr@1.com'},
  { label: 'Dmitriy Gordon', value: 'gor1341', email: 'gordon@bald.com' }
]
export const employeesListResponse = {
  status: 'OK',
  employeeFieldMeta: {
    options: db_data_employees,
    value: null,
    isEditable: true,
    isRequired: true
  }
}
// Employee request response 
const employeeNameFieldMeta = {
  value: 'Dmitry',
  isEditable: false,
  isRequired: true
}
const employeeEMailFieldMeta = {
  value: 'gordon@bald.com',
  isEditable: true,
  isRequired: true
}
const db_data_funds = [
  { label: 'Fund 1', value: 'fun1id' },
  { label: 'Fund 2', value: 'fun2id' },
  { label: 'Fund 3', value: 'fun3id' }
]
const employeeFundsFieldMeta = {
  options: db_data_funds,
  value: [{ label: 'Fund 2', value: 'fun2id' }],
  isEditable: true,
  isRequired: true
}
const employeeIsAdminFieldMeta = {
  value: false,
  isEditable: true,
  isRequired: true
}
export const employeeResponse = {
  status: 'OK',
  employeeNameFieldMeta,
  employeeEMailFieldMeta,
  employeeFundsFieldMeta,
  employeeIsAdminFieldMeta
}
// Add employee
export const employeeCreateOptions = {
  status: 'OK',
  employeeNameFieldMeta,
  employeeEMailFieldMeta,
  employeeFundsFieldMeta,
  employeeIsAdminFieldMeta
}