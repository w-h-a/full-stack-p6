import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Notification =
    () => {
        const dispatch = useDispatch()
        const notification = useSelector(s => s.notification)
        const style = {
            border: "solid",
            padding: 10,
            borderWidth: 1,
        }

        return (
            <div style={style}>
                {notification}
            </div>
        )
    }

export default Notification
