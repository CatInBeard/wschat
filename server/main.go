package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type ClientManager struct {
	clients   map[*websocket.Conn]struct{}
	broadcast chan []byte
}

func NewClientManager() *ClientManager {
	manager := &ClientManager{
		clients:   make(map[*websocket.Conn]struct{}),
		broadcast: make(chan []byte),
	}

	go manager.run()
	return manager
}

func (manager *ClientManager) run() {
	for {
		select {
		case message := <-manager.broadcast:
			for client := range manager.clients {
				if err := client.WriteMessage(websocket.TextMessage, message); err != nil {
					log.Println("Error broadcasting message:", err)
				}
			}
		}
	}
}

func (manager *ClientManager) handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Panic("Upgrade failed:", err)
		http.Error(w, "WebSocket upgrade failed, try to use websocat", http.StatusBadRequest)
		return
	}
	defer ws.Close()

	manager.clients[ws] = struct{}{}

	for {
		_, message, err := ws.ReadMessage()
		if err != nil {
			log.Panic(err)
			break
		}
		log.Printf("Received: %s", message)

		manager.broadcast <- message
	}

	delete(manager.clients, ws)
}

func main() {
	manager := NewClientManager()

	http.HandleFunc("/ws", manager.handleConnections)
	log.Println("http server started on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
