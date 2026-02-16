package main

import (
	"DocumentationManager/handlers"
	"net/http"
	"log"
)

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3500")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}
func main() {

	mux := http.NewServeMux()
	mux.HandleFunc("/api/languages", handlers.GetLanguagesAPI)
	// http.ListenAndServe(":9000", withCORS(mux))

	log.Println("API running on :9000")
	log.Fatal(http.ListenAndServe(":9000", withCORS(mux))) // ✅ wrap mux
}
