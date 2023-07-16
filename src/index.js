import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import { Todo } from "./models/todo.js"

dotenv.config()

const app = express()
const cfg = {
    node_port: process.env.EXPRESS_PORT || 8001,
    host: process.env.MONGO_INITDB_HOST,
    username: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    db_port: process.env.MONGO_INITDB_PORT,
    database: process.env.MONGO_INITDB_DATABASE,
}


app.use(express.json())
app.use(cors())

app.get("/todos", async (req, res) => {
    const todos = await Todo.find()
    return res.status(200).json({
        todos,
    })
})

app.post("/todos", async (req, res) => {
    const name = req.body.name
    const todo = new Todo({
        name,
    })
    await todo.save()
    res.status(201).json({ message: "Goal saved", todo })
})

app.put("/todos/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    todo.completed = !todo.completed

    await todo.save()

    return res.status(201).json({ message: "Todo saved", todo })
})

app.delete("/todos/:id", async (req, res) => {
    await Todo.deleteOne({
        id: req.params.id,
    })

    return res.status(201).json({ message: "Todo deleted" })
})

mongoose.set('strictQuery', false)

const connectString = `mongodb://${ cfg.username }:${ cfg.password }@${ cfg.host }:${ cfg.db_port }/${ cfg.database }?authSource=admin`
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(connectString, connectOptions)
.then( () => {
    console.log("Connected to MongoDB")
    app.listen(cfg.node_port, () => {
        console.log(`Now listening on PORT ${ cfg.node_port }`)
    })
})
.catch( (err) => {
    console.log("Unable to connect to MongoDB with a string:")
    console.log(connectString)
        console.log(err)
    }
)
