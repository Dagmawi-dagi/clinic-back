const mongoose = require('mongoose');


const access_for_schema = new mongoose.Schema({
  // models aceess controll
  model: String,
  model_action: {
    type: String,
    enum: {
      values: ['c', 'r','u','d'],
      message: '{VALUE} is not supported'
    },
  }, 
  // clinical Docs Access controll 
  clinical_doc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clinical_document_config'
  },
  clinical_doc_action: {
    type: String,
    enum: {
      values: ['c', 'r','u','d'],
      message: '{VALUE} is not supported'
    },
  },
  // service access controll
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'service_department'
  },
  service_action: {
    type: String,
    enum: {
      values: ['req_c','req_r','req_u','req_d','res_c','res_r','res_u','res_d' ],
      message: '{VALUE} is not supported'
    },
  },
  // drived acess controll
  drived: String,
  drived_action: {
    type: String,
    enum: {
      values: ['c', 'r','u','d'],
      message: '{VALUE} is not supported'
    },
  },
})

const schema = {
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department'
  },
  access_for:[access_for_schema],
}

const pateint_archive_access_controll = new mongoose.Schema(schema,{ timestamps: true, })

module.exports.model = mongoose.model('pateint_archive_access_controll',pateint_archive_access_controll)
module.exports.schema = schema
