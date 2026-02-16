---
id: getting-started
title: Getting Started
description: Introduction to Go programming and setting up your environment
type: basics
language: go
order: 1
---

# Getting Started

Welcome to Go! This guide will help you set up your Go development environment and write your first program.

## Installing Go

Download and install Go from [golang.org](https://golang.org/dl/). Follow the installation instructions for your operating system.

### Verify Installation

```bash
go version
```

You should see output like: `go version go1.21.0 linux/amd64`

## Your First Program

Create a file named `hello.go`:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

Run it:

```bash
go run hello.go
```

## Go Workspace

Go uses a workspace structure:
- **src/**: Source files
- **pkg/**: Package objects
- **bin/**: Executable commands

## Next Steps

- Learn about variables and types
- Understand functions
- Explore Go's standard library
