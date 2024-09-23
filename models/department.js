const mongoose = require('mongoose');


const schema = {
  name: {   // admin , Nurse , triage , labratologiest , radiographer , radiologiest , store , cashier 
    type: String,
    required: true,
  },
  // like for example for for phisican thier will be pedatric , gyno , internal medicine , dental , surgen we need the fields below
  has_parent:{
    type: Boolean,
    default:false
  },
  parent_reference : {
    type: String, // phisican
  },
  access_action_privilage_config:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'access_action_privilage_config',
    required:true
  },
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