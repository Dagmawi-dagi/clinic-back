const mongoose = require('mongoose');


const schema = {
  pateint_archive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pateint_archive',
    required: true
  },

  // we need form config for prescription form too cus prescription form fields may vary from one compy to another
  prescription_form_config : {
    type: String // JSON.Stringify()
  },

  dose : {
    type: Object,
    required: true,
  },
  route:{
    type: String,
    required: true,
  },
  // this should be calculated date based on the prescription Dose
  final_date:{
    type: Date,
    required: true 
  },
  comment:{
    type: String,
  },
  medication:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'medication',
    required: true
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true
  },
}

const prescription_Schema = new mongoose.Schema(schema,{timestamps:true})

module.exports.model = mongoose.model('prescription',prescription_Schema)
module.exports.schema = schema
