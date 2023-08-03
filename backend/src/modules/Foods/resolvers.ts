import Food from "../../models/Food";
import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'graphql-upload-ts';
import { resolve } from "path"
import jwt from "../../utils/jwt";

export default {
    Query: {
        foods: async (_, { res_id }) => await Food.find({ res_id }).populate({ path: 'res_id' }),
        foodAll: async () => await Food.find().populate("res_id")

    },
    Mutation: {
        createFood: async (_, { food_name, food_price, food_image, res_id }, { token }) => {
            const admin_id = jwt.verify(token)

            if (!admin_id) {
                throw new Error("Invalid token")
                
            }
            let { filename, createReadStream } = await food_image
            filename = Date.now() + filename.replace(/\s/g, '')
            const createfood = await Food.create({ food_name, food_price, food_image: filename, res_id })
            if (!createfood) {
                return { success: false, message: "Error: Create qilishda xatolik mavjud", data: [] }
            }
            const stream = createReadStream()
            const out = createWriteStream(resolve("uploads", filename))
            stream.pipe(out)
            return { success: true, message: "create food", data: createfood }
        },
        updateFood: async (_, { food_name, id }, { token }) => {

            const admin_id = jwt.verify(token)

            if (!admin_id) {
                throw new Error("Invalid token")
            }
            const updatefood = await Food.findByIdAndUpdate(id, { food_name })
            if (!updatefood) {
                throw new Error("Update Food qilishda xatolik mavjud")
                
            }
            return "success updated food_name"
        },
        deletedFood: async (_, { id }, { token }) => {
            const admin_id = jwt.verify(token)

            if (!admin_id) {
                throw new Error("Invalid token")
                
            }
            const deletedfood = await Food.findByIdAndDelete(id)
            if (!deletedfood) {
                throw new Error("Delete Food qiishda xatolik mavjud")
            }
            return "success deleted food"
        }
    },
    Upload: GraphQLUpload
}