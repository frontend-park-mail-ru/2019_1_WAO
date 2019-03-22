package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func SocketFunc(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool {return true;}
	ws, err := upgrader.Upgrade(w, r, nil)
	if 
}

func MainFunc(w http.ResponseWriter, r *http.Request) {
	// vars := mux.Vars(r)
	// id := vars["id"]
	// tmpl, _ := template.ParseFiles("./templates/index.html")
	// tmpl.Execute(w, "")
	http.ServeFile(w, r, "index.html")
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/", MainFunc)
	router.HandleFunc("/echo", SocketFunc)
	http.Handle("/", router)
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static", fs))
	fmt.Println("Server is listening\n")
	http.ListenAndServe(":8080", nil)
}
