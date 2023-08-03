import Order from "../../models/Order";
import jwt from "../../utils/jwt";


export default {
    Query: {
        orders: async () => {
            const orders = await Order.find().populate({ path: "foodId", select: ['food_name'] })
            return orders
        }
    },
    Mutation: {
        createOrder: async (_, { username, phone, count, foodId }) => {
            const number = /^9989[012345789][0-9]{7}$/

            if (!number.test(phone)) {
                throw new Error("Invalid phone number")
            }
            const createOrder = await Order.create({ username, phone, count, foodId, tasdiqlanish: false })
            if (!createOrder) {
                throw new Error("Zakaz qilishda xatolik mavjud")
                
            }
            return { success: true, message: "Zakaz qilindi", data: createOrder }
        },
        tasdiqlashOrder: async (_, { _id }, { token }) => {
            const admin_id = jwt.verify(token)

            if (!admin_id) {
                throw new Error("Invalid token ")
                
            }
            let updateorder = await Order.findOne({ _id, tasdiqlanish: false })
            if (!updateorder) {
                return { success: false, message: "Bu order avvaldan tasdiqlangan", data: {} }
            }
            const id = updateorder._id
            let updateor = await Order.findByIdAndUpdate({ _id: id }, { tasdiqlanish: true })
            return { success: true, message: "Success updated Order", data: updateor }
        }
    }
}