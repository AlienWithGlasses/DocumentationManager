---
id: data-structures
title: Data Structures
description: Lists, tuples, dicts, sets, and other core data structures in Python
type: basics
language: python
order: 5
---

# Data Structures

Python has four built-in collection types: lists, tuples, dictionaries, and sets. Each has distinct characteristics and use cases.

## Lists

Ordered, mutable sequences:

```python
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", True, 3.14]
empty = []
```

### Indexing and Slicing

```python
fruits[0]      # "apple"
fruits[-1]     # "cherry"
fruits[1:3]    # ["banana", "cherry"]
fruits[::-1]   # reversed list
```

### Common Operations

```python
fruits.append("date")           # add to end
fruits.insert(1, "avocado")     # insert at index
fruits.extend(["elderberry"])   # extend with iterable
fruits.remove("banana")         # remove by value
popped = fruits.pop()           # remove and return last
popped = fruits.pop(0)          # remove and return at index

fruits.sort()                   # in-place sort
fruits.sort(reverse=True)       # descending
sorted_fruits = sorted(fruits)  # return new sorted list
fruits.reverse()                # in-place reverse

len(fruits)         # length
"apple" in fruits   # membership test
fruits.index("cherry")  # find index
fruits.count("apple")   # count occurrences
```

## Tuples

Ordered, immutable sequences:

```python
point = (3, 4)
single = (42,)        # trailing comma required for single element
rgb = (255, 128, 0)
```

Tuples support indexing and slicing like lists but cannot be modified. They are often used for:
- Multiple return values
- Dictionary keys (since they're hashable)
- Fixed data records

```python
x, y = point          # unpacking
r, g, b = rgb
first, *rest = (1, 2, 3, 4)
```

## Dictionaries

Ordered (Python 3.7+), mutable key-value mappings:

```python
person = {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
}
empty = {}
```

### Accessing and Modifying

```python
person["name"]                      # "Alice"
person.get("email", "N/A")          # safe access with default

person["email"] = "alice@example.com"  # add/update
del person["city"]                      # delete

"name" in person   # True - membership test on keys
```

### Iteration

```python
for key in person:
    print(key)

for key, value in person.items():
    print(f"{key}: {value}")

for value in person.values():
    print(value)
```

### Useful Methods

```python
person.keys()        # dict_keys view
person.values()      # dict_values view
person.items()       # dict_items view

person.update({"age": 31, "country": "US"})
person.setdefault("nickname", "Al")   # set if missing
person.pop("nickname")                # remove and return

merged = {**person, "extra": True}   # merge dicts (3.5+)
merged = person | {"extra": True}    # merge operator (3.9+)
```

## Sets

Unordered collections of unique elements:

```python
colors = {"red", "green", "blue"}
empty_set = set()         # NOT {} which creates an empty dict
from_list = set([1, 2, 2, 3, 3])   # {1, 2, 3}
```

### Set Operations

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b    # union: {1, 2, 3, 4, 5, 6}
a & b    # intersection: {3, 4}
a - b    # difference: {1, 2}
a ^ b    # symmetric difference: {1, 2, 5, 6}

a.issubset(b)
a.issuperset(b)
a.isdisjoint(b)

a.add(5)
a.remove(1)      # raises KeyError if missing
a.discard(99)    # no error if missing
```

## Collections Module

The `collections` module provides specialized data structures:

### namedtuple

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)   # 3 4
print(p[0])       # 3
```

### defaultdict

```python
from collections import defaultdict

word_count = defaultdict(int)
for word in "the quick brown fox".split():
    word_count[word] += 1   # no KeyError on missing keys
```

### Counter

```python
from collections import Counter

text = "mississippi"
counts = Counter(text)
print(counts.most_common(3))   # [('s', 4), ('i', 4), ('p', 2)]
```

### deque

Double-ended queue with O(1) appends and pops from both ends:

```python
from collections import deque

q = deque([1, 2, 3])
q.appendleft(0)     # [0, 1, 2, 3]
q.append(4)         # [0, 1, 2, 3, 4]
q.popleft()         # 0
q.pop()             # 4
```
