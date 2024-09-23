const mongoose =  require('mongoose');

const schema  = {
  // personal information
  first_name :{
    type: String,
    required: true,
  },
  middle_name :{
    type: String,
    required: true,
  },
  last_name:{
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  gender:{
    type: String,
    required: true,
  },
  marital_status:{
    type: String,
  },
  religion :{
    type: String,
  },
  occupation :{
    type: String,
    required: true,
  },
  // address information
  country :{
    type: String,
  },
  region :{
    type: String,
  },
  wereda :{
    type: String,
  },
  zone :{
    type: String,
  },
  kebele:{
    type: String,
  },
  phone_number:{
    type: String,
    required: true,
    unique: true
  },
  // medical adminstration information
  type: {
    type: String,
    enum: {
      values: ['in_pateint','out_pateint', 'service'],
      message: '{VALUE} is not supported'
    }
  },
  insurance_company :{
    // if the pateint is insured
    // use parent referencing to refer to which company you belong to

    type: mongoose.Schema.Types.ObjectId, 
    ref: 'insurance',
    required: false,
  },
  invoice_destination: {
    type: String,
    enum: {
      values: ['employer','self','insurance'],
      message: '{VALUE} is not supported'
    },
    required: true,
  },
}

const pateintSchema = new mongoose.Schema(schema,{
  timestamps:true,
  toJSON: {virtuals:true},
  toObject: {virtuals:true}
})

// virtuals
pateintSchema.virtual('pateint_archive',{
  ref: 'pateint_archive',
  foreignField: 'pateint',
  localField: '_id',
  justOne: true,
})


module.exports.model = mongoose.model('pateint',pateintSchema)
module.exports.schema = schema