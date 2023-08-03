import { Schema, model , Types } from "mongoose";


interface AdminI {
    admin_name:string,
    admin_password:string
}



const AdminSchema = new Schema<AdminI>({
    admin_name: {
        type: String,
        minlength: 2,
        required: true,

    },
    admin_password: {
        type:String,
        minlength:5,
        required:true
    }
},
    {
        versionKey: false,
        timestamps: true
    })


export default model('Admin', AdminSchema)