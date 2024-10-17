const app_error_feedback = require('../err_handling/app_error_feedback');
const api_query_params = require('api-query-params');
const {models_ref} = require('../models/models_ref')

exports.common_controller =  (model)=>{

  const create = async(req,res,next)=>{
    if (!model) next(new app_error_feedback(500, `Model ${model} not found`))
    try {
      const createObj = {...req.body} // if the route_ref has add_createdBy then get the user from the req.user and {createdBy: req.user._id} will be added to the req.body
      if(req.route_ref.controller.add_createdBy) createObj.createdBy = req.user._id
      const data = await model.create([createObj],{validateBeforeSave:true})
      res.status(200).json({ 
        status: 'success',
        data
      })
    } catch (err) {
      next(err)
    }
  }

  const getList = async (req,res,next)=>{
    if (!model) next(new app_error_feedback(500, `Model ${model} not found`))

    try {
      // what must be passed for this controllers is according to the api_query_params way of doing things
      // meaning the req.query must be long string (api_query_params way) not Key/value pairs
      // OR use decodeURIComponent to decode like %20 cus thier will be if passing > < + ^ signs
      // which we will pass > < for advanced queries other 
      // refer the api_query_params lib for more info on what to pass https://www.npmjs.com/package/api-query-params?activeTab=readme#usage
      const decodedURI = decodeURIComponent(req.url);
      // we need to splic the query is thire is any
      let queryStr;
      if(Object.keys(req.query).length != 0 ){
        queryStr = decodedURI.split('?')[1]
        // handling {key: >value} || {key: <value} || {key: >=value} || {key: <=value} query params
        queryStr = queryStr.replace(/=([><])/g, '$1');
      }

      console.log(`queryStr on getList request ${queryStr ?? 'no queryStr found' }`)

      const { filter, skip, limit, sort, projection, population } = api_query_params(queryStr, {
        limitKey: 'perPage',
        skipKey: 'page',
      });
      const data = await model.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .populate(population) // if youe want you can populate virtuall OR local fields
      res.status(200).json({
        status: 'success',
        data
      })
    } catch (err) {
      next(err) 
    }
  }

  const getOne = async (req,res,next)=>{
    if (!model) next(new app_error_feedback(500, `Model ${model} not found`))

    const { id } = req.params
    try {
      const data = await   model.findById(id)
      if (!data) return next(new app_error_feedback(400,`No data found by this Id ${id}`))
      res.status(200).json({ status: 'success', data})
    } catch (err) {
      next(err) 
    }
  }

  const update = async ( req,res,next )=>{
    if (!model) next(new app_error_feedback(500, `Model ${model} not found`))
    // Any prop value can be sent with in the req body then only what's defined on the route_ref will be updated
    const { id } = req.params
    try {
      const data = await   model.findByIdAndUpdate({_id: id },req.body,{new:true})
      if(!data) return next(new app_error_feedback(400, `no data found with id: ${id}`) )
      res.status(200).json({ status: 'success',data })
    } catch (err) {
      next(err)
    }
  }

  const Delete = async(req,res,next)=>{
    if (!model) next(new app_error_feedback(500, `Model ${model} not found`))
    const { id } = req.params
    try {
      await  model.findOneAndDelete({ _id : id })
      res.status(204).json({ status: 'success'})
    } catch (err) {next(err)}
  }

  return{
    create,
    getList,
    getOne,
    update,
    Delete,
  }
}
