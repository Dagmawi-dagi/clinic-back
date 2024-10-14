const mongoose = require('mongoose');

const schema = {
  status :{
    type: String,
    enum: ['open','closed','canceled'],
    default: 'open',
  },
  canceled_reason: String, // if the invoice was canccelled we need to know why
  payment_type:{
    type: String,
    enum: ['cash','bank','deposit'],
    default: 'cash'
  },
  credited: {
    type: Boolean,
    default: false,
  },
  free_pass: {
    type: Boolean,
    default: false,
  },
  issued_at_price:{
    type: Number,
    required: true
  },
  service: { // if the invoice is for service
    type: mongoose.Schema.Types.ObjectId,
    ref: 'service',
  },
  custom_invoice:{ // if the invoice is for custom_invoices
    type: mongoose.Schema.Types.ObjectId,
    ref: 'custom_invoice',
  },
  updated: {type: Boolean }, // can be updated by the one who created it
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  destination: {
    type: String,
    enum: {
      values: ['self', 'employer','insurance'],
      message: '{VALUE} is not supported'
    },
    required: true,
  },
  pateint_archive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pateint_archive'
  },
  insurance: { // insurance reference if the invoice destination is "insurance"
    type: mongoose.Schema.Types.ObjectId,
    ref: 'insurance'
  },
}

const invoice_Schema = new mongoose.Schema(schema,{timestamps:true})

module.exports.model = mongoose.model('invoice',invoice_Schema)
module.exports.schema = schema