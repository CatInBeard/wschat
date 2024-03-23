import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import SendForm from "./sendForm";
import { addMessage } from "../reducers/messages"
import WsClient from "./wsClient"

const Wschat = () => {

    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages.messages)

    let [connectionStatus, setConncetionStatus] = useState("Not set")
    let [wsClient, setWsClient] = useState(null)


    let pushMessage = (message) => {
        dispatch(addMessage(message))
    }

    useEffect(() => {
        if (!wsClient) {
            setWsClient(new WsClient(setConncetionStatus, pushMessage))
        }
    }, [])

    let sendAction = (message) => {
        wsClient.send(message)
    }



    if (messages.length > 0) {
        return <>
            <h2>Messages list:</h2>
            <SendForm sendAction={sendAction} />
            <p>Connection status: {connectionStatus}</p>
            {messages.map((message) => <div className="card mt-2">
                <div className="card-header">
                    {message.date}
                </div>
                <div className="card-body">
                    <p class="card-text">
                        {message.text}
                    </p>
                </div>
            </div>
            )}
        </>;
    }
    else {
        return <>
            <h2>Messages list is empty</h2>
            <SendForm sendAction={sendAction} />
            <p>Connection status: {connectionStatus}</p>
        </>;
    }


}

export default Wschat;