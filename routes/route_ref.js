// these below are server api routes

// NOTE 
// the options for d|t ways of upload are..
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
    //       req_method: 'get', 
    //       auth: false,
    //       restrict_to: ['aaa'],
    //       upload: { uploadType: 'single', fileType: 'image', fieldName: 'coverImg'},
    //       image_upload : true,
    //       save_file_to: 'event',
    //       filter_reqBody_with:['filed',"field"], // must be for every put and patch req
    //       req_body_validation:false
    //       controller:{
    //          crud_method: 'create',
    //          model: 'emergency_contact',
    //          common: true,
    //          add_createdBy:true // to add createdBy field to req.body that will be used to create the document in db
    //        },
    //     },
    //   ],
    // }

// after setting up sheama correctly do your front End 
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
        req_method: 'put',
        auth: false,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'test',
          crud_method: 'create',
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
        url: '/users', 
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'user',
          crud_method: 'getList',
          common: true
        },
      },
      { 
        url: '/sign_up', 
        req_method: 'post',
        auth: false,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          crud_method: 'sign_up',
          common: false
        },
      },
      { 
        url: '/create',  // for some reason if we want to create user with out giveing them login token Eg: if admin wants to create user
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:true,
        filter_reqBody_with:[],
        controller:{
          model: 'user',
          crud_method: 'create',
          common: true
        },
      },
      { 
        url: '/sign_in', 
        req_method: 'post',
        auth: false,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:['phoneNumber','userPassword'],
        controller:{
          crud_method: 'sign_in',
          common: false
        },
      },
      { 
        url: '/get_me', 
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          crud_method: 'get_me',
          common: false
        },
      },
      { 
        url: '/get_user/:id', 
        req_method: 'get',
        auth: false,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          crud_method: 'get_user',
          common: false
        },
      },
      { 
        url: '/update_password', 
        req_method: 'post',
        auth: false,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:['currentPassword','newPassword'],
        auth: true,
        controller:{
          crud_method: 'update_password',
          common: false
        },
      },
      // if we want to check password before updating PhoneNumber
      { 
        url: '/update_phoneNumber', 
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:['currentPassword','newPhoneNumber'],
        controller:{
          crud_method: 'update_phoneNumber',
          common: false
        },
      },
      // if we want to check password before updating email
      { 
        url: '/update_email', 
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:['currentPassword','email'],
        auth: true,
        controller:{
          crud_method: 'update_email',
          common: false
        },
      },
      { 
        url: '/update_me', 
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: { uploadType: 'single', fileType: 'image', fieldName: 'avatar'},
        image_upload:true,
        save_file_to: 'users',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          crud_method: 'update_me',
          common: false
        },
      },
      { 
        url: '/forgot_password', 
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:['email'],
        controller:{
          crud_method: 'forgot_password',
          common: false
        },
      },
      { 
        url: '/reset_password/:resetToken', 
        req_method: 'post',
        auth: false,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:['newPassword'],
        controller:{
          crud_method: 'reset_password',
          common: false
        },
      },
      { 
        url: '/delete_me', 
        req_method: 'delete',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          crud_method: 'delete_me',
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
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'pateint',
          crud_method: 'getList',
          common: true,
        },
      },
      { 
        url: '/:id', 
        req_method: 'get',
        auth: false,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          crud_method: 'getOne',
          model: 'pateint',
          common: true
        },
      },
      { 
        url: '/register_pateint', 
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          crud_method: 'register_pateint',
          common: false,
        },
      },
      { 
        url: '/:id/update_insurer', 
        req_method: 'patch',
        auth: false,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:['insurance_company'],
        controller:{
          crud_method: 'update',
          model: 'pateint',
          common: true
        },
      },
      { 
        url: '/:id', 
        req_method: 'put',
        auth: false,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          crud_method: 'update',
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
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          crud_method: 'getOne',
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
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          crud_method: 'create',
          model:'warning',
          common: true,
        },
      },
      { 
        url: '/:id', 
        req_method: 'patch',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with: ['pateint_archive','allergy','behavior','chronic_diseases'],
        controller:{
          crud_method: 'update',
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
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with: [],
        controller:{
          crud_method: 'create',
          model:'appointment',
          common: true,
        },
      },
      { 
        url: '/:id', 
        req_method: 'patch',
        filter_reqBody_with: ['pateint_archive','date','comment','appointed_by'],
        controller:{
          crud_method: 'update',
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
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: { uploadType: 'array', fileType: 'image', fieldName: 'scanned_docs', maxCount:20},
        image_upload : true,
        save_file_to: 'scanned_docs',
        req_body_validation:false,
        filter_reqBody_with: [],
        controller:{
          crud_method: 'create',
          model:'external_medical_doc',
          common: true,
        },  
      },
      { 
        url: '/:id', 
        req_method: 'patch',
        auth: false,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:['pateint_archive','scanned_docs','comment'],
        controller:{
          crud_method: 'update',
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
        req_method: 'post',
        auth: false,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          crud_method: 'create',
          model: 'emergency_contact',
          common: true
        },
      },
      { 
        url: '/:id', 
        req_method: 'patch',
        auth: false,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:['name','phone_number','pateint_archive'],
        controller:{
          crud_method: 'create',
          model: 'emergency_contact',
          common: true
        },
      },
    ],
  },

  {
    route_for : 'custom_invoice',
    base_url : '/custom_invoice',
    controller_file: 'custom_invoice', 
    api: [
      { 
        url: '/', 
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:true,
        filter_reqBody_with:[],
        controller:{
          model: 'custom_invoice',
          crud_method: 'create',
          common: true
        },
      },
      { 
        url: '/', 
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'custom_invoice',
          crud_method: 'getList',
          common: true
        },
      },
    ],
  },

  {
    route_for : 'invoice',
    base_url : '/invoice',
    controller_file: 'invoice', 
    api: [
      { 
        url: '/', 
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'invoice',
          crud_method: 'getList',
          common: true
        },  
      },
    ],
  },

  {
    route_for : 'credit',
    base_url : '/credit',
    controller_file: 'credit',
    api: [
      { 
        url: '/', 
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'credit',
          crud_method: 'getList',
          common: true
        },
      },
    ],
  },

  {
    route_for : 'deposite',
    base_url : '/deposite',
    controller_file: 'deposite',
    api: [
      { 
        url: '/', 
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'deposite',
          crud_method: 'getList',
          common: true
        },
      },
    ],
  },

  {
    route_for : 'insurance',
    base_url : '/insurance',
    controller_file: 'insurance',
    api: [
      { 
        url: '/', 
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'insurance',
          crud_method: 'create',
          common: true
        },
      },
      { 
        url: '/', 
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'insurance',
          crud_method: 'getList',
          common: true
        },
      },
      { 
        url: '/invoices', 
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'insurance',
          crud_method: 'getList',
          common: true
        },
      },
    ],
  },

  {
    route_for : 'store',
    base_url : '/store',
    controller_file: 'store',
    api: [
      { 
        url: '/', 
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'store_item',
          crud_method: 'create',
          common: true,
          add_createdBy:true
        },
      },
      { 
        url: '/', 
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'store_item',
          crud_method: 'getList',
          common: true
        },
      },
      { 
        url: '/requested_items', 
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'store_request',
          crud_method: 'getList',
          common: true,
          add_createdBy:true
        },
      },
    ],
  },
  
  {
    route_for : 'department',
    base_url : '/department',
    controller_file: 'department', 
    api: [
      { 
        url: '/', 
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'department',
          crud_method: 'getList',
          common: true
        },
      },
      { 
        url: '/', 
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'department',
          crud_method: 'create',
          common: true,
          add_createdBy:true
        },
      },
    ],
  },

  {
    route_for : 'employee',
    base_url : '/employee',
    controller_file: 'employee', 
    api: [
      { 
        url: '/', 
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'employee',
          crud_method: 'getList',
          common: true
        },
      },
      { 
        url: '/register', 
        req_method: 'post',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'employee',
          crud_method: 'register_employee',
          common: false
        },
      },
    ],
  },

  {
    route_for : 'attendance',
    base_url : '/attendance',
    controller_file: 'attendance', 
    api: [
      { 
        url: '/', 
        req_method: 'get',
        auth: true,
        restrict_to:[],
        upload: {},
        image_upload:false,
        save_file_to: '',
        req_body_validation:false,
        filter_reqBody_with:[],
        controller:{
          model: 'attendance',
          crud_method: 'getList',
          common: true
        },
      },
    ],
  },

]