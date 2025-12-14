const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ExpenseSchema = new Schema({
    userId: {
        type: String,
        required: true
        
    },
    name: {
        type: String,
        required: true
    },
    
    category: {
        type: String,
      
        required : true
    },

    amount: {
        type: Number,
        required : true
    }
}, { timestamps: true })

module.exports = mongoose.model("expenseCollection", ExpenseSchema)