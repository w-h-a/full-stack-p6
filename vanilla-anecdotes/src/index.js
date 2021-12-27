const { httpRequest } = require("./service")
const { subscription } = require("./subscription")
const { view } = require("./app")
const createElement = require("virtual-dom/create-element")
const diff = require("virtual-dom/diff")
const patch = require("virtual-dom/patch")
const { update } = require("./reducer")
let { model, command } = require("./model")

const render =
    (() => {
        httpRequest(dispatch, command)
        subscription(dispatch, model)
        let currentView = view(dispatch, model)
        let app = createElement(currentView)
        document.getElementById("root").appendChild(app)

        function dispatch(action) {
            const updates = update(action, model)
            const isArray = Array.isArray(updates)
            model = isArray ? updates[0] : updates
            command = isArray ? updates[1] : null
            httpRequest(dispatch, command)
            subscription(dispatch, model)
            const updatedView = view(dispatch, model)
            const patches = diff(currentView, updatedView)
            app = patch(app, patches)
            currentView = updatedView
        }
    })()
