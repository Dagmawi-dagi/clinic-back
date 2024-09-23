const mongoose = require('mongoose')
const { models_ref } = require('../../models/models_ref')
const catchAsync = require('../../features/catchAsync');
const app_error_feedback = require('../../err_handling/app_error_feedback');
const { common_controller } = require('../common_controllers')
const WEBSOCKET = require('../../socket/socket');


exports.register_pateint = catchAsync(async(req,res,next)=>{

})

