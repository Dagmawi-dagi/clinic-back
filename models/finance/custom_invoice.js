const mongoose = require('mongoose');

const schema = {
  name: {
    type: String,
    required: true,
  },
  payment_amount:{
    type: Number,
    required: true,
  },
  exp_date_indays:{ // in days 
    type: Number,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true
  }
}

const custom_invoice = new mongoose.Schema(schema,{timestamps:true})

module.exports.model = mongoose.model('custom_invoice',custom_invoice)
module.exports.schema = schema