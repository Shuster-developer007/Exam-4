


import { Schema, model, Types } from "mongoose";


interface FoodI {
    food_name: string,
    food_price: string,
    food_image: string,
    res_id: Types.ObjectId
}



const FoodSchema = new Schema<FoodI>({
    food_name: {
        type: String,
        minlength: 2,
        required: true,

    },
    food_price: {
        type: String,
        required: true
    },
    food_image: {
        type: String,
        required: true
    },
    res_id: [
        {
            type: Types.ObjectId,
            ref: "Restaurant"
        }
    ]
},
    {
        versionKey: false,
        timestamps: true
    })


export default model('Food', FoodSchema)