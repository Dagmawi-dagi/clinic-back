const router = require('express').Router();
const { auth } = require('../middle_wares/Authentication');
const { restrict_to } = require('../middle_wares/authorization');
const { uploadFile, proccessImgUpload, saveFile } = require('../middle_wares/multerUpload&Process').fileUpload();
const  { common_controller }  = require('../controllers/common_controllers');
const { controllers_ref } = require('../controllers/controllers_ref');
const { models_ref } = require('../models/models_ref');
const { routes_ref } = require('./route_ref');
const { customize_process_req }  = require('../middle_wares/customize_process_req');

// creat express route for every ai route we have specified above
for (let i = 0; i < routes_ref.length; i++) {
  const baseUrl = routes_ref[i].base_url
  const controller_file= routes_ref[i].controller_file
  const api = routes_ref[i].api

  for (let i = 0; i < api.length; i++) {
    const url = api[i].url
    const method = api[i].method 
    const controller = api[i].controller
    const model = api[i].controller.model
    const auth_needed = api[i].auth
    const restrict_to_needed = api[i].restrict_to

    router[method](
      `${baseUrl}${url}`,
      auth_needed ? auth : (req,res,next)=> next(),
      restrict_to_needed ? restrict_to(api[i].restrict_to) :  (req,res,next)=> next(),
      api[i].upload ? uploadFile(api[i].upload) : (req,res,next)=> next(),
      api[i].image_upload ? proccessImgUpload : (req,res,next)=> next(),
      api[i].save_file_to ? saveFile({saveFolder: api[i].save_file_to}) : (req,res,next)=> next(),
      (req,res,next)=>{ 
        // here add middle ware to add anything  to the req passed from the route_ref
        req.route_ref = api[i]
        req.simple_transaction = controller.simple_transaction 
        api[i].upload ? customize_process_req(req).add_filename_to_reqBody() : ''
        api[i].filter_reqBody_keys ? customize_process_req(req).filter_reqBody(next) : ''
        customize_process_req(req).validate_reqBody(next)   
        next() 
      },
      // final route controller
      controller.common ? ( model ?  common_controller(models_ref[model].model)[controller.method] :  common_controller (undefined).run_simple_transaction )
      : controllers_ref[controller_file][controller.method],
    )

  }
}

module.exports = router