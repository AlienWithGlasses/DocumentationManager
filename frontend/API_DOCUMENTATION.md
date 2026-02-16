# Documentation Browser API Specification

This document describes all REST API endpoints that the frontend expects from the Go backend.

## Base URL

```
http://localhost:9000/api
```

## API Endpoints

### 1. Get Languages

Returns a list of all available programming languages in the documentation system.

**Endpoint:** `GET /api/languages`

**Request:**
```http
GET /api/languages HTTP/1.1
Host: localhost:9000
Content-Type: application/json
```

**Response:** `200 OK`
```json
[
  "go",
  "python",
  "javascript",
  "rust"
]
```

**Response Schema:**
- Array of strings where each string is a language identifier

**Error Responses:**
- `500 Internal Server Error` - Server error occurred

---

### 2. Get Documents by Language and Type

Returns a list of documentation pages for a specific language and documentation type (basics or packages).

**Endpoint:** `GET /api/languages/{language}/{type}`

**Path Parameters:**
- `language` (string, required) - Language identifier (e.g., "go", "python")
- `type` (string, required) - Documentation type: "basics" or "packages"

**Request:**
```http
GET /api/languages/go/basics HTTP/1.1
Host: localhost:9000
Content-Type: application/json
```

**Response:** `200 OK`
```json
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
```

**Response for Packages:**
```json
[
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
```

**Response Schema:**
- Array of document metadata objects
- Each object contains:
  - `id` (string) - Unique identifier for the document
  - `title` (string) - Display title of the document
  - `description` (string, optional) - Brief description
  - `type` (string) - Either "basics" or "packages"
  - `language` (string) - Language identifier
  - `functionCount` (integer, optional) - Number of functions (for packages only)
  - `order` (integer, optional) - Display order

**Error Responses:**
- `400 Bad Request` - Invalid language or type parameter
- `404 Not Found` - Language or type not found
- `500 Internal Server Error` - Server error occurred

---

### 3. Get Document Content

Returns the full content of a specific documentation page.

**Endpoint:** `GET /api/languages/{language}/{type}/{docId}`

**Path Parameters:**
- `language` (string, required) - Language identifier
- `type` (string, required) - Documentation type: "basics" or "packages"
- `docId` (string, required) - Document identifier

**Request:**
```http
GET /api/languages/go/basics/getting-started HTTP/1.1
Host: localhost:9000
Content-Type: application/json
```

**Response:** `200 OK`
```json
{
  "id": "getting-started",
  "title": "Getting Started with Go",
  "description": "Introduction to Go programming language",
  "type": "basics",
  "language": "go",
  "content": "# Getting Started with Go\n\nGo is a statically typed, compiled programming language...\n\n## Installation\n\n```bash\nwget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz\n```\n\n## Hello World\n\n```go\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}\n```",
  "metadata": {
    "lastModified": "2024-01-15T10:30:00Z",
    "author": "Go Team",
    "version": "1.0"
  }
}
```

**Response for Package Documentation:**
```json
{
  "id": "fmt",
  "title": "fmt",
  "description": "Package fmt implements formatted I/O with functions analogous to C's printf and scanf.",
  "type": "packages",
  "language": "go",
  "content": "# Package fmt\n\nPackage fmt implements formatted I/O...\n\n## Functions\n\n### Println\n\n```go\nfunc Println(a ...interface{}) (n int, err error)\n```\n\nPrintln formats using the default formats...\n\n### Printf\n\n```go\nfunc Printf(format string, a ...interface{}) (n int, err error)\n```\n\nPrintf formats according to a format specifier...",
  "functionCount": 25,
  "functions": [
    {
      "name": "Println",
      "signature": "func Println(a ...interface{}) (n int, err error)",
      "description": "Println formats using the default formats for its operands and writes to standard output."
    },
    {
      "name": "Printf",
      "signature": "func Printf(format string, a ...interface{}) (n int, err error)",
      "description": "Printf formats according to a format specifier and writes to standard output."
    }
  ],
  "metadata": {
    "lastModified": "2024-01-20T14:45:00Z",
    "packagePath": "fmt",
    "version": "go1.21"
  }
}
```

**Response Schema:**
- `id` (string) - Document identifier
- `title` (string) - Document title
- `description` (string, optional) - Brief description
- `type` (string) - "basics" or "packages"
- `language` (string) - Language identifier
- `content` (string) - Full markdown content
- `functionCount` (integer, optional) - Number of functions (packages only)
- `functions` (array, optional) - Array of function objects (packages only)
  - `name` (string) - Function name
  - `signature` (string) - Function signature
  - `description` (string) - Function description
