const mongoose =  require('mongoose');

// NOTE for the Not required fields put default value as null
// NOTE on every create and update operations include the createdBy: user id ref(user reference id)
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
  age: {
    type: Number,
    required: true,
  },
  gender:{
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not supported'
    },
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
    default: null
  },
  region :{
    type: String,
    default: null
  },
  wereda :{
    type: String,
    default: null
  },
  zone :{
    type: String,
    default: null
  },
  kebele:{
    type: String,
    default: null
  },
  phone_number:{
    type: String,
    required: true,
    unique: true
  },
  // medical adminstration information
  MRN:{
    type: Number, // on register add one to the geater MRN ever recorder 
    unique: true,
  },
  type: {
    type: String,
    enum: {
      values: ['in_pateint','out_pateint', 'service'],
      message: '{VALUE} is not supported'
    },
    required: true,
  },
  insurance_company :{
    // if the pateint is insured
    // use parent referencing to refer to which company you belong to
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'insurance',
    default: null
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