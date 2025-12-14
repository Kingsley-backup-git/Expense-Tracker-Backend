const express = require("express")

const route = express.Router()
const {AddExpense, getSummary, getTransactions} = require("../controllers/expenseController")
route.post("/add-expense/:userId", AddExpense)
route.get("/summary/:userId", getSummary)
route.get("/transactions/:userId", getTransactions)
module.exports = route