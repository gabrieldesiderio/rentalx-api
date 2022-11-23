import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: [
    `${__dirname}/migrations/*.ts`
  ],
  entities: [
    `${__dirname}/../../../modules/**/infra/typeorm/entities/*.ts`
  ]
})

export function createConnection(host = 'database'): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource

