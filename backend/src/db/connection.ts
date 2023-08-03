import { Sequelize } from "sequelize";


const sequelize = new Sequelize({
    username: "postgres",
    password: "20070407",
    host: "localhost",
    database: "imtihon4",
    logging:false,
    dialect: "postgres"
})


!async function () {
    try {
        await sequelize.authenticate()
        console.log("connection");
    } catch (error) {
        console.log("db error", error);

    }
}()

export default sequelize;