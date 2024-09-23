const mongoose = require('mongoose');

const access_for_schema = new mongoose.Schema({
  // models aceess controll
  model: String,
  model_action: {
    type: String,
    enum: {
      values: ['c', 'r','u','d'],
      message: '{VALUE} is not supported'
    },
  }, 
  // drived acess controll
  drived: String,
  drived_action: {
    type: String,
    enum: {
      values: ['c', 'r','u','d'],
      message: '{VALUE} is not supported'
    },
  },
})


const schema = {
  department: {
    type: String,
    enum: {
      values: ['admin', 'hr','employee'],
      message: '{VALUE} is not supported'
    },
  },
  access_for:[access_for_schema]
}

const employee_archive_access_controll = new mongoose.Schema(schema,{ timestamps: true, })

module.exports.model = mongoose.model('employee_archive_access_controll',employee_archive_access_controll)
module.exports.schema = schema
