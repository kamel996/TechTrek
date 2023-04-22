import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import bodyParser from "body-parser";

import cors from "cors";

// My server

dotenv.config();
cors();
connectDB();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/api/products", productRoutes);

app.use("/api/login", userRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(5000, console.log(`Server running on port ${PORT}`));
