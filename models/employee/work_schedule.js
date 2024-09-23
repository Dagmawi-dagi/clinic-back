const mongoose = require('mongoose');

const schema = {
  begin : {
    type: Date,
    required: true
  },
  End  : {
    type: Date,
    required: true
  },
  shift : {
    type: String,
    enum: {
      values: ['morning', 'night'],
      message: '{VALUE} is not supported'
    },
    required: true
  }
}

const work_schedule_schema = new mongoose.Schema(schema,{timestamps:true})

module.exports.model = mongoose.model('work_schedule',work_schedule_schema)
module.exports.schema = schema