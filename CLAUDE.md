# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation Manager is a full-stack application for browsing technical documentation across multiple programming languages. It consists of a Go backend serving a REST API and a React frontend with markdown rendering capabilities.

**Stack:**
- Backend: Go 1.22.2 with standard library HTTP server
- Frontend: React 18 + Vite + React Router v6
- Rendering: react-markdown with GitHub Flavored Markdown support
- Data: Markdown files organized in `backend/data/{language}/{type}/` structure

## Development Commands

### Backend (Go)

Run the backend server from the `backend/` directory:
```bash
cd backend
go run main.go
```

The backend runs on port **9000** and serves the `/api` endpoints.

To add dependencies:
```bash
go get <package-name>
go mod tidy
```

### Frontend (React/Vite)

Run the development server from the `frontend/` directory:
```bash
cd frontend
npm run dev
```

The frontend runs on port **3500** with Vite's hot module replacement enabled.

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Architecture

### Backend Structure

**Module name:** `DocumentationManager`

**Directory layout:**
- `main.go` - HTTP server setup with CORS middleware
- `handlers/` - HTTP request handlers for API endpoints
  - `get_languages.go` - Lists available documentation languages
  - `get_documents_list.go` - Lists documents for a language/type
  - `get_document.go` - Retrieves individual document content
  - `search.go` - Search functionality across documentation
- `helpers/` - Utility functions
  - `read_files.go` - File system operations for reading markdown
  - `search_index.go` - Search indexing and fuzzy matching
- `data/` - Documentation storage organized as `{language}/{type}/`
  - Types: `basics/` and `packages/`
  - Example: `data/golang/basics/`, `data/python/packages/`

**CORS Configuration:**
The `withCORS` middleware in `main.go` is configured for `http://localhost:3500`. Update this if the frontend port changes.

**API Endpoints:**
All endpoints are prefixed with `/api` and documented in `frontend/API_DOCUMENTATION.md`:
- `GET /api/languages` - Returns array of language identifiers
- `GET /api/languages/{language}/{type}` - Returns document metadata list
- `GET /api/languages/{language}/{type}/{docId}` - Returns full document with content
- `GET /api/languages/{language}/search?q={query}` - Fuzzy search within language

### Frontend Structure

**Directory layout:**
- `src/App.jsx` - Main application component with routing
- `src/components/`
  - `Sidebar.jsx` - Language and document navigation
  - `DocumentViewer.jsx` - Markdown content renderer with syntax highlighting
  - `SearchPanel.jsx` - Fuzzy search interface (Cmd/Ctrl+K)
- `vite.config.js` - Vite configuration with proxy to backend on port 9000

**API Proxy:**
During development, Vite proxies `/api` requests to `http://localhost:9000` (see `vite.config.js`).

**Key Dependencies:**
- `react-markdown` + `remark-gfm` - Markdown rendering with GFM extensions
- `react-syntax-highlighter` - Code block syntax highlighting
- `react-router-dom` - Client-side routing

## Documentation Data Format

Documentation files are markdown stored in `backend/data/{language}/{basics|packages}/`. Each file should include frontmatter metadata:

```markdown
---
id: getting-started
title: Getting Started
description: Introduction to the language
order: 1
---

# Content here
```

The backend reads these files and serves them through the API endpoints.

## Common Workflows

### Adding a New Language

1. Create directory structure: `backend/data/{language}/basics/` and `backend/data/{language}/packages/`
2. Add markdown files with frontmatter
3. Backend automatically discovers new languages via filesystem

### Implementing a New API Endpoint

1. Create handler function in `backend/handlers/`
2. Register route in `backend/main.go` with `mux.HandleFunc()`
3. Wrap with `withCORS()` middleware
4. Update `frontend/API_DOCUMENTATION.md` with endpoint specification

### Adding a Frontend Component

1. Create `.jsx` and `.css` files in `src/components/`
2. Import in parent component (usually `App.jsx`)
3. Follow existing patterns: functional components with hooks
4. Use 8px spacing units and design system colors from `App.css`

## Port Configuration

- **Backend:** Port 9000 (configured in `main.go`)
- **Frontend Dev Server:** Port 3500 (configured in `vite.config.js`)
- **CORS Origin:** Hardcoded to `http://localhost:3500` in `main.go`

If changing ports, update:
1. `main.go` - Server port and CORS origin
2. `vite.config.js` - Dev server port and proxy target
3. `frontend/README.md` - Documentation references

## Testing the Integration

Verify backend is running:
```bash
curl http://localhost:9000/api/languages
```

Expected: JSON array of language names (e.g., `["golang", "python"]`)

Check frontend can connect:
1. Open `http://localhost:3500` in browser
2. Open DevTools Network tab
3. Verify API requests to `/api/languages` succeed (status 200)

## Implementation Status

Many handler and helper files are currently stub implementations (empty package declarations). When implementing:
- Follow the API specifications in `frontend/API_DOCUMENTATION.md`
- Use the `helpers/` package for shared logic (file reading, search indexing)
- Return proper JSON responses with appropriate HTTP status codes
- Handle errors gracefully with the error format specified in API docs
