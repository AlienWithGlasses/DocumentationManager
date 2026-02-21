---
id: control-flow
title: Control Flow
description: Conditionals, loops, and flow control in Python
type: basics
language: python
order: 3
---

# Control Flow

Python provides standard control flow constructs: conditionals, loops, and exception handling.

## Conditionals

### if / elif / else

```python
x = 42

if x > 100:
    print("large")
elif x > 10:
    print("medium")
else:
    print("small")
```

### Ternary Expression

```python
label = "even" if x % 2 == 0 else "odd"
```

### Truthiness

Values that evaluate to `False`: `None`, `0`, `0.0`, `""`, `[]`, `{}`, `set()`

```python
name = ""
if not name:
    print("Name is empty")
```

## Loops

### for Loop

Iterates over any iterable:

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
```

### range()

Generate a sequence of numbers:

```python
for i in range(5):           # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10, 2):   # 2, 4, 6, 8
    print(i)
```

### enumerate()

Get index and value simultaneously:

```python
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
```

### while Loop

```python
count = 0
while count < 5:
    print(count)
    count += 1
```

### Loop Control

```python
for i in range(10):
    if i == 3:
        continue   # skip to next iteration
    if i == 7:
        break      # exit loop
    print(i)
```

### else on Loops

The `else` block runs when the loop completes without hitting `break`:

```python
for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            break
    else:
        print(f"{n} is prime")
```

## Comprehensions

### List Comprehension

```python
squares = [x ** 2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
```

### Dict Comprehension

```python
word_lengths = {word: len(word) for word in ["hello", "world"]}
```

### Set Comprehension

```python
unique_lengths = {len(word) for word in ["hi", "hello", "hey"]}
```

## Exception Handling

### try / except / else / finally

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
except (TypeError, ValueError):
    print("Type or value error")
else:
    print("No exception occurred")
finally:
    print("Always runs")
```

### Raising Exceptions

```python
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

### Custom Exceptions

```python
class AppError(Exception):
    def __init__(self, message, code):
        super().__init__(message)
        self.code = code

raise AppError("Not found", 404)
```

## match Statement (Python 3.10+)

Structural pattern matching:

```python
command = "quit"

match command:
    case "quit":
        print("Quitting")
    case "help":
        print("Showing help")
    case _:
        print(f"Unknown command: {command}")
```

Pattern matching with types:

```python
point = (1, 2)

match point:
    case (0, 0):
        print("Origin")
    case (x, 0):
        print(f"On x-axis at {x}")
    case (0, y):
        print(f"On y-axis at {y}")
    case (x, y):
        print(f"Point at ({x}, {y})")
```