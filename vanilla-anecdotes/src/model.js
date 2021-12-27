const { getAnecdotes } = require("./service")

const model = {
    anecdotes: [],
    notification: "",
    filter: "",
}

const command = getAnecdotes()

Object.assign(module.exports, { model, command })
