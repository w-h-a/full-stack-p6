const httpRequest =
    (dispatch, command) => {
        if (!command) return
        const { request } = command
        const xhr = new XMLHttpRequest()
        xhr.open(request.method, request.url)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.responseType = "json"
        xhr.send(request.body)
        xhr.onload =
            () =>
                dispatch(command.successMsg(xhr.response))
    }

const baseURL = "http://localhost:3001/anecdotes"

const getAnecdotes =
    () =>
        ({
            request: {
                url: baseURL,
                method: "GET"
            },
            successMsg: res => ({ type: "GET_ANECDOTES_SUCCESS", payload: res })
        })

const postAnecdote =
    anecdote =>
        ({
            request: {
                url: baseURL,
                method: "POST",
                body: JSON.stringify(anecdote)
            },
            successMsg: res => ({ type: "POST_ANECDOTE_SUCCESS", payload: res })
        })

const putVote =
    anecdote =>
        ({
            request: {
                url: `${baseURL}/${anecdote.id}`,
                method: "PUT",
                body: JSON.stringify(anecdote)
            },
            successMsg: res => ({ type: "PUT_VOTE_SUCCESS", payload: res })
        })

const toExport = {
    httpRequest,
    getAnecdotes,
    postAnecdote,
    putVote,
}

Object.assign(module.exports, toExport)
