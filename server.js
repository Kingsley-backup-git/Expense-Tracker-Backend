const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const ExpenseRoutes = require("./routes/expenseRoutes");
const app = express();
app.use(express.json());
const { RateLimiter } = require("./middleware/rateLimiter");
app.use(RateLimiter);
const initCronJobs = require("./services/cron/index")
app.get("/", (req, res) => {
  res.send("Server is awake 😎");
});
app.use("/api", ExpenseRoutes);

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    app.listen(process.env.PORT_NUMBER, () => {
      console.log("connected to mongoose and listening on port 4081");
       initCronJobs();
    });
  })
  .catch((err) => console.log(err));
