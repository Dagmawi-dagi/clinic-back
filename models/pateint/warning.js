const mongoose = require('mongoose');

const schema = {
  pateint_archive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pateint_archive',
    required: true
  },
  allergy: {
    type: [String],
  },
  behavior: {
    type:  String,
  },
  chronic_diseases:{
    type: [String],
  },
}

const warning_Schema = new mongoose.Schema(schema,{timestamps:true})

module.exports.model = mongoose.model('warning',warning_Schema)
module.exports.schema = schema