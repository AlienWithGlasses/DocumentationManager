# Documentation Browser - Frontend

A modern React-based documentation browser designed for technical documentation across multiple programming languages.

## Features

- 🎨 **Clean, Modern UI** - Professional design optimized for reading technical documentation
- 🔍 **Fuzzy Search** - Fast, intelligent search across all documentation with keyboard shortcuts
- 📚 **Multi-Language Support** - Browse documentation for multiple programming languages
- 📦 **Package & Basics** - Organized documentation with separate sections for basics and packages
- ⌨️ **Keyboard Navigation** - Cmd/Ctrl+K for search, arrow keys for navigation
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎯 **Syntax Highlighting** - Beautiful code highlighting for all major languages
- 📝 **Markdown Rendering** - Full GFM (GitHub Flavored Markdown) support

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router v6** - Client-side routing
- **Vite** - Fast build tool and dev server
- **React Markdown** - Markdown rendering with GFM support
- **Syntax Highlighter** - Code syntax highlighting

## Prerequisites

- Node.js 16+ and npm
- Go backend running on `http://localhost:8080` (see API_DOCUMENTATION.md)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3500`

## Building for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

## Project Structure

```
src/
├── api/
│   └── client.js           # API client for backend communication
├── components/
│   ├── Sidebar.jsx         # Language & document navigation
│   ├── Sidebar.css
│   ├── DocumentViewer.jsx  # Markdown content renderer
│   ├── DocumentViewer.css
│   ├── SearchPanel.jsx     # Fuzzy search interface
│   └── SearchPanel.css
├── App.jsx                 # Main application component
├── App.css                 # Global styles and design system
└── main.jsx                # React entry point
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

### Vite Configuration

The Vite config includes a proxy to forward `/api` requests to the backend during development. Modify `vite.config.js` if your backend runs on a different port.

## Usage

### Keyboard Shortcuts

- `Cmd/Ctrl + K` - Open search panel
- `↑/↓` - Navigate search results
- `Enter` - Select search result
- `Esc` - Close search panel

### Navigation Flow

1. Select a programming language from the sidebar
2. Choose between "Basics" or "Packages" tabs
3. Click on a document to view its content
4. Use search (Cmd+K) to quickly find documentation

## API Integration

The frontend expects a REST API with the following endpoints:

- `GET /api/languages` - List all languages
- `GET /api/languages/{language}/{type}` - List documents
- `GET /api/languages/{language}/{type}/{docId}` - Get document content
- `GET /api/languages/{language}/search?q={query}` - Search documentation

See `API_DOCUMENTATION.md` for complete API specifications.

## Design System

### Color Palette

The application uses a technical documentation-focused color scheme:

- **Primary**: `#0066cc` - Links and interactive elements
- **Surface**: Layered grayscale for depth and hierarchy
- **Text**: Multi-level text colors for information hierarchy

### Typography

- **Display**: Spectral (serif) - For headings and titles
- **Mono**: JetBrains Mono - For code and technical content
- **Body**: System fonts - For optimal readability

### Components

All components follow a consistent design language:
- 8px base spacing unit
- 6-8px border radius for modern look
- Subtle shadows for depth
- Smooth transitions (200ms cubic-bezier)

## Development

### Adding New Features

1. Create component in `src/components/`
2. Add corresponding CSS file
3. Import and use in `App.jsx` or parent component
4. Update API client if new endpoints are needed

### Code Style

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use CSS modules or scoped styles

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Performance Considerations

- Markdown rendering is client-side
- Search debouncing (300ms) to reduce API calls
- Virtual scrolling can be added for very large document lists
- Code splitting enabled via Vite

## Troubleshooting

### Frontend doesn't load

1. Check that the backend is running on port 9000
2. Verify CORS is enabled on the backend
3. Check browser console for errors

### Search not working

1. Verify the search API endpoint is responding
2. Check that the query parameter is URL-encoded
3. Ensure search returns proper JSON format

### Styles not loading

1. Clear browser cache
2. Rebuild with `npm run build`
3. Check that Google Fonts are accessible

## Contributing

When contributing:

1. Follow the existing code style
2. Add comments for complex logic
3. Test across different browsers
4. Update documentation as needed

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
- Check the API_DOCUMENTATION.md
- Review the troubleshooting section
- Open an issue with detailed information
