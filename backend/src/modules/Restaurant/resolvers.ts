import Restaurant from '../../models/Restaurant';
import { GraphQLUpload } from 'graphql-upload-ts';
import { createWriteStream } from 'fs'
import { resolve } from 'path';
import jwt from '../../utils/jwt';


export default {
    Query: {
        restaurant: async () => await Restaurant.find()
    },
    Mutation: {
        // Create Restaurant 
        createRes: async (_, { res_name, file }, { token }) => {
            const admin_id = jwt.verify(token)
             
            if (!admin_id) {
                throw new Error("Invalid token")
                
            }
            let { filename, createReadStream } = await file
            filename = Date.now() + filename.replace(/\s/g, '')
            const created_at = new Date()
            const createRestaurant = await Restaurant.create({ res_name, file: filename, created_at: created_at })
            if(!createRestaurant) {
                return {success:false , message: "Error: Create Restaurant qilishda xatolik mavjud." , data:[]}
            }
            const stream = createReadStream()
            const out = createWriteStream(resolve("uploads", filename))
            stream.pipe(out)
            return { success: true, message: "create restaurant", data: createRestaurant }
        },
        // Update Restaurant
        updateRes: async (_, { res_name, id }, { token }) => {
            const admin_id = jwt.verify(token)
             
            if (!admin_id) {
                throw new Error("Invalid token")
            }
            const updateRestaurant = await Restaurant.findByIdAndUpdate(id, { res_name })
            if (!updateRestaurant) {
                throw new Error("Restaurantni update qilishda xatolik mavjud")
                
            }
            return "success updated restaurant name"
        },
        deletedRes: async (_, { id }, { token }) => {
            if (!token) {
                throw new Error("token required")
            }

            const deletedRes = await Restaurant.findByIdAndDelete(id)
            if (!deletedRes) {
                throw new Error("Delete Restaurant qilishda xatolik mavjud")
                
            }
            return "success deleted restaurant"
        }
    },
    Upload: GraphQLUpload
}