import React from 'react';
import Input from '../form/input';
import Button from '../form/button';

const LeftContent = ({ value, setValue, errorMsg, handleEvent }) => {
    return (
        <div class="left-content">
            <div class="url-shortner-wrapper">
                <div class="url-shotner">
                    <span><i></i> Enter a long URL to make a TinyURL</span>
                    <Input type="text" cls="input" value={value} setValue={setValue} />
                    {errorMsg ? <span style={{ "color": "red", marginBottom: "5px", "width": "100%" }}>{errorMsg}</span> : ""}
                    <Button text="Make URL Short!" cls="btn-primary" handleEvent={handleEvent} />
                </div>
                <div class="url-subtext">
                    <p>By clicking Make Long URL Short, I agree to the Terms of Service, Privacy policy and Use of Cookies.</p>
                </div>
            </div>
        </div>
    )
}

export default LeftContent