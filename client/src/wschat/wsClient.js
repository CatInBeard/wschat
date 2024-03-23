class WsClient {

    constructor(setConncetionStatus, pushMessage) {
        if (WsClient.instance) {
            return WsClient.instance;
        }
        WsClient.instance = this;
        this.setConncetionStatus = setConncetionStatus
        this.pushMessage = pushMessage
        this.socketConnect()
    }

    send(message){
        this.socket.send(JSON.stringify(message))
    }

    socketConnect() {
        this.socket = new WebSocket("ws://localhost:8080/ws")

        this.socket.addEventListener("open", event => {
            this.setConncetionStatus("established")
        });

        this.socket.addEventListener("message", event => {
            let message = JSON.parse(event.data)
            this.pushMessage(message)
        });
        this.socket.addEventListener("close", (event) => {
            this.setConncetionStatus("closed")
            setTimeout(() => {
                this.socketConnect()
            }, 1000)
        });
    }

}

export default WsClient;