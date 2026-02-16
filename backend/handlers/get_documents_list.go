package handlers

/* SAMPLE OUTPUT FOR GETTING DOCUMENTS LIST
BASICS:
[
  {
    "id": "getting-started",
    "title": "Getting Started",
    "description": "Introduction to Go programming",
    "type": "basics",
    "language": "go",
    "order": 1
  },
  {
    "id": "variables",
    "title": "Variables and Types",
    "description": "Understanding Go variables and type system",
    "type": "basics",
    "language": "go",
    "order": 2
  }
]

PACKAGES:
  {
    "id": "fmt",
    "title": "fmt",
    "description": "Package fmt implements formatted I/O",
    "type": "packages",
    "language": "go",
    "functionCount": 25,
    "order": 1
  },
  {
    "id": "http",
    "title": "net/http",
    "description": "Package http provides HTTP client and server implementations",
    "type": "packages",
    "language": "go",
    "functionCount": 87,
    "order": 2
  }
]
*/

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"

	"gopkg.in/yaml.v3"
)

func GetFiles(root string) ([]string,error) {
	files, err := os.ReadDir(root)
	sl := make([]string, 0)
	if err != nil {
		return nil, fmt.Errorf("Error reading directory: %w", err)
	} 
	for _, file := range files {
			if !file.IsDir() {
				sl = append(sl, root+"/"+file.Name())
			}
		}
	return sl,nil
}

func GetDocumentList(language, doc_type, root string) [] string{
	files, err := GetFiles(root + "/" + language + "/" + doc_type)
	if err != nil {
		return []string{err.Error()}
	}
	return files
}

/* I got side tracked this returns a list of document names instead of the agreed upon structure
make a struct then read every file individually to fill the struct then return a json with that struct
first make a slice to store the structs and append them 
*/
type Document struct {
  ID string `json:"id" yaml:"id"`
  Title string `json:"title" yaml:"title"`
  Description string `json:"description" yaml:"description"`
  Type string `json:"type" yaml:"type"`
  Language string `json:"language" yaml:"language"`
  Order int `json:"order" yaml:"order"`
  FunctionCount int `json:"functionCount,omitempty" yaml:"functionCount,omitempty"`
}
func GetDocumentListStructured(docs []string) ([]Document, error) {
  docsList := make([]Document, 0)
  for _, file := range docs {
    var doc Document
    data, err := os.ReadFile(file)
    if err != nil{
      return nil, fmt.Errorf("Error reading file %s: %w", file, err)
    }
    content := string(data)
    parts := strings.Split(content, "---")
    if len(parts) <3{
      return nil, fmt.Errorf("Invalid frontmatter format in file %s", file)
    }
    frontmatter := parts[1]
    frontmatter = strings.TrimSpace(frontmatter)
    err = yaml.Unmarshal([]byte(frontmatter), &doc)
    if err != nil {
      return nil, fmt.Errorf("Error parsing YAML: %w", err)
    }
    docsList = append(docsList, doc)
  }
  return docsList, nil
}


func GetDocumentsAPI(w http.ResponseWriter, r *http.Request){
	language := r.PathValue("language")
	docType := r.PathValue("doc_type")
	root := "data"
	docs := GetDocumentList(language, docType, root)
  structuredDocs, err := GetDocumentListStructured(docs)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(structuredDocs)
}