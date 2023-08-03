import { Schema, model, Types } from "mongoose";


interface RestaurantI {
    res_name: string,
    file: string
    created_at: string
}



const RestaurantSchema = new Schema<RestaurantI>({
    res_name: {
        type: String,
        minlength: 2,
        required: true,

    },
    file: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true
    })


export default model('Restaurant', RestaurantSchema)