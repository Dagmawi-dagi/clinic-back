const { generateJoiSchema } = require('../features/joi_validator');
const { models_ref } = require('../models/models_ref');
const app_error_feedback = require('../err_handling/app_error_feedback')


exports.customize_process_req = (req)=>{

  const add_filename_to_reqBody = ()=>{
      const dataObj = { ...req.body };
      if (req.files && req.files.length > 0) {
          req.files.forEach(file => {
              if (!dataObj[file.fieldname])  dataObj[file.fieldname] = [];
              dataObj[file.fieldname].push(file.filename);
          });
      }
      if (req.file) dataObj[req.file.fieldname] = req.file.filename;
      req.body = {...dataObj}
  }

  const validate_reqBody = (next)=> { 
    if( !req.route_ref.controller.model || !req.route_ref.req_body_validation ) return
    const mongooseSchema =   models_ref[req.route_ref.controller.model].schema
    // KEY NOTE :: 
    // strip out fields from the req.body if Not defined on the schema
    const { error } = generateJoiSchema(mongooseSchema).validate(req.body,{stripUnknown: true})
    if( error ) return next(new app_error_feedback(400,error))
  }
  
  const filter_reqBody = () =>{
    if( !req.route_ref.filter_reqBody_keys) return
    const filtered_obj = {}
    req.route_ref.filter_reqBody_keys.forEach(key => {
      if (  req.body[key] !== undefined) filtered_obj[key] = req.body[key];
    });
    req.body = filtered_obj
  }

  return{
    add_filename_to_reqBody,
    validate_reqBody,
    filter_reqBody,
  }

}