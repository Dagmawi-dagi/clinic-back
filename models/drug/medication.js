const mongoose = require('mongoose');

const schema = {
  medication_name : {
    type: String,
    required: true,
  },
  unit:{
    type: String,
    required: true,
  },
  unit_price : {
    type: Number,
  },
  units_per_packing:{
    type: Number
  },
  medication_group:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'medication_group',
    required: true,
  }
}

const medication_Schema = new mongoose.Schema(schema,{timestamps:true})

module.exports.model = mongoose.model('medication',medication_Schema)
module.exports.schema = schema