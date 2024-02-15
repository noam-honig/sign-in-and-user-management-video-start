// src/server/index.ts

import express from "express"
import { api } from "./api"
import { auth } from "./auth"

import session from "cookie-session"
import compression from "compression"
import path from "path"

const app = express()
app.use(
  session({
    secret: process.env["SESSION_SECRET"] || "my secret",
  })
)
app.use(compression())
app.use(auth)

app.use(api)
app.use(express.static(path.join(__dirname, "../")))
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "../", "index.html"))
})

app.listen(process.env["PORT"] || 3002, () => console.log("Server started"))
