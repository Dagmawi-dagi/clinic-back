const mongoose = require('mongoose');

const schema = {
  country: {
    type: String,
    required: true,
  },
  city_or_town: {
    type: String,
    required: true,
  },
  health_facility_name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  contact_phone_number:{
    type: Number,
    required: true,
  },
  type_of_health_facility:{
    type: String,
    required: true,
  },
}

const health_facility_information_schema = new mongoose.Schema(schema,{timestamps: true})

module.exports.model = mongoose.model('health_facility_information',health_facility_information_schema)
module.exports.schema = schema