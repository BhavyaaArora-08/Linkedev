const express = require("express");
const connectDB = require("./src/db/mongoose");

const app = express();

// Connect to database
connectDB();

app.get("/", (req, res) => {
  res.send({ msg: "Api Running" });
});

// middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// Define routes
app.use("/api/users", require("./src/routers/api/users"));
app.use("/api/profile", require("./src/routers/api/profile"));
app.use("/api/posts", require("./src/routers/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
