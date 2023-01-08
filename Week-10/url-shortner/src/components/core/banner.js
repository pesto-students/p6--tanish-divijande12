import { React, useState, useContext } from 'react';
import { ValidURL } from '../../utils/utils';
import ClipLoader from "react-spinners/ClipLoader";
import LeftContent from '../layout/left';
import { Context } from '../../utils/context';
function Banner() {
    const [shorturls, setShorturls] = useContext(Context);
    const [value, setValue] = useState("")
    const [errorMsg, setErrorMsg] = useState('')
    let [loading, setLoading] = useState(false);

    const handleEvent = async () => {
        const isValid = ValidURL(value);

        if (isValid) {
            setLoading(true)
            const response = await fetch('https://api.shrtco.de/v2/shorten?url=' + value);
            const data = await response.json();
            if (data) {
                console.log(data)
                setValue("")
                setLoading(false)
                setShorturls([...shorturls, data.result["short_link"]])
            }

        } else {
            setErrorMsg(" Enter a valid url. ")
        }
    }

    return (
        <>
            <div class="url-input">
                <LeftContent value={value} setValue={setValue} handleEvent={handleEvent} errorMsg={errorMsg} />
            </div>
            {loading ? <div style={Styled.spinner}>
                <ClipLoader
                    color="#FFF"
                    loading={loading}
                    //cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div> : ""}
        </>
    )
}
const Styled = {
    spinner: {
        position: "absolute",
        background: "black",
        color: "#fff",
        width: "100%",
        top: 0,
        height: "100%",
        opacity: "63%",
        display: "flex",
        "justify-content": "center",
        "align-items": "center"
    }
}
export default Banner