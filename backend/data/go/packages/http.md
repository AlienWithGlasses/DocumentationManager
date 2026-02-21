---
id: http
title: net/http
description: Package http provides HTTP client and server implementations.
type: packages
language: go
functionCount: 87
order: 2
functions:
  - name: HandleFunc
    signature: "func HandleFunc(pattern string, handler func(ResponseWriter, *Request))"
    description: HandleFunc registers the handler function for the given pattern in the DefaultServeMux.
  - name: Handle
    signature: "func Handle(pattern string, handler Handler)"
    description: Handle registers the handler for the given pattern in the DefaultServeMux.
  - name: ListenAndServe
    signature: "func ListenAndServe(addr string, handler Handler) error"
    description: ListenAndServe listens on the TCP network address addr and then calls Serve with handler to handle requests on incoming connections.
  - name: ListenAndServeTLS
    signature: "func ListenAndServeTLS(addr string, certFile string, keyFile string, handler Handler) error"
    description: ListenAndServeTLS acts identically to ListenAndServe, except that it expects HTTPS connections.
  - name: NewServeMux
    signature: "func NewServeMux() *ServeMux"
    description: NewServeMux allocates and returns a new ServeMux.
  - name: Get
    signature: "func Get(url string) (resp *Response, err error)"
    description: Get issues a GET to the specified URL using the DefaultClient. If the response is one of the following redirect codes, Get follows the redirect.
  - name: Post
    signature: "func Post(url string, contentType string, body io.Reader) (resp *Response, err error)"
    description: Post issues a POST to the specified URL using the DefaultClient.
  - name: PostForm
    signature: "func PostForm(url string, data url.Values) (resp *Response, err error)"
    description: PostForm issues a POST to the specified URL, with data's keys and values URL-encoded as the request body.
  - name: Head
    signature: "func Head(url string) (resp *Response, err error)"
    description: Head issues a HEAD to the specified URL using the DefaultClient.
  - name: NewRequest
    signature: "func NewRequest(method string, url string, body io.Reader) (*Request, error)"
    description: NewRequest returns a Request suitable for use with Client.Do or Transport.RoundTrip to make an HTTP client request.
  - name: NewRequestWithContext
    signature: "func NewRequestWithContext(ctx context.Context, method string, url string, body io.Reader) (*Request, error)"
    description: NewRequestWithContext returns a Request suitable for use with Client.Do or Transport.RoundTrip, including the provided context.
  - name: Error
    signature: "func Error(w ResponseWriter, error string, code int)"
    description: Error replies to the request with the specified error message and HTTP code. It does not otherwise end the request; the caller should ensure no further writes are done to w.
  - name: NotFound
    signature: "func NotFound(w ResponseWriter, r *Request)"
    description: NotFound replies to the request with an HTTP 404 not found error.
  - name: Redirect
    signature: "func Redirect(w ResponseWriter, r *Request, url string, code int)"
    description: Redirect replies to the request with a redirect to url, which may be a path relative to the request path.
  - name: ServeContent
    signature: "func ServeContent(w ResponseWriter, req *Request, name string, modtime time.Time, content io.ReadSeeker)"
    description: ServeContent replies to the request using the content in the provided ReadSeeker.
  - name: ServeFile
    signature: "func ServeFile(w ResponseWriter, r *Request, name string)"
    description: ServeFile replies to the request with the contents of the named file or directory.
  - name: FileServer
    signature: "func FileServer(root FileSystem) Handler"
    description: FileServer returns a handler that serves HTTP requests with the contents of the file system rooted at root.
  - name: StripPrefix
    signature: "func StripPrefix(prefix string, h Handler) Handler"
    description: StripPrefix returns a handler that serves HTTP requests by removing the given prefix from the request URL's Path and invoking the handler h.
  - name: TimeoutHandler
    signature: "func TimeoutHandler(h Handler, dt time.Duration, msg string) Handler"
    description: TimeoutHandler returns a Handler that runs h with the given time limit.
  - name: MaxBytesReader
    signature: "func MaxBytesReader(w ResponseWriter, r io.ReadCloser, n int64) io.ReadCloser"
    description: MaxBytesReader is similar to io.LimitReader but is intended for limiting the size of incoming request bodies.
  - name: SetCookie
    signature: "func SetCookie(w ResponseWriter, cookie *Cookie)"
    description: SetCookie adds a Set-Cookie header to the provided ResponseWriter's headers.
  - name: ParseMultipartForm
    signature: "func (r *Request) ParseMultipartForm(maxMemory int64) error"
    description: ParseMultipartForm parses a request body as multipart/form-data.
  - name: FormValue
    signature: "func (r *Request) FormValue(key string) string"
    description: FormValue returns the first value for the named component of the query. POST and PUT body parameters take precedence over URL query string values.
  - name: Context
    signature: "func (r *Request) Context() context.Context"
    description: Context returns the request's context. The returned context is always non-nil; it defaults to the background context.
metadata:
  lastModified: "2026-02-17T14:30:00Z"
  packagePath: net/http
  version: go1.21
---

# net/http

Package `net/http` provides HTTP client and server implementations. It's the foundation for building web services in Go.

## Import

```go
import "net/http"
```

## HTTP Server

### Basic Server

```go
package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, World!")
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
```

### Multiple Routes

