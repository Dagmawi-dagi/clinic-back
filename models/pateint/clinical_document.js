const mongoose = require('mongoose');

const schema = {
  pateint_archive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pateint_archive',
    required: true
  },
  clinical_document_config: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'clinical_document_config',
    required: true
  },
  // this object doc is created based on the config form 
  document:{
    type: Object,
    reuired: true,
  },
}

const clinical_document_Schema = new mongoose.Schema(schema,{
  timestamps:true,
})

module.exports.model = mongoose.model('clinical_document',clinical_document_Schema)
module.exports.schema = schema