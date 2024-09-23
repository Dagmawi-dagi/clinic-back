const mongoose = require('mongoose');


const schema = {
  pateint_archive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pateint_archive',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  comment: {
    type: String,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}

const appointement_Schema = new mongoose.Schema(schema,{
  timestamps:true,
})


module.exports.model = mongoose.model('appointement',appointement_Schema)
module.exports.schema = schema