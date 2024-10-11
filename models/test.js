const mongoose = require('mongoose');
const joi  = require('joi');

// use joi's .when method to Do awesome custom validation on the schema type 
// be care full when Doing  custome validation on the shema it will fail to validate correctly on joi.validate if Not correct here
// validate: { 
//   validator: function(v) {
//     const { error } =  joi.string().email().validate(v) ;
//     console.log(error);
//     if (error) return false // meanig it Did not pass the validation
//     else return true
//   },
//   message: props => 'asdasd'
// }

// NOTE for the Not required fields put default value as null
// NOTE on every create and update operations include the createdBy: user id ref(user reference id)
const schema = {
  name : {
    type: String,
    required: true}
}
const test_schema = new mongoose.Schema(schema,{ timestamps:true})

// the req.body will be validated via Joi using this schema Object 
module.exports.model = mongoose.model('test',test_schema)
module.exports.schema = schema



