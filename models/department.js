const mongoose = require('mongoose');

const schema = {
  department_name: {   // admin , Nurse , triage , labratologiest , radiographer , radiologiest , store , cashier 
    type: String,
    required: true,
    unique: true
  },
  // like for example for phisican dep't thier will be sub departments gyno dental surgen etc
  // use self reference
  parent_reference : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department',
    default: null
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true
  }
}

const department_Schema = new mongoose.Schema(schema,{
  timestamps:true,
  toJSON:{virtuals: true},
  toObject: {virtuals:true}
})

// refer all the queues on this department as a vaertual cus the queue ids can be so many to be included inside a doc on the DB
department_Schema.virtual('queues',{
  ref: 'queue',
  foreignField: 'department',
  localField: '_id'
})


module.exports.model = mongoose.model('department',department_Schema)
module.exports.schema = schema