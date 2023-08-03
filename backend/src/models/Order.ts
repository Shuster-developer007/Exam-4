import { Schema, model, Types } from "mongoose";


interface OrderI {
    username: string,
    phone: string,
    count: string,
    foodId: Types.ObjectId,
    tasdiqlanish: boolean
}



const OrderSchema = new Schema<OrderI>({
    username: {
        type: String,
        minlength: 2,
        required: true,

    },
    phone: {
        type: String,
        required: true
    },
    count: {
        type: String,
        required: true
    },
    foodId: [
        {
            type: Types.ObjectId,
            ref: "Food"
        }
    ],
    tasdiqlanish: {
        type: Boolean,
        required: true
    }

},
    {
        versionKey: false,
        timestamps: true
    })


export default model('Order', OrderSchema)