import express from "express";
import cors from "cors";
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.listen(8800);