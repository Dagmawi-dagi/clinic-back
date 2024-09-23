const mongoose = require('mongoose');

const schema = {
  name: {   
    type: String,
    required: true,
  },
}

const symptom_Schema = new mongoose.Schema(schema,{timestamps:true})

module.exports.model = mongoose.model('symptom',symptom_Schema)
module.exports.schema = schema