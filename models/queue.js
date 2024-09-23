const mongoose = require('mongoose');

const schema = {
  department:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department'
  },
  service:{ //  if the queue is for service queue
    type: mongoose.Schema.Types.ObjectId,
    ref: 'service'
  },
  priority:{
    type: String,
    enum: {
      values: ['urgent', 'normal'],
      message: '{VALUE} is not supported'
    },
    default: 'normal'
  },
  status:{
    type: String,
    enum: {
      values: ['seen', 'rejected','waiting'],
      message: '{VALUE} is not supported'
    },
    default: 'waiting'
  },
  invoice_payed: { //  we need amrker ithe queue is for service and we need to know the service invoice has been payed
    type: Boolean,
    default: false,
  },
  rejection_reason: {
    type: String,
    trim: true,
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  pateint_type: {
    type: String,
    enum: {
      values: ['in_pateint','out_pateint', 'service'],
      message: '{VALUE} is not supported'
    },
    required: true
  },
  pateint_archive:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pateint_archive'
  },
}

const queue_schema = new mongoose.Schema(schema,{ timestamps: true });

module.exports.model = mongoose.model('queue',queue_schema)
module.exports.schema = schema