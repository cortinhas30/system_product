import express from "express";
import cors from "cors";
import userRoutes from "./routes/product.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

console.log("api executando http://localhost:8800");

app.listen(8800);