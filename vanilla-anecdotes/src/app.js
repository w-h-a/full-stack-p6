const h = require('virtual-dom/h');

const notification =
    ({ notification }) =>
        h(
            "div",
            {
                style: {
                    border: "solid",
                    padding: "10px",
                    "border-width": "1px"
                }
            },
            notification
        )

const filter =
    dispatch =>
        h(
            "div",
            { style: {"margin-bottom": "10px"} },
            [
                "filter",
                h(
                    "input",
                    { oninput: e => dispatch({ type: "FILTER", payload: e }) }
                )
            ]
        )

const anecdoteList =
    (dispatch, { anecdotes, filter }) =>
        (sorted =>
            sorted.map(a =>
                h(
                    "div",
                    [
                        h(
                            "div",
                            a.content
                        ),
                        h(
                            "div",
                            [
                                `has ${a.votes}`,
                                h(
                                    "button",
                                    { onclick: () => dispatch({ type: "VOTE", payload: a }) },
                                    "vote"
                                )
                            ]
                        )
                    ]
                )
            )
        )(
            anecdotes
                .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
                .sort((x, y) => y.votes - x.votes)
        )

const anecdoteForm =
    dispatch =>
        h(
            "div",
            [
                h("h2", "create new"),
                h(
                    "form",
                    { onsubmit: e => dispatch({ type: "ADD_ANECDOTE", payload: e }) },
                    [
                        h(
                            "div",
                            h("input")
                        ),
                        h(
                            "button",
                            "create"
                        )
                    ]
                )
            ]
        )

const view =
    (dispatch, model) =>
        h(
            "div",
            [
                h("h2", "Anecdotes"),
                notification(model),
                filter(dispatch),
                anecdoteList(dispatch, model),
                anecdoteForm(dispatch)
            ]
        )

Object.assign(module.exports, { view })
