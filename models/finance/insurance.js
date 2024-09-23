const mongoose = require('mongoose');

const schema = {
  company_name : {
    type: String,
    required: true,
  },
  insurance_number:{
    type: Number,
    required: true,
  },
  percent: {
    type: Object,
    required: true,
  },
  address: {
    type: Object,
    required: true,
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


module.exports.model = mongoose.model('insurance',insurance_Schema)
module.exports.schema = schema