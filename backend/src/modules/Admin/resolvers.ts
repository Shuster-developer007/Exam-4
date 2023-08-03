import Admin from "../../models/Admin"
import jwt from "../../utils/jwt"

export default {
    Mutation: {
        login: async (_, { admin_name, admin_password }) => {
            const findAdmin = await Admin.findOne({ admin_name, admin_password  })
            console.log(findAdmin);
            
            if (!findAdmin) {
                throw new Error("User Not Found")
            }
            return { success: true, message: "ok", data: findAdmin , token: jwt.sign({id: findAdmin.id}) }
        },
        createAdmin:async (_ , {admin_name , admin_password}) => {
            const create = await Admin.create({admin_name , admin_password})
            return "created"
        }
    }
}