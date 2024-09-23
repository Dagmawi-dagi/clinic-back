const mongoose = require('mongoose');

const schema = {
  name: {
    type: String,
    required: true 
  },
}

const medication_group_Schema = new mongoose.Schema(schema,{
  timestamps:true,
  toJSON: {virtuals: true},
  toObject:{virtuals: true}
})

// medication_group_Schema (parent) will refer it's medication that are under it
medication_group_Schema.virtual('pateints',{
  ref: 'pateint',
  foreignField: 'medication_group',
  localField: '_id'
});


module.exports.model = mongoose.model('medication_group',medication_group_Schema)
module.exports.schema = schema
