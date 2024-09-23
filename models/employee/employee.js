const mongoose = require('mongoose');

const schema = {
  first_name: {
    type: String,
    required: true
  },
  middle_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
  },
  phone_number:{
    type: Number,
    required: true,
  },
  skill:{
    type: Object,
    required: true
  },
  system_user:{
    type: Boolean,
    default: false,
  },
  has_share:{
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum:{
      values: ['active', 'inactive'],
      message: '{VALUE} is not supported'
    },
    default: 'inactive'
  },
  department: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department'
  }],
  employee_archive: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'employee_archive',
  },
}

const employee_Schema = new mongoose.Schema(schema,{timestamps:true})

module.exports.model = mongoose.model('employee',employee_Schema)
module.exports.schema = schema