require("dotenv").config({ path: __dirname + `/../.env` }); 

const PORT = process.env.PORT
const PASSWORD = process.env.PASSWORD
const USER_NAME = process.env.USER_NAME
const CLUSTER_NAME = process.env.CLUSTER_NAME


module.exports = {
  PORT,
  PASSWORD,
  USER_NAME,
  CLUSTER_NAME,
}