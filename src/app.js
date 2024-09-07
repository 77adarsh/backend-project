import express from "express"
import cores from "cores"
import cookieParser from "cookie-parser"

const app = express()

app.use(cores({
    origin: process.env.CORES_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

export { app }