import React from 'react'

function Input({ type, cls, value, setValue }) {
    return (
        <input
            type={type}
            className={cls}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default Input