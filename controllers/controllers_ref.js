// controllers references to be usersed form any where

exports.controllers_ref = {
  test : require('./test'),
  user : require('./user'),
  //pateint
  pateint : require('./pateint/pateint'),
  emergency_contact : require('./pateint/emergency_contact'),
  // employee
  employee : require('./employee/employee'),
  //finance
  credit: require('./finance/credit'),
  custom_invoice: require('./finance/custom_invoice'),
  insurance: require('./finance/insurance'),
}

