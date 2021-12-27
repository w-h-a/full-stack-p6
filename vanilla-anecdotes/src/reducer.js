const { postAnecdote, putVote } = require("./service")

const update =
    (action, model) => {
        switch (action.type) {
            case "FILTER": {
                return {
                    ...model,
                    filter: action.payload.target.value
                }
            }
            case "VOTE": {
                return [
                    {...model, notification: `you have voted for "${action.payload.content}"`},
                    putVote({ ...action.payload, votes: action.payload.votes+1 })
                ]
            }
            case "ADD_ANECDOTE": {
                action.payload.preventDefault()
                const content = action.payload.target[0].value
                action.payload.target.reset()
                return [
                    {...model, notification: `you have added "${content}"`},
                    postAnecdote({ content: content, votes: 0 })
                ]
            }
            case "CLEAR": {
                return {...model, notification: ""}
            }
            case "PUT_VOTE_SUCCESS": {
                return {
                    ...model,
                    anecdotes: model.anecdotes.map(a => a.id === action.payload.id ? action.payload : a)
                }
            }
            case "POST_ANECDOTE_SUCCESS": {
                return {
                    ...model,
                    anecdotes: [ action.payload, ...model.anecdotes ]
                }
            }
            case "GET_ANECDOTES_SUCCESS": {
                return {
                    ...model,
                    anecdotes: action.payload
                }
            }
            default: {
                return model
            }
        }
    }

Object.assign(module.exports, { update })
