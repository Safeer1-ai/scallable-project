const express = require("express");
const cors = require("cors");
require('dotenv').config();

const uploadRoutes = require("./routes/uploadRoutes");  // 👈 import properly
const commentRoutes = require("./routes/commentRoutes");  // 👈 import properly
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect routes
app.use('/api', uploadRoutes);  // 👈 connect router
app.use('/api/comments', commentRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
