const mongoose = require('mongoose');


const schema = {
  name: {
    type: String, // General / covid / other forms / Hiv / Dental / ....... 
    required: true,
  },
}

const clinical_document_category_Schema = new mongoose.Schema(schema,{ 
  timestamps:true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// refer all clinical_doc_configs under this catag
clinical_document_category_Schema.virtual( 'clinical_doc_configs',{
  ref: 'clinical_document_config',
  foreignField: 'clinical_document_category',
  localField: '_id'
})

module.exports.model = mongoose.model('clinical_document_category',clinical_document_category_Schema);
module.exports.schema = schema