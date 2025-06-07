const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const issueRoutes = require("./routes/issueRoutes.");
const projectRoutes = require("./routes/projectRoutes");
const membersRoutes = require("./routes/memberRoutes")
require("dotenv").config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

db();

app.use("/api/issues", issueRoutes);
app.use("/api/project", projectRoutes);
app.use("api/member",membersRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
