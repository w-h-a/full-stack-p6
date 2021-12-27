import anecdoteService from "../services/anecdotes"

const anecdoteReducer =
    (state = [], action) => {
        switch (action.type) {
            case "PUT_VOTE_SUCCESS": {
                return state.map(a => a.id === action.payload.id ? action.payload : {...a})
            }
            case "POST_ANECDOTE_SUCCESS": {
                return [action.payload, ...state]
            }
            case "GET_ANECDOTES_SUCCESS": {
                return action.payload
            }
            default: {
                return state
            }
        }
    }

let timeout

export const addVotes =
    anecdote => {
        if (timeout) {
            clearTimeout(timeout)
        }
        return async dispatch => {
            const afterVote = {...anecdote, votes: anecdote.votes+1 }
            const updatedAnecdote =
                await anecdoteService.putVote(afterVote)
            dispatch({
                type: "PUT_VOTE_SUCCESS",
                payload: updatedAnecdote,
            })
            timeout = setTimeout(() => dispatch({ type: "CLEAR" }), 5000)
        }
    }

export const addNew =
    content => {
        if (timeout) {
            clearTimeout(timeout)
        }
        return async dispatch => {
            const newAnecdote =
                await anecdoteService.createNew(content)
            dispatch({
                type: "POST_ANECDOTE_SUCCESS",
                payload: newAnecdote,
            })
            timeout = setTimeout(() => dispatch({ type: "CLEAR" }), 5000)
        }
    }

export const getAnecdotes =
    () =>
        async dispatch => {
            const anecdotes =
                await anecdoteService.getAll()
            dispatch({
                type: "GET_ANECDOTES_SUCCESS",
                payload: anecdotes,
            })
        }

export default anecdoteReducer
