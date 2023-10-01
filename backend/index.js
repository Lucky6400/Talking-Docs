// Node.js Express Backend
const express = require('express');
const app = express();
const port = 3000;
const uploadRouter = require("./routes/upload")
const cors = require('cors');
const dotenv = require('dotenv');
const { db } = require('./utils/db');
const authRouter = require('./routes/auth');
const pdfRouter = require('./routes/pdf');
const chatRouter = require('./routes/chat');

dotenv.config()
app.use(cors());
app.use(express.json());

db();

app.use("/api", uploadRouter)
app.use("/api", authRouter)
app.use("/api", pdfRouter)
app.use("/api", chatRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});