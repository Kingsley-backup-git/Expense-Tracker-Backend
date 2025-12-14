const expenseCollection = require("../models/expense");
async function AddExpense(req, res) {
  try {
    const { name, amount, category } = req.body;
    const { userId } = req.params;

    if (!name || !amount || !category || !userId) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    const expense = new expenseCollection({
      name,
      amount,
      category,
      userId,
    });

    await expense.save();

    return res.status(200).json({ data: expense });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server error"});
  }
}



async function getSummary(req, res) {
  try {

    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User Id is required" });
    }

     const summary = await expenseCollection.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $group: {
          _id: "$userId",
          balance: { $sum: "$amount" },
          income: {
            $sum: {
              $cond: [{ $eq: ["$category", "income"] }, "$amount", 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$category", "expense"] }, "$amount", 0],
            },
          },
        },
      },
    ]);

  const result = summary[0] || {
      balance: 0,
      income: 0,
      expense: 0,
    };


    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server error"});
  }
}



async function getTransactions(req, res) {
  try {

    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "All Fields are required" });
    }

      const expenses = await expenseCollection.find({ userId })

      if (!expenses) {
           return res.status(404).json({ message: "No expenses found" });
      }
      
    return res.status(200).json({ data: expenses });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server error"});
  }
}



async function deleteTransaction(req, res) {
  try {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "All Fields are required" });
    }

      const expense = await expenseCollection.findByIdAndDelete(id)

      if (!expense) {
           return res.status(404).json({ message: "No expenses found" });
      }
      
    await expense.save()
    return res.status(204).json({ data: expense });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server error"});
  }
}

module.exports = {
    AddExpense,
    getSummary,
  getTransactions,
    deleteTransaction
};
