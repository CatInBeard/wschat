import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import SendForm from "./sendForm";
import {addMessage} from "../reducers/messages"

const Wschat = () => {

    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages.messages)

    let [connectionStatus, setConncetionStatus] = useState("Not set")
    let [socket, setSocket] = useState()

    let pushMessage = (message) => {
        dispatch(addMessage(message))
    }

    let sendAction = (message) => {
        socket.send(JSON.stringify(message))
    }

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/ws")

        socket.addEventListener("open", event => {
            setConncetionStatus("established")
        });

        socket.addEventListener("message", event => {
            let message = JSON.parse(event.data)
            pushMessage(message)
        });
        socket.addEventListener("close", (event) => {
            setConncetionStatus("closed") 
            setTimeout(() => {
                const socket = new WebSocket("ws://localhost:8080/ws")
                setSocket(socket)
            }, 1000)
        });
        setSocket(socket)
    }, []);


    if (messages.length > 0) {
        return <>
            <h2>Messages list:</h2>
            <SendForm sendAction={sendAction} />
            {messages.map((message) => <div className="card mt-2">
                <div className="card-body">
                    {message.text}
                </div>
            </div>
            )}
            <p>Connection status: {connectionStatus}</p>
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