import React from 'react';
import Input from '../form/input';
import Button from '../form/button';

const LeftContent = ({ value, setValue, errorMsg, handleEvent }) => {
    return (
        <div class="left-content">
            <div class="url-shortner-wrapper">
                <div class="url-shotner">
                    <span><i></i> Enter long URL to make it short URL</span>
                    <Input type="text" cls="input" value={value} setValue={setValue} />
                    {errorMsg ? <span style={{ "color": "red", marginBottom: "5px", "width": "100%" }}>{errorMsg}</span> : ""}
                    <Button text="Short it!" cls="btn-primary" handleEvent={handleEvent} />
                </div>
            </div>
        </div>
    )
}

export default LeftContent