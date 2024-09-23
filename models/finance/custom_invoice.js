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
  }
}

const custom_invoice = new mongoose.Schema(schema,{timestamps:true})

module.exports.model = mongoose.model('custom_invoice',custom_invoice)
module.exports.schema = schema