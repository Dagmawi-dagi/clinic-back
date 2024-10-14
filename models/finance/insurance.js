const mongoose = require('mongoose');

const schema = {
  // info
  company_name : {
    type: String,
    required: true,
  },
  insurance_number:{
    type: Number,
    required: true,
  },
  // discount form for all the services individually or as departments 
  discount_form: {
    type: Object,
    required: true,
  },
  // addresss
  phone_number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
}

const insurance_Schema = new mongoose.Schema(schema,{
  timestamps:true,
  toJSON: { virtuals: true },
  toObject:{ virtuals: true }
})
// insurance_Schema (parent) will refer it's pateints
insurance_Schema.virtual('pateints',{
  ref: 'pateint',
  foreignField: 'insurance_company',
  localField: '_id'
});
// insurance_Schema (parent) will refer it's invoices
insurance_Schema.virtual('invoices',{
  ref: 'invoice',
  foreignField: 'insurance',
  localField: '_id'
});


module.exports.model = mongoose.model('insurance',insurance_Schema)
module.exports.schema = schema