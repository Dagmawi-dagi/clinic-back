const mongoose = require('mongoose');

const schema = {
  deposit_amount: {
    type: Number,
    required: true
  },
  // if the current aomunt is less than the invoice err_feed_back msg message
  current_amount:{
    type: Number,
    required: true
  },
  // on pay add payed invoice id and subract form the current_amount and and update the current_amount again
  // reference of every payed invoices form pateint deposit
  payed_invoices:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'invoice',
  }],
  withdrawn: {
    type: Boolean,
    required: true,
    default: false
  },
  pateint_archive:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pateint_archive',
    required: true
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true
  }
}

const deposite_Schema = new mongoose.Schema(schema,{timestamps:true})

module.exports.model = mongoose.model('deposite',deposite_Schema)
module.exports.schema = schema