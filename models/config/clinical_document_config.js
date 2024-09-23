const mongoose = require('mongoose');

const schema = {
  doc_name: {
    type: String ,  
    reqiured: true,
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'clinical_document_category',
    required: true,
  },
  form_config: { // the type will be JSON.stringfy
    type: String ,  // vitalsign form, followup form , cardiology folow up, ...
    reqiured: true,
  },
}

const clinical_document_config_Schema = new mongoose.Schema(schema,{timestamps:true})

module.exports.model = mongoose.model('clinical_document_config',clinical_document_config_Schema)
module.exports.schema = schema