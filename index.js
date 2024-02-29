import express from "express";
import AppRoutes from "./src/routes/index.js";
import cors from "cors";
const PORT = 9000
const app = express()
app.use(cors())
app.use(express.json())
app.use(AppRoutes)

app.listen(PORT,()=>console.log(`app is running in ${PORT}`))