import React from 'react'
import '../css/order.css'
const OrderedList = ({ shorturls }) => {
    return (
        <div style={Styled.listwrapper}>
            <div>
                <h4 style={{ marginTop: "10px" }}>List of Short Urls</h4>
                <ol>
                    {shorturls && shorturls.length > 0 ? shorturls.map((url, index) => {
                        return <li key={index}><a href={url}>{url}</a></li>
                    }) : ""}
                </ol>
            </div>
        </div>
    )
}
const Styled = {
    listwrapper: {
        "display": "flex",
        "justify-content": "center"
    }
}
export default OrderedList