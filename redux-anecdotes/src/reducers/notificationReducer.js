const notificationReducer =
    (state = "", action) => {
        switch (action.type) {
            case "PUT_VOTE_SUCCESS": {
                return `you voted for "${action.payload.content}"`
            }
            case "POST_ANECDOTE_SUCCESS": {
                return `you added "${action.payload.content}"`
            }
            case "CLEAR": {
                return ""
            }
            default: {
                return state
            }
        }
    }

export default notificationReducer
