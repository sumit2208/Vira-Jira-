const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Issue = require("./models/issue");
const db = require("./config/db");
const issueRoutes = require("./routes/issueRoutes.")
require("dotenv").config();
const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // allow frontend origin
    credentials: true               // if you're using cookies
  }));
app.use(express.json());
 
db()

app.use("/api/issues", issueRoutes);
 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
