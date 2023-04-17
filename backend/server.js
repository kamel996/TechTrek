import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productsRoutes.js";

// My server

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/api/products", productRoutes);

app.listen(5000, console.log(`Server running on port ${PORT}`));
