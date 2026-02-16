package handlers

import (
	"encoding/json"
	"net/http"
	"os"
)

func GetDirectory(root string) []string {
	files, err := os.ReadDir(root)
	sl := make([]string, 0)
	if err != nil {
		sl = append(sl, "Error reading directory: "+err.Error())
		return sl
	} 
	for _, file := range files {
			if file.IsDir() {
				sl = append(sl, file.Name())
			}
		}
	return sl
}

func GetLanguagesJSON(root string) ([]byte, error) {
	languages := GetDirectory(root)
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
	w.Write(languages)
}
