# Documentation Manager

A full-stack application for browsing technical documentation across multiple programming languages. Built as a learning project — the backend is hand-crafted in Go by **AlienWithGlasses** as a way of learning the language, while the frontend was vibe-coded with Claude (because this Alien is still in the process of learning React).

## Tech Stack

**Backend:**
- Go 1.22.2 (standard library HTTP server, no frameworks)

**Frontend:**
- React 18 + Vite
- React Router v6
- react-markdown with GitHub Flavored Markdown
- react-syntax-highlighter for code blocks

## Project Structure

```
├── backend/
│   ├── main.go              # HTTP server + CORS middleware
│   ├── handlers/             # API endpoint handlers
│   │   ├── get_languages.go       # Discovers languages from data/
│   │   ├── get_documents_list.go  # Lists docs with YAML frontmatter parsing + caching
│   │   ├── get_document.go        # Fetches a single doc (cache-first)
│   │   └── search.go
│   ├── helpers/              # Utilities (file reading, search indexing)
│   └── data/                 # Markdown documentation files
│       ├── go/
│       │   ├── basics/       # getting-started, variables, functions, control-flow, data-structures
│       │   └── packages/     # fmt, net/http
│       └── Python/
│           ├── basics/       # getting-started, variables, functions, control-flow, data-structures
│           └── packages/     # json, os
├── frontend/
│   └── src/
│       ├── App.jsx
│       └── components/
│           ├── Sidebar.jsx          # Language & document navigation
│           ├── DocumentViewer.jsx   # Markdown content renderer
│           └── SearchPanel.jsx      # Fuzzy search (Cmd/Ctrl+K)
└── README.md
```

## Getting Started

### Prerequisites

- Go 1.22+
- Node.js + npm

### Run the Backend

```bash
cd backend
go run main.go
```

Server starts on **http://localhost:9000**

### Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Dev server starts on **http://localhost:3500**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/languages` | List available languages |
| GET | `/api/languages/{language}/{type}` | List documents for a language/type |
| GET | `/api/languages/{language}/{type}/{docId}` | Get a single document with full content |
| GET | `/api/languages/{language}/search?q={query}` | Fuzzy search within a language |

## Adding Documentation

1. Create a directory under `backend/data/{language}/basics/` or `backend/data/{language}/packages/`
2. Add markdown files with frontmatter:

```markdown
---
id: getting-started
title: Getting Started
description: Introduction to the language
order: 1
---

# Your content here
```

New languages are discovered automatically by the backend — no code changes needed.

## Currently Supported Languages

- **Go** — 5 basics (getting started, variables, functions, control flow, data structures) + 2 packages (fmt, net/http)
- **Python** — 5 basics (getting started, variables, functions, control flow, data structures) + 2 packages (json, os)

## Status

Core API is functional. The languages, document list, and document detail endpoints are fully implemented with YAML frontmatter parsing and in-memory caching. Search is next on the list. The frontend connects to the API via Vite's dev proxy and renders markdown with syntax highlighting.