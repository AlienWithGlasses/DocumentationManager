package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func GetLanguages(root string) []string {
	files, err := os.ReadDir(root)
	sl := make([]string, 0)
	if err == nil {
		for _, file := range files {
			if file.IsDir() {
				sl = append(sl, file.Name())
			}
		}
	}
	return sl
}

func GetLanguagesJSON(root string) ([]byte, error) {
	languages := GetLanguages(root)
	return json.Marshal(languages)
}


func GetLanguagesAPI(w http.ResponseWriter, r *http.Request) {
	
	root := "data"
	languages, err := GetLanguagesJSON(root)
	if err != nil {
		// Handle error, e.g., log it or return an error response
		return
	}
	if r.Method != http.MethodGet {
		w.WriteHeader (http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	fmt.Println(string(languages))
	w.Write(languages)
}
