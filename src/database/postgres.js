import { Pool } from "pg";
const pool = new Pool({
    host: "localhost",
    port: "5432",
    user: "chengli",
    password: "",
    database: "postgres"
})
export default pool