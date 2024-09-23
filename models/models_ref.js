//  db collections model reference
exports.models_ref = {
  // test
  test: require('./test'),
  // user
  user: require('./user'),
  // pateint
  pateint: require('./pateint/pateint'),
  pateint_archive: require('./pateint/pateint_archive'),
  emergency_contact: require('./pateint/emergency_contact'),
  // pateint Docs
  appointment: require('./pateint/appointment'),
  external_medical_doc: require('./pateint/external_medical_doc'),
  warning: require('./pateint/warning'),
  clinical_document: require('./pateint/clinical_document'),
  //service
  service_department: require('./service/service_department'),
  service: require('./service/service'),
  service_request: require('./service/service_request'),
  // Drug
  prescription: require('./drug/prescription'),
  medication : require('./drug/medication'),
  medication_group : require('./drug/medication_group'),
  // finance
  insurance: require('./finance/insurance'),
  invoice: require('./finance/invoice'),
  deposite: require('./finance/deposite'),
  bank: require('./finance/bank'),
  credit: require('./finance/credit'),
  custom_invoice: require('./finance/custom_invoice'),
  // employee
  employee: require('./employee/employee'),
  employee_archive: require('./employee/employee_archive'),
  contract: require('./employee/contract'),
  disciplinary_record: require('./employee/disciplinary_record'),
  rest_leave: require('./employee/rest_leave'),
  attendance: require('./employee/attendance'),
  payed_share: require('./employee/payed_share'),
  // config
  health_facility_config: require('./config/health_facility_config'),
  clinical_document_config: require('./config/clinical_document_config'),
  health_facility_information: require('./config/health_facility_information'),
  pateint_archive_access_controll: require('./config/pateint_archive_access_controll'),
  employee_archive_access_controll: require('./config/employee_archive_access_controll'),
  // for reference
  clinical_doc_category: require('./reference/clinical_doc_category'),
  diagnosis_list: require('./reference/diagnosis_list'),
  symptom: require('./reference/symptom'),
  // store
  store_item: require('./store/store_item'),
  store_request: require('./store/store_request'),
  // others
  queue: require('./queue'),
  department: require('./department'),
}