const express = require('express')
const app = express()
const cors = require('cors')

const {resolve} = require('path')

const Post = require("./src/router/post")
const Get = require("./src/router/get")
const Put = require("./src/router/put")

const {sender} = require("./src/helper/response")

app.use(express.static(resolve(__dirname, 'img')))
app.use(express.json())
app.use(cors())

app.use("/v1/api", Get)
app.use("/v1/api", Post)
app.use("/v1/api", Put)

app.all("*", (_,res)=>{sender(res,404,"Endpoint not found!")})

app.listen(5555)