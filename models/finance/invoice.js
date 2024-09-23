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
  service: {
    type: mongoose.Schema.Types.ObjectId,
    // or refer form prscription if their is pharmacy ... refer mongoose documentation
    ref: 'service',
    required: true
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
}

const invoice_Schema = new mongoose.Schema(schema,{timestamps:true})
module.exports.model = mongoose.model('invoice',invoice_Schema)
module.exports.schema = schema