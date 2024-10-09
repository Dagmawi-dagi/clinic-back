const GetApi_QueryCustomization = require('../features/GetApi_QueryCustomzation');
const app_error_feedback = require('../err_handling/app_error_feedback');

exports.common_controller =  (model)=>{

  const create = async(req,res,next)=>{
    if (!model) next(new app_error_feedback(500, `Model ${model} not found`))
    try {
      const data = await model.create([req.body],{validateBeforeSave:true})
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
      const GetApi_Query =  new GetApi_QueryCustomization( model.find(), req.query)
      .filter()
      .sort()
      .selectFields()
      .pagination()
    
      const data = await GetApi_Query.query

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
