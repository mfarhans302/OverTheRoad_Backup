const reportsRouter = require("express").Router()
const { verifyAccessToken } = require("../middlewares/auth.js")
const { expensesReport } = require("../controllers/reportsController.js")

reportsRouter.get("/expenses", verifyAccessToken, expensesReport)

module.exports = reportsRouter