```go
func main() {
    http.HandleFunc("/", homeHandler)
    http.HandleFunc("/about", aboutHandler)
    http.HandleFunc("/api/users", usersHandler)
    
    http.ListenAndServe(":8080", nil)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Home Page")
}

func aboutHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "About Page")
}
```

### Custom Server

```go
server := &http.Server{
    Addr:           ":8080",
    Handler:        nil,
    ReadTimeout:    10 * time.Second,
    WriteTimeout:   10 * time.Second,
    MaxHeaderBytes: 1 << 20,
}

log.Fatal(server.ListenAndServe())
```

## Request Handling

### Reading Request Data

```go
func handler(w http.ResponseWriter, r *http.Request) {
    // Method
    method := r.Method
    
    // URL path
    path := r.URL.Path
    
    // Query parameters
    name := r.URL.Query().Get("name")
    
    // Headers
    userAgent := r.Header.Get("User-Agent")
    
    // Form data
    r.ParseForm()
    username := r.FormValue("username")
}
```

### Reading Body

```go
func handler(w http.ResponseWriter, r *http.Request) {
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Error reading body", http.StatusBadRequest)
        return
    }
    defer r.Body.Close()
    
    fmt.Fprintf(w, "Received: %s", body)
}
```

### JSON Request/Response

```go
type User struct {
    Name  string `json:"name"`
    Email string `json:"email"`
}

func createUser(w http.ResponseWriter, r *http.Request) {
    var user User
    
    // Decode JSON request
    err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    
    // Process user...
    
    // Encode JSON response
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}
```

## Response Writing

### Setting Headers

```go
func handler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("X-Custom-Header", "value")
    w.WriteHeader(http.StatusOK)
    w.Write([]byte(`{"message": "success"}`))
}
```

### Status Codes

```go
// Success
w.WriteHeader(http.StatusOK)              // 200
w.WriteHeader(http.StatusCreated)         // 201

// Client Errors
w.WriteHeader(http.StatusBadRequest)      // 400
w.WriteHeader(http.StatusUnauthorized)    // 401
w.WriteHeader(http.StatusNotFound)        // 404

// Server Errors
w.WriteHeader(http.StatusInternalServerError)  // 500
```

### Redirects

```go
func redirectHandler(w http.ResponseWriter, r *http.Request) {
    http.Redirect(w, r, "/new-location", http.StatusMovedPermanently)
}
```

## HTTP Client

### Simple GET Request

```go
resp, err := http.Get("https://api.example.com/users")
if err != nil {
    log.Fatal(err)
}
defer resp.Body.Close()

body, err := ioutil.ReadAll(resp.Body)
if err != nil {
    log.Fatal(err)
}

fmt.Println(string(body))
```

### POST Request

```go
data := url.Values{}
data.Set("username", "alice")
data.Set("password", "secret")

resp, err := http.PostForm("https://example.com/login", data)
if err != nil {
    log.Fatal(err)
}
defer resp.Body.Close()
```

### Custom Request

```go
client := &http.Client{
    Timeout: 10 * time.Second,
}

req, err := http.NewRequest("GET", "https://api.example.com/data", nil)
if err != nil {
    log.Fatal(err)
}

req.Header.Add("Authorization", "Bearer token123")
req.Header.Add("Accept", "application/json")

resp, err := client.Do(req)
if err != nil {
    log.Fatal(err)
}
defer resp.Body.Close()
```

### JSON POST Request

```go
user := User{Name: "Alice", Email: "alice@example.com"}
jsonData, err := json.Marshal(user)
if err != nil {
    log.Fatal(err)
}

resp, err := http.Post(
    "https://api.example.com/users",
    "application/json",
    bytes.NewBuffer(jsonData),
)
if err != nil {
    log.Fatal(err)
}
defer resp.Body.Close()
```

## Middleware

### Basic Middleware Pattern

```go
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", homeHandler)
    
    http.ListenAndServe(":8080", loggingMiddleware(mux))
}
```

### Authentication Middleware

```go
func authMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token != "valid-token" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}
```

## File Server

### Serving Static Files

```go
fs := http.FileServer(http.Dir("./static"))
http.Handle("/static/", http.StripPrefix("/static/", fs))
http.ListenAndServe(":8080", nil)
```

### File Upload

```go
func uploadHandler(w http.ResponseWriter, r *http.Request) {
    r.ParseMultipartForm(10 << 20) // 10 MB max
    
    file, handler, err := r.FormFile("file")
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    defer file.Close()
    
    // Save file
    dst, err := os.Create("./uploads/" + handler.Filename)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer dst.Close()
    
    io.Copy(dst, file)
    fmt.Fprintf(w, "File uploaded successfully")
}
```

## Complete REST API Example

```go
type Article struct {
    ID      int    `json:"id"`
    Title   string `json:"title"`
    Content string `json:"content"`
}

var articles = []Article{
    {1, "First Article", "Content 1"},
    {2, "Second Article", "Content 2"},
}

func getArticles(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(articles)
}

func getArticle(w http.ResponseWriter, r *http.Request) {
    idStr := r.URL.Query().Get("id")
    id, _ := strconv.Atoi(idStr)
    
    for _, article := range articles {
        if article.ID == id {
            w.Header().Set("Content-Type", "application/json")
            json.NewEncoder(w).Encode(article)
            return
        }
    }
    http.Error(w, "Article not found", http.StatusNotFound)
}

func main() {
    http.HandleFunc("/articles", getArticles)
    http.HandleFunc("/article", getArticle)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```
