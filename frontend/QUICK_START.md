# Quick Start Guide

## Backend Setup (Go)

Your backend should implement the following API endpoints:

```go
// Example handler signatures
func getLanguages(w http.ResponseWriter, r *http.Request)
func getDocuments(w http.ResponseWriter, r *http.Request)
func getDocument(w http.ResponseWriter, r *http.Request)
func searchDocuments(w http.ResponseWriter, r *http.Request)
```

Enable CORS:
```go
c := cors.New(cors.Options{
    AllowedOrigins: []string{"http://localhost:3500"},
    AllowedMethods: []string{"GET", "OPTIONS"},
    AllowedHeaders: []string{"Content-Type"},
})

handler := c.Handler(router)
http.ListenAndServe(":8080", handler)
```

## Frontend Setup

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Configure API URL (optional):**
```bash
cp .env.example .env
# Edit .env if backend runs on different URL
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open browser:**
Navigate to `http://localhost:3500`

## Testing the Integration

1. **Verify backend is running:**
```bash
curl http://localhost:8080/api/languages
```

Expected response:
```json
["go", "python", "javascript"]
```

2. **Test frontend connection:**
   - Open browser DevTools (F12)
   - Check Console for any errors
   - Network tab should show successful API calls

## Data Structure

Your markdown files should be organized like:

```
docs/
├── go/
│   ├── basics/
│   │   ├── getting-started.md
│   │   └── variables.md
│   └── packages/
│       ├── fmt.md
│       └── http.md
├── python/
│   ├── basics/
│   │   └── intro.md
│   └── packages/
│       └── requests.md
```

Each markdown file should have frontmatter:

```markdown
---
id: getting-started
title: Getting Started
description: Introduction to Go
order: 1
---

# Getting Started

Your content here...
```

## Common Issues

**Issue:** Frontend can't connect to backend
- **Solution:** Check CORS is enabled and backend is on port 9000

**Issue:** Search returns no results
- **Solution:** Verify search endpoint returns proper JSON format

**Issue:** Markdown not rendering
- **Solution:** Ensure content field contains valid markdown string

## Production Deployment

1. **Build frontend:**
```bash
npm run build
```

2. **Serve static files:**
   - Serve `dist/` folder with any web server
   - Or integrate with Go backend to serve static files

3. **Update API URL:**
   - Set `REACT_APP_API_URL` to production backend URL
   - Rebuild after changing env variables

## Next Steps

1. Implement backend endpoints (see API_DOCUMENTATION.md)
2. Add your markdown documentation files
3. Test each endpoint with curl or Postman
4. Launch frontend and verify integration
5. Customize styling in CSS files as needed

Enjoy your documentation browser! 📚
