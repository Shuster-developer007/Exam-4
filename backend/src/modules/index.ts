import { makeExecutableSchema } from "@graphql-tools/schema"
import Adminschema from "./Admin/index"
import Restaurantschema from "./Restaurant/index"
import Foodschema from "./Foods/index"
import OrderSchema from "./Orders/index"


export default makeExecutableSchema({
    typeDefs: [Adminschema.typeDefs, Restaurantschema.typeDefs, Foodschema.typeDefs, OrderSchema.typeDefs],
    resolvers: [Adminschema.resolvers, Restaurantschema.resolvers, Foodschema.resolvers, OrderSchema.resolvers]
})