const mongoose = require('mongoose')
const { models_ref } = require('../../models/models_ref')
const catchAsync = require('../../features/catchAsync');
const app_error_feedback = require('../../err_handling/app_error_feedback');
const { common_controller } = require('../common_controllers')
const WEBSOCKET = require('../../socket/socket');
const { validate_mongoose_schema_byJoi } = require('../../middle_wares/customize_process_req').customize_process_req();

exports.register_pateint = catchAsync(async(req,res,next)=>{
    const { pateint, emergency_contact, invoice } = req.body;

    // since this route is auth protected find the user from the token
    const user = req.user;
    pateint.MRN = (await models_ref.pateint.model.find()).length + 1;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        await validate_mongoose_schema_byJoi(pateint,models_ref.pateint.schema,'pateint',next)
        const pateint_obj = await models_ref.pateint.model.create([pateint], { session });
        const pateint_archive_obj = await await models_ref.pateint_archive.model.create([{ pateint: pateint_obj[0]._id }], { session });

        // create emergency contact with ref to pateint_archive
        // since the emergency contact is array validate each arry and create Doc for each emergency contact sent
        for (let i = 0; i < emergency_contact.length; i++) { 
            emergency_contact[i].pateint_archive = `${pateint_archive_obj[0]._id}`
            await validate_mongoose_schema_byJoi(emergency_contact[i],models_ref.emergency_contact.schema,'emergency_contact',next)
            await models_ref.emergency_contact.model.create([emergency_contact[i]], { session });
        }

        // since the invoice is array create invoice for each invoice sent
        for (let i = 0; i < invoice.length; i++) {
            await models_ref.invoice.model.create([{
                issued_at_price:invoice[i].payment_amount,
                custom_invoice :invoice[i]._id,
                createdBy:user._id,
                destination: pateint_obj[0].invoice_destination,
                pateint_archive: pateint_archive_obj[0]._id,
                insurance: pateint_obj[0].invoice_destination === 'insurance' ? pateint_obj[0].insurance_company : null
            }], { session });
        }

        res.status(200).json({ 
            status: 'success', 
            data: pateint_obj
        });
        await session.commitTransaction();

    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();        
    }
})