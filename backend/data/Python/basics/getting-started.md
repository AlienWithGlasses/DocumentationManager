---
id: getting-started
title: Getting Started
description: Introduction to Python programming and setting up your environment
type: basics
language: python
order: 1
---

# Getting Started

Welcome to Python! This guide will help you set up your Python development environment and write your first program.

## Installing Python

Download and install Python from [python.org](https://www.python.org/downloads/). Follow the installation instructions for your operating system.

### Verify Installation

```bash
python3 --version
```

You should see output like: `Python 3.12.0`

## Your First Program

Create a file named `hello.py`:

```python
print("Hello, World!")
```

Run it:

```bash
python3 hello.py
```

## Interactive Mode

Python includes an interactive REPL (Read-Eval-Print Loop). Start it with:

```bash
python3
```

```python
>>> 2 + 2
4
>>> print("Hello")
Hello
>>> exit()
```

## Package Manager (pip)

Python uses `pip` to install third-party packages:

```bash
pip3 install requests
pip3 list
pip3 uninstall requests
```

## Virtual Environments

Isolate project dependencies using virtual environments:

```bash
python3 -m venv myenv
source myenv/bin/activate   # Linux/macOS
myenv\Scripts\activate      # Windows

pip install requests
deactivate
```

## Python Scripts

A typical Python script structure:

```python
#!/usr/bin/env python3

def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()
```

## Next Steps

- Learn about variables and types
- Understand control flow
- Explore Python's standard library