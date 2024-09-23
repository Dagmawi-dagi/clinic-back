const mongoose = require( 'mongoose')
const GetApi_QueryCustomization = require('../features/GetApi_QueryCustomzation');
const app_error_feedback = require('../err_handling/app_error_feedback');
const { models_ref } = require('../models/models_ref')

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

  async function run_simple_transaction(req, res, next) {
      const session = await mongoose.startSession();

      try {
          session.startTransaction();
          
          const transactionOperations = req.simple_transaction.operations;
          const operationResults = [];

          for (const [index, operation] of transactionOperations.entries()) {
              const { model, operationType, find_ref, update, data, options = {} } = operation;

              const Model = models_ref[model];
              if (!model) next(new app_error_feedback(500, `Model ${model} not found`))

              const resolvedFindRef = (typeof find_ref === 'string') ?  resolvePlaceholder(find_ref, req, operationResults) : resolvePlaceholders(find_ref, req, operationResults);
              const resolvedUpdate = resolveDynamicUpdate(update, req, operationResults); // for update op
              const resolvedData = resolveOperationData(data, req, operationResults); // for create op
              const operationOptions = { ...options, session }; // option obj for any operation

              let result;
              switch (operationType) {
                  case 'create':
                      result = await Model.model.create([resolvedData], operationOptions);
                      operationResults[index] = result[0]; // NB operationResults at this index will be single of doc
                      break;
                  
                  case 'update':
                      result = await Model.model.updateOne(resolvedFindRef, { $set: resolvedUpdate }, operationOptions);
                      operationResults[index] = result; // NB operationResults at this index will be single of doc
                      break;
                  
                  case 'delete':
                      result = await Model.model.deleteOne(resolvedFindRef, operationOptions);
                      operationResults[index] = result; // NB operationResults at this index will be single of doc
                      break;
                  
                  case 'read':
                      result = await Model.model.find(resolvedFindRef,null,operationOptions);
                      operationResults[index] = result; // NB operationResults at this index will be Array of Docs
                      break;

                  default:
                      throw new Error(`Unsupported operation type: ${operationType}`);
              }
          }

          await session.commitTransaction();
          res.status(200).json({ status: 'success', data: operationResults });

      } catch (error) {
          await session.abortTransaction();
          next(error);
      } finally {
          session.endSession();
      }
  }

  return{
    create,
    getList,
    getOne,
    update,
    Delete,
    run_simple_transaction
  }
}

// use the below functions to handle the object on req.simple_transaction  
function resolveDynamicUpdate(update, req, operationResults) {
  // use this to handle the "update" field on req.simple_transaction 
  const resolvedUpdate = {};
  if( !update ) return resolvedUpdate // return empty {} if No update obj but some how this fun is called
  if (!update.fields || !update.value_ref) return update // meaning we can pass "update":  { "status": "archived" }
  // Resolve { "fields": ["status", "name", "age"], "value_ref": "req.body" } 
  const source = resolvePlaceholder(update.value_ref, req, operationResults); 
  // we will do update on the needed fields only 
  if (source && typeof source === 'object') {
    update.fields.forEach(field => {
      if (field in source) resolvedUpdate[field] = source[field]; // Add key-value pairs to the resolved update object
    });
  }

  return resolvedUpdate;
}

function resolveOperationData(data, req, operationResults) {
  // for create operations
  if (typeof data === 'string') return resolvePlaceholder(data, req, operationResults); // resolvePlaceholder will handler "string" values
  else if (typeof value === 'object') return resolvePlaceholders(data, req, operationResults); // will handle object
}

// will handle object VALUES passed to the transaction fields "data" "update" "find_ref" "options"
function resolvePlaceholders(obj, req, operationResults) {
  if (!obj || typeof obj !== 'object' ) return obj;

  const resolvedObj = {};
  if (Object.entries({}).length === 0 ) return resolvedObj
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      resolvedObj[key] = resolvePlaceholder(value, req, operationResults); // still we will handle the string values on the oobjects by resolvePlaceholder  
    } else if (typeof value === 'object') {
      resolvedObj[key] = resolvePlaceholders(value, req, operationResults); // recursive for object values
    } else {
      // we can pass other values out side String and Object to the VALUES of the object keyes  like boolean , numbers
      resolvedObj[key] = value; 
    }
  }

  return resolvedObj;
}

// will handle string values passed to the transaction fields "data" "update" "find_refs" "options"
function resolvePlaceholder(value, req, operationResults) {
  // here add others of expand your options...
  if (value.startsWith('req.params.')) return req.params[value.replace('req.params.', '')];
  else if (value.startsWith('req.body.')) return req.body[value.replace('req.body.', '')];
  else if (value.startsWith('req.query.')) return req.query[value.replace('req.query.', '')];
  else if (value === 'req.query') return req.query; 
  else if (value === 'req.body') return req.body; 
  else if (value.startsWith('{previousResult')) {
    // Resolve placeholder based on previous operation results
    const resultKey = value.match(/\{previousResult\[(\d+)\]\.(\w+)\}/);
    if (resultKey) {
      const index = resultKey[1]
      const field = resultKey[2]
      return operationResults[index][field] ?? {} 
    }
  }
  return value;
}


// things to be passed by transaction keys
  // "model" : "test"

  // "operationType" : "create" , "update" , "delete" , "read"

  // "find_ref" : 
    //  { "_id": "{previousResult[0]._id}" }
    //  { "_id": "req.params.id" },
    //  { "_id": "req.body.id" },
    //  { "_id": "req.query.id" },
    // "req.query"
    // {}
    // { "status": "active" }


  // "update" :
    // {
    //   "fields": ["status", "name", "age"],
    //   "value_ref": "req.body"  , "req.params" .... resolvePlaceholder will handler "string" values
    // } 
    // or
    // { "status": "archived" }

  // "data":
    // "pateint": "{previousResult[0]._id}"
    // { "name": "John Doe","age": 30  }
    // "req.body"  , "req.params" .... resolvePlaceholder will handler "string" values
    
  // "options": 
    // { "validateBeforeSave": true  }