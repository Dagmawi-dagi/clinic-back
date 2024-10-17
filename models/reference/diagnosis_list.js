const mongoose = require('mongoose');

const schema = {
  name: {
    type: String,
    required: true,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true
  }
}

const diagnosis_list_schema = new mongoose.Schema(schema,{timestamps: true})

module.exports.model = mongoose.model('diagnosis_list',diagnosis_list_schema)
module.exports.schema = schema
