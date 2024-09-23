const { models } = require('../models/models_ref');
const catchAsync= require('../features/catchAsync');
const app_error_feedback = require('../err_handling/app_error_feedback');

exports.restrict_to = (roles)=>{ 
  // the passed roles arg is array
  return catchAsync(async (req,res,next)=>{
    // const user = await models.user.findById(req.user._id)
    // if( ![...roles].includes(user.role) ) return next( new app_error_feedback(403,`only ${roles} can perform this action` ))
    next()
  })

}