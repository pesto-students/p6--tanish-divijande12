import React from 'react'

function Button({ handleEvent, cls, text }) {
    return (
        <button
            onClick={handleEvent}
            className={cls}>{text}</button>
    )
}

export default Button