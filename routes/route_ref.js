// these below are server api routes

// NOTE 
 // the option for d|t ways of uplod are..
    // {
    //  uploadType: 'single' || 'array' || 'array_'
    //  fileType: 'text/html' || 'image' || 'application/pdf'....
    //  fieldName: 'coverImg' || { name: 'avatar', maxCount: 1 } ---? if uploadType === 'array_'
    //  maxCount: 10 // only if uploadType === 'array'
    // },

  // use this example below to define the routes
    // {
    //   route_for : 'event',
    //   base_url : '/event',
    //   controller_file: 'event', 
    //   api: [
    //     { 
    //       url: '/:id', 
    //       method: 'get', 
    //       auth: false,
    //       restrict_to: ['aaa'],
    //       upload: { uploadType: 'single', fileType: 'image', fieldName: 'coverImg'},
    //       image_upload : true,
    //       save_file_to: 'event',
    //       filter_reqBody_keys:['filed',"field"], // must be for every put and patch req
    //       req_body_validation:false
    //       controller:{
    //          method: 'create',
    //          model: 'emergency_contact',
    //          common: true,
    //          simple_transaction:{refer what to pass here on the common controller factory function commented below }
    //        },
    //     },
    //   ],
    // }



    
// after setting up sheama correctly  do your front End 
// and add what the api routes you need for your Front End logics here 

// use the routes_ref to create postman Api routes testing  // make this automatic DONOT spent time creating  postman Api routes for every route_refs that is just stupid

