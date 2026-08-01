require("dotenv").config();

console.log(
  "CLOUD NAME:",
  process.env.CLOUDINARY_CLOUD_NAME
);

console.log(
  "API KEY:",
  process.env.CLOUDINARY_API_KEY
);

console.log(
  "API SECRET:",
  process.env.CLOUDINARY_API_SECRET
);

const messageRoutes =
  require("./routes/messageRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const notificationRoutes =
  require("./routes/notificationRoutes");

  const paymentRoutes =
  require("./routes/paymentRoutes");

const protect = require("./middleware/authMiddleware");

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.use(
  "/uploads",
  express.static("uploads")
);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://skillsphere-client-my3i.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

const fs = require("fs");

if (!fs.existsSync("uploads")) {

  fs.mkdirSync("uploads");

}

app.use("/api/messages", messageRoutes);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({
    message: "Backend connected successfully"
  });
});

app.get("/api/protected", protect, (req, res) => {

  res.json({
    message: "Protected route accessed",
    user: req.user
  });

});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});