const filterReducer =
    (state = "", action) => {
        switch (action.type) {
            case "FILTER": {
                return action.payload.target.value
            }
            default: {
                return state
            }
        }
    }

export default filterReducer
