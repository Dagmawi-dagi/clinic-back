const mongoose = require('mongoose');

const schema = {
  shift : {
    type: String,
    enum: {
      values: ['morning', 'night'],
      message: '{VALUE} is not supported'
    },
    required: true
  },
  enterAt: {
    type: Date,
  },
  leaveAt: {
    type: Date,
  },
  seenBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
    required: true
  },
}

const attendance_Schema = new mongoose.Schema(schema,{timestamps:true,})

module.exports.model = mongoose.model('attendance',attendance_Schema)
module.exports.schema = schema