- `metadata` (object, optional) - Additional metadata
  - `lastModified` (string) - ISO 8601 timestamp
  - `author` (string, optional) - Author name
  - `version` (string, optional) - Version string
  - `packagePath` (string, optional) - Package import path (packages only)

**Error Responses:**
- `400 Bad Request` - Invalid parameters
- `404 Not Found` - Document not found
- `500 Internal Server Error` - Server error occurred

---

### 4. Search Documentation

Performs a fuzzy search across all documentation within a specific language. Returns matches for page titles and function names.

**Endpoint:** `GET /api/languages/{language}/search`

**Path Parameters:**
- `language` (string, required) - Language identifier to search within

**Query Parameters:**
- `q` (string, required) - Search query (URL encoded)

**Request:**
```http
GET /api/languages/go/search?q=print HTTP/1.1
Host: localhost:9000
Content-Type: application/json
```

**Response:** `200 OK`
```json
[
  {
    "docId": "fmt",
    "title": "fmt",
    "type": "packages",
    "matchType": "function",
    "functionName": "Println",
    "functionSignature": "func Println(a ...interface{}) (n int, err error)",
    "snippet": "Println formats using the default formats for its operands and writes to standard output.",
    "score": 0.95
  },
  {
    "docId": "fmt",
    "title": "fmt",
    "type": "packages",
    "matchType": "function",
    "functionName": "Printf",
    "functionSignature": "func Printf(format string, a ...interface{}) (n int, err error)",
    "snippet": "Printf formats according to a format specifier and writes to standard output.",
    "score": 0.92
  },
  {
    "docId": "io",
    "title": "io",
    "type": "packages",
    "matchType": "title",
    "snippet": "Package io provides basic interfaces to I/O primitives.",
    "score": 0.45
  },
  {
    "docId": "debugging",
    "title": "Debugging and Printing",
    "type": "basics",
    "matchType": "title",
    "snippet": "Learn how to debug Go programs and print output effectively.",
    "score": 0.78
  }
]
```

**Response Schema:**
- Array of search result objects, sorted by relevance score (descending)
- Each object contains:
  - `docId` (string) - Document identifier
  - `title` (string) - Document title
  - `type` (string) - "basics" or "packages"
  - `matchType` (string) - Type of match: "title", "function", "content"
  - `functionName` (string, optional) - Function name (when matchType is "function")
  - `functionSignature` (string, optional) - Function signature (when matchType is "function")
  - `snippet` (string, optional) - Text snippet showing context around the match
  - `score` (float) - Relevance score between 0.0 and 1.0

**Error Responses:**
- `400 Bad Request` - Missing or invalid query parameter
- `404 Not Found` - Language not found
- `500 Internal Server Error` - Server error occurred

---

## Error Response Format

All error responses follow this structure:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Document not found",
    "details": "No document with id 'invalid-id' exists for language 'go'"
  }
}
```

**Error Schema:**
- `error` (object)
  - `code` (string) - Machine-readable error code
  - `message` (string) - Human-readable error message
  - `details` (string, optional) - Additional error details

**Common Error Codes:**
- `INVALID_REQUEST` - Malformed request or invalid parameters
- `NOT_FOUND` - Requested resource not found
- `INTERNAL_ERROR` - Server-side error occurred

---

## CORS Configuration

The backend should be configured to allow CORS requests from the frontend during development:

```
Access-Control-Allow-Origin: http://localhost:3500
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

For production, configure appropriate origin restrictions.

---

## Notes for Backend Implementation

1. **Search Algorithm**: Implement fuzzy matching that scores results based on:
   - Exact matches (highest score)
   - Prefix matches
   - Contains matches
   - Edit distance for typo tolerance

2. **Content Format**: All markdown content should be returned as raw markdown strings. The frontend handles rendering.

3. **Function Extraction**: For package documentation, extract function names and signatures from the markdown to enable function-level search.

4. **Caching**: Consider implementing response caching for better performance, especially for the languages list and document lists.

5. **Rate Limiting**: For production deployments, implement rate limiting on search endpoints.

6. **Pagination**: For very large documentation sets, consider adding pagination parameters to the document list and search endpoints.

---

## Example Backend Routes (Go/Gorilla Mux)

```go
r := mux.NewRouter()
api := r.PathPrefix("/api").Subrouter()

// Routes
api.HandleFunc("/languages", getLanguages).Methods("GET")
api.HandleFunc("/languages/{language}/{type}", getDocuments).Methods("GET")
api.HandleFunc("/languages/{language}/{type}/{docId}", getDocument).Methods("GET")
api.HandleFunc("/languages/{language}/search", searchDocuments).Methods("GET")
```
