---
id: variables
title: Variables and Types
description: Understanding Python variables and the type system
type: basics
language: python
order: 2
---

# Variables and Types

Python is dynamically typed — variables do not need a type declaration and can hold values of any type.

## Variable Assignment

```python
x = 10
name = "Alice"
is_active = True
```

Variables are created on first assignment. No `var` keyword is needed.

## Basic Types

### Integers

```python
age = 30
big_num = 1_000_000   # underscores improve readability
negative = -42
```

### Floats

```python
pi = 3.14159
scientific = 1.5e10
```

### Strings

```python
greeting = "Hello, World!"
multiline = """This is a
multi-line string"""
raw = r"C:\Users\Alice"        # raw string, backslashes are literal
f_string = f"Name: {name}"    # f-string interpolation
```

### Booleans

```python
is_valid = True
is_empty = False
```

### None

`None` is Python's null value:

```python
result = None
```

## Type Checking

```python
x = 42
print(type(x))         # <class 'int'>
print(isinstance(x, int))  # True
```

## Type Conversion

```python
n = int("42")          # string to int
f = float("3.14")      # string to float
s = str(100)           # int to string
b = bool(0)            # 0 is False, anything else is True
```

## Multiple Assignment

```python
a, b, c = 1, 2, 3
x = y = z = 0
first, *rest = [1, 2, 3, 4]   # rest = [2, 3, 4]
```

## Constants

Python has no built-in constant type. By convention, constants are named in ALL_CAPS:

```python
MAX_SIZE = 100
PI = 3.14159
DATABASE_URL = "localhost:5432"
```

## Type Hints (Python 3.5+)

Optional type annotations for documentation and static analysis:

```python
name: str = "Alice"
age: int = 30
scores: list[int] = [95, 87, 92]

def greet(name: str) -> str:
    return f"Hello, {name}!"
```

## Scope

Python uses LEGB scope (Local, Enclosing, Global, Built-in):

```python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(x)   # local

    inner()
    print(x)       # enclosing

outer()
print(x)           # global
```

Use `global` or `nonlocal` to modify outer-scope variables:

```python
counter = 0

def increment():
    global counter
    counter += 1
```