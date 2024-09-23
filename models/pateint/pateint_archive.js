const mongoose = require('mongoose');

const schema = {
  pateint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pateint',
    required: true
  },
  MRN:{
    type: Number, // on register add one to the geater MRN ever recorder 
    required: true,
  }
}

const pateint_archive_Schema = new mongoose.Schema(schema,{
  timestamps:true,
  toJSON: {virtuals: true},
  toObject:{virtuals: true}
})


// refer all the Documents that point to this archive as virtual docs
// because the array of ids may be so many 

pateint_archive_Schema.virtual('emergency_contacts',{
  ref: 'emergency_contact',
  foreignField: 'pateint_archive',
  localField: '_id'
});

pateint_archive_Schema.virtual('prescriptions',{
  ref: 'prescription',
  foreignField: 'pateint_archive',
  localField: '_id'
});

pateint_archive_Schema.virtual('services',{
  ref: 'service',
  foreignField: 'pateint_archive',
  localField: '_id'
});

pateint_archive_Schema.virtual('appointements',{
  ref: 'appointement',
  foreignField: 'pateint_archive',
  localField: '_id'
});

pateint_archive_Schema.virtual('clinical_documents',{
  ref: 'clinical_document',
  foreignField: 'pateint_archive',
  localField: '_id'
});

pateint_archive_Schema.virtual('external_medical_docs',{
  ref: 'external_medical_doc',
  foreignField: 'pateint_archive',
  localField: '_id'
});

pateint_archive_Schema.virtual('warnings',{
  ref: 'warning',
  foreignField: 'pateint_archive',
  localField: '_id'
});

pateint_archive_Schema.virtual('credits',{
  ref: 'credit',
  foreignField: 'pateint_archive',
  localField: '_id'
});

pateint_archive_Schema.virtual('deposits',{
  ref: 'deposite',
  foreignField: 'pateint_archive',
  localField: '_id'
});

pateint_archive_Schema.virtual('invoices',{
  ref: 'invoice',
  foreignField: 'pateint_archive',
  localField: '_id'
});


pateint_archive_Schema.pre(/^find/,function(next,){
  this.populate('pateint')
  this.populate('invoices')
  this.populate('deposits')
  this.populate('credits')
  this.populate('warnings')
  this.populate('external_medical_docs')
  this.populate('clinical_documents')
  this.populate('appointements')
  this.populate('services')
  this.populate('prescriptions')
  this.populate('emergency_contacts')
  next()
})



module.exports.model = mongoose.model('pateint_archive',pateint_archive_Schema)
module.exports.schema = schema