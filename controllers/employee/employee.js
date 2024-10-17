const mongoose = require('mongoose')
const { models_ref } = require('../../models/models_ref')
const catchAsync = require('../../features/catchAsync');
const app_error_feedback = require('../../err_handling/app_error_feedback');
const { common_controller } = require('../common_controllers')
const WEBSOCKET = require('../../socket/socket');
const { validate_mongoose_schema_byJoi } = require('../../middle_wares/customize_process_req').customize_process_req();

exports.register_employee = catchAsync(async(req,res,next)=>{
    console.log('employee register');
    const { sym_user,...credentials } = req.body;
    // since the route is auth proteced
    const user = req.user;
    console.log(user);

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        // create employee
        // we need to await the validate_mongoose_schema_byJoi result

        await validate_mongoose_schema_byJoi({...credentials,createdBy: `${user._id}`},models_ref.employee.schema,'employee',next)
        const employee = await models_ref.employee.model.create([{...credentials,createdBy: `${user._id}`}], { session });
        // create employee archive with employee filed of value 
        const employee_archive = await models_ref.employee_archive.model.create([{ employee: employee[0]._id,createdBy: `${user._id}` }], { session });
        // if the employee uses system create user with the emloyee fields
        let system_user;
        if( employee[0].system_user &&  sym_user) {
            await validate_mongoose_schema_byJoi({...sym_user, role: employee[0].department },models_ref.user.schema,'user',next)
            system_user = await models_ref.user.model.create([{...sym_user, role: employee[0].department }], { session });
        }

        await session.commitTransaction();

        res.status(200).json({ 
            status: 'success', 
            data: {employee,employee_archive,system_user}
        });
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();        
    }
})