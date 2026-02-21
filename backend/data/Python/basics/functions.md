---
id: functions
title: Functions
description: Defining and using functions in Python
type: basics
language: python
order: 4
---

# Functions

Functions are defined with `def` and are first-class objects in Python — they can be passed as arguments, returned from other functions, and stored in variables.

## Basic Functions

```python
def greet(name):
    return f"Hello, {name}!"

message = greet("Alice")
print(message)   # Hello, Alice!
```

## Default Parameters

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Alice")              # Hello, Alice!
greet("Bob", "Hi")          # Hi, Bob!
greet("Carol", greeting="Hey")  # Hey, Carol!
```

## Multiple Return Values

Python functions can return tuples, which can be unpacked:

```python
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([3, 1, 4, 1, 5, 9])
print(low, high)   # 1 9
```

## *args and **kwargs

### Variable Positional Arguments

```python
def total(*args):
    return sum(args)

total(1, 2, 3)       # 6
total(10, 20)        # 30
```

### Variable Keyword Arguments

```python
def describe(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

describe(name="Alice", age=30, city="NYC")
```

### Combining All Forms

```python
def mixed(required, *args, keyword=None, **kwargs):
    print(required, args, keyword, kwargs)
```

## Unpacking Arguments

```python
def add(a, b, c):
    return a + b + c

nums = [1, 2, 3]
add(*nums)            # unpack list as positional args

params = {"a": 1, "b": 2, "c": 3}
add(**params)         # unpack dict as keyword args
```

## Lambda Functions

Anonymous one-expression functions:

```python
square = lambda x: x ** 2
square(5)   # 25

# Commonly used with sort/map/filter
nums = [3, 1, 4, 1, 5, 9]
nums.sort(key=lambda x: -x)   # descending sort
```

## Higher-Order Functions

```python
def apply(func, value):
    return func(value)

apply(str.upper, "hello")   # HELLO
apply(lambda x: x * 2, 5)  # 10
```

### Built-in Higher-Order Functions

```python
numbers = [1, 2, 3, 4, 5]

doubled = list(map(lambda x: x * 2, numbers))     # [2, 4, 6, 8, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers)) # [2, 4]

from functools import reduce
product = reduce(lambda a, b: a * b, numbers)       # 120
```

## Closures

A function that captures variables from its enclosing scope:

```python
def make_counter(start=0):
    count = start

    def increment():
        nonlocal count
        count += 1
        return count

    return increment

counter = make_counter()
counter()   # 1
counter()   # 2
counter()   # 3
```

## Decorators

Functions that wrap other functions to extend their behavior:

```python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(0.1)
    return "done"

slow_function()   # slow_function took 0.1001s
```

## Type Hints

```python
def add(a: int, b: int) -> int:
    return a + b

def process(items: list[str]) -> dict[str, int]:
    return {item: len(item) for item in items}
```

## Generators

Functions that yield values lazily using `yield`:

```python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fibonacci()
for _ in range(8):
    print(next(gen))   # 0, 1, 1, 2, 3, 5, 8, 13
```

Generator expressions:

```python
squares = (x ** 2 for x in range(100))
total = sum(squares)
```
