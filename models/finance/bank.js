const mongoose = require('mongoose');

const schema = {
  name: {
    type: String,
    required: true,
  },
  health_facility_account_number:{
    type: Number,
    required: true,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true
  }
}

const bank_Schema = new mongoose.Schema(schema,{timestamps:true})


module.exports.bankModel = mongoose.model('bank',bank_Schema)
module.exports.schema = schema