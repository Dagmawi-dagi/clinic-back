const mongoose = require('mongoose');

const schema = {
  isthere_pharmacy : {
    type: Boolean,
    default: false,
  },
  // add other configs
}
const health_facility_config_Schema = new mongoose.Schema(schema,{timestamps:true})

module.exports.model = mongoose.model('health_facility_config', health_facility_config_Schema)
module.exports.schema = schema