const mongoose = require('mongoose');

const schema = {
  pateint_archive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pateint_archive',
    required: true
  },
  invoice:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'invoice',
    required: true
  },
}

const credit_Schema = new mongoose.Schema(schema,{timestamps:true})

module.exports.creditModel = mongoose.model('credit',credit_Schema)
module.exports.schema = schema