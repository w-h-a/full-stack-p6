let timer

const subscription =
    (dispatch, model) => {
        if (model.notification) {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => dispatch({ type: "CLEAR" }), 5000)
        }
    }

Object.assign(module.exports, { subscription })