exports.routes_ref = [
  {
    route_for : 'test',
    base_url : '/test',
    controller_file: 'test', 
    api: [
      { 
        url: '/', 
        method: 'put',
        filter_reqBody_keys:['name'],
        controller:{
          method: 'create',
          model: 'test',
          common: true
        },
      },
    ],
  },

  // complete user routes for any project
  {
    route_for : 'user',
    base_url : '/user',
    controller_file: 'user', 
    api: [
      { 
        url: '/sign_up', 
        method: 'post',
        controller:{
          method: 'sign_up',
          common: false
        },
      },
      { 
        url: '/sign_in', 
        method: 'post',
        filter_reqBody_keys:['phoneNumber','userPassword'],
        req_body_validation :false,
        controller:{
          method: 'sign_in',
          common: false
        },
      },
      { 
        url: '/get_me', 
        method: 'get',
        auth: true,
        controller:{
          method: 'get_me',
          common: false
        },
      },
      { 
        url: '/get_user/:id', 
        method: 'get',
        controller:{
          method: 'get_user',
          common: false
        },
      },
      { 
        url: '/update_password', 
        method: 'post',
        filter_reqBody_keys:['currentPassword','newPassword'],
        req_body_validation :false,
        auth: true,
        controller:{
          method: 'update_password',
          common: false
        },
      },
      // if we want to check password before updating PhoneNumber
      { 
        url: '/update_phoneNumber', 
        method: 'post',
        filter_reqBody_keys:['currentPassword','newPhoneNumber'],
        req_body_validation :false,
        auth: true,
        controller:{
          method: 'update_phoneNumber',
          common: false
        },
      },
      // if we want to check password before updating email
      { 
        url: '/update_email', 
        method: 'post',
        filter_reqBody_keys:['currentPassword','email'],
        req_body_validation :false,
        auth: true,
        controller:{
          method: 'update_email',
          common: false
        },
      },
      { 
        url: '/update_me', 
        method: 'post',
        req_body_validation :false,
        auth: true,
        image_upload : true,
        upload: { uploadType: 'single', fileType: 'image', fieldName: 'avatar'},
        save_file_to: 'users',
        controller:{
          method: 'update_me',
          common: false
        },
      },
      { 
        url: '/forgot_password', 
        method: 'post',
        filter_reqBody_keys:['email'],
        req_body_validation :false,
        auth: true,
        controller:{
          method: 'forgot_password',
          common: false
        },
      },
      { 
        url: '/reset_password/:resetToken', 
        method: 'post',
        filter_reqBody_keys:['newPassword'],
        req_body_validation :false,
        controller:{
          method: 'reset_password',
          common: false
        },
      },
      { 
        url: '/delete_me', 
        method: 'delete',
        req_body_validation :false,
        auth: true,
        controller:{
          method: 'delete_me',
          common: false
        },
      },
    ],
  },

  {
    route_for : 'pateint',
    base_url : '/pateint',
    controller_file: 'pateint', 
    api: [
      { 
        url: '/search', 
        method: 'get',
        req_body_validation: false,
        controller:{
          model: 'pateint',
          method: 'getList',
          common: true,
        },
      },
      { 
        url: '/:id', 
        method: 'get',
        req_body_validation: false,
        controller:{
          method: 'getOne',
          model: 'pateint',
          common: true
        },
      },
      { 
        url: '/register_pateint', 
        method: 'post',
        controller:{
          method: 'run_simple_transaction',
          common: true,
          simple_transaction:{
            operations: [
              {
                "model": "pateint",
                "operation": "create",
                "data": 'req.body',
              },
              {
                "model": "pateint_archive",
                "operation": "create",
                "data": {
                  "pateint": "{previousResult[0]._id}"
                }
              },
            ] 
          }
        },
      },
      { 
        url: '/:id/update_insurer', 
        method: 'patch',
        filter_reqBody_keys:['insurance_company'],
        req_body_validation: false,
        controller:{
          method: 'update',
          model: 'pateint',
          common: true
        },
      },
      { 
        url: '/:id', 
        method: 'put',
        req_body_validation: false,
        controller:{
          method: 'update',
          model: 'pateint',
          common: true
        },
      },
    ],
  },

  {
    route_for : 'pateint_archive',
    base_url : '/pateint_archive',
    controller_file: 'pateint_archive', 
    api: [
      { 
        url: '/:id', 
        method: 'get',
        auth: true,
        controller:{
          method: 'getOne',
          model: 'pateint_archive',
          common: true
        },
      },
    ],
  },

  {
    route_for : 'warning',
    base_url : '/warning',
    controller_file: 'warning', 
    api: [
      { 
        url: '/create', 
        method: 'post',
        controller:{
          method: 'create',
          model:'warning',
          common: true,
        },
      },
      { 
        url: '/:id', 
        method: 'patch',
        filter_reqBody_keys: ['pateint_archive','allergy','behavior','chronic_diseases'],
        controller:{
          method: 'update',
          model:'warning',
          common: true,
        },
      },
    ],
  },
  
  {
    route_for : 'appointment',
    base_url : '/appointment',
    controller_file: 'appointment', 
    api: [
      { 
        url: '/create', 
        method: 'post',
        controller:{
          method: 'create',
          model:'appointment',
          common: true,
        },
      },
      { 
        url: '/:id', 
        method: 'patch',
        filter_reqBody_keys: ['pateint_archive','date','comment','appointed_by'],
        controller:{
          method: 'update',
          model:'appointment',
          common: true,
        },
      },
    ],
  },

  {
    route_for : 'external_medical_doc',
    base_url : '/external_medical_doc',
    controller_file: 'external_medical_doc', 
    api: [
      { 
        url: '/create', 
        method: 'post',
        upload: { uploadType: 'array', fileType: 'image', fieldName: 'scanned_docs', maxCount:20},
        image_upload : true,
        save_file_to: 'scanned_docs',
        controller:{
          method: 'create',
          model:'external_medical_doc',
          common: true,
        },  
      },
      { 
        url: '/:id', 
        method: 'patch',
        filter_reqBody_keys:['pateint_archive','scanned_docs','comment'],
        controller:{
          method: 'update',
          model:'external_medical_doc',
          common: true,
        },
      },
    ],
  },

  {
    route_for : 'emergency_contact',
    base_url : '/emergency_contact',
    controller_file: 'emergency_contact', 
    api: [
      { 
        url: '/create', 
        method: 'post',
        controller:{
          method: 'create',
          model: 'emergency_contact',
          common: true
        },
      },
      { 
        url: '/:id', 
        method: 'patch',
        filter_reqBody_keys:['name','phone_number','pateint_archive'],
        controller:{
          method: 'create',
          model: 'emergency_contact',
          common: true
        },
      },
    ],
  },
]