import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("Unable to connect error " + err);
  });

const app = express();

const PORT = "3000";

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT} `);
});

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});