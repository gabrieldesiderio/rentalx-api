import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })