package handlers

import (
	"fmt"
	"net/http"
	"encoding/json"
)

func GetDocumentData(language, docType, docID string) (*Document, error) {
    key := fmt.Sprintf("%s/%s/%s", language, docType, docID)
    
    // Check cache first
    doc, exist := cachedDocs[key]
    if exist {
        return &doc, nil
    }
    
    // Not in cache - load it using our reusable function!
    filepath := fmt.Sprintf("data/%s/%s/%s.md", language, docType, docID)
    doc2, err := LoadSingleDocument(filepath)
    if err != nil {
        return nil, fmt.Errorf("document not found: %s", key)
    }
    
    // Cache it
    if cachedDocs == nil {
        cachedDocs = make(map[string]Document)
    }
    cachedDocs[key] = *doc2
    
    return doc2, nil
}

func GetDocumentDataAPI(w http.ResponseWriter, r *http.Request){
	language := r.PathValue("language")
	docType := r.PathValue("doc_type")
	docID := r.PathValue("doc_id")
	doc, err := GetDocumentData(language, docType, docID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(doc)
}