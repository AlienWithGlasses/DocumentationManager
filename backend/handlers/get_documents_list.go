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
  Metadata Metadata `json:"metadata,omitempty" yaml:"metadata,omitempty"`
  FunctionData []FunctionData `json:"functions,omitempty" yaml:"functions,omitempty"`
  Content       string         `json:"content,omitempty" yaml:"-"`  // ← ADD THIS LINE
}
type Metadata struct {
  LastModified string `json:"lastModified" yaml:"lastModified"`
  PackagePath string `json:"packagePath" yaml:"packagePath"`
  Version string `json:"version" yaml:"version"`
}
type FunctionData struct {
  Name string `json:"name" yaml:"name"`
  Signature string `json:"signature" yaml:"signature"`
  Description string `json:"description" yaml:"description"`
}

var cachedDocs map[string]Document
func LoadSingleDocument(filepath string) (*Document, error) {
    var doc Document
    
    // Read file
    data, err := os.ReadFile(filepath)
    if err != nil {
        return nil, fmt.Errorf("Error reading file %s: %w", filepath, err)
    }
    
    // Split frontmatter and content
    content := string(data)
    parts := strings.Split(content, "---")
    if len(parts) < 3 {
        return nil, fmt.Errorf("Invalid frontmatter format in file %s", filepath)
    }
    
    // Parse YAML frontmatter
    frontmatter := strings.TrimSpace(parts[1])
    err = yaml.Unmarshal([]byte(frontmatter), &doc)
    if err != nil {
        return nil, fmt.Errorf("Error parsing YAML: %w", err)
    }
    
    // Get markdown content
    markdownContent := strings.TrimSpace(parts[2])
    doc.Content = markdownContent
    
    return &doc, nil
}
func GetDocumentListStructured(docs []string) ([]Document, error) {
    cachedDocs = make(map[string]Document)
    docsList := make([]Document, 0)
    
    for _, file := range docs {
        // Load single document (reusable function!)
        doc, err := LoadSingleDocument(file)
        if err != nil {
            return nil, err  // Error already has filepath info
        }
        
        // Cache it
        key := fmt.Sprintf("%s/%s/%s", doc.Language, doc.Type, doc.ID)
        cachedDocs[key] = *doc
        
        // Add to list
        docsList = append(docsList, *doc)
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