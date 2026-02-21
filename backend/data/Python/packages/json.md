---
id: json
title: json
description: JSON encoding and decoding for Python objects.
type: packages
language: python
functionCount: 8
order: 2
functions:
  - name: json.dumps
    signature: "json.dumps(obj, *, skipkeys=False, ensure_ascii=True, indent=None, separators=None, sort_keys=False)"
    description: Serialize obj to a JSON formatted string using the conversion table. If indent is a non-negative integer or string, JSON array elements and object members will be pretty-printed.
  - name: json.dump
    signature: "json.dump(obj, fp, *, skipkeys=False, ensure_ascii=True, indent=None, separators=None, sort_keys=False)"
    description: Serialize obj as a JSON formatted stream to fp, a file-like object supporting a write() method, using the conversion table.
  - name: json.loads
    signature: "json.loads(s, *, cls=None, object_hook=None, parse_float=None, parse_int=None)"
    description: Deserialize s (a str, bytes or bytearray instance containing a JSON document) to a Python object using the conversion table.
  - name: json.load
    signature: "json.load(fp, *, cls=None, object_hook=None, parse_float=None, parse_int=None)"
    description: Deserialize fp (a text file or binary file containing a JSON document) to a Python object using the conversion table.
  - name: json.JSONEncoder
    signature: "class json.JSONEncoder(*, skipkeys=False, ensure_ascii=True, indent=None, separators=None, sort_keys=False)"
    description: Extensible JSON encoder for Python data structures. Subclass this to support custom serialization of types not handled by default.
  - name: json.JSONDecoder
    signature: "class json.JSONDecoder(*, object_hook=None, parse_float=None, parse_int=None, strict=True)"
    description: Simple JSON decoder. Performs the following translations by default. Can be subclassed or used with object_hook for custom deserialization.
  - name: json.JSONDecodeError
    signature: "exception json.JSONDecodeError(msg, doc, pos)"
    description: Subclass of ValueError raised when a JSON document cannot be parsed. Has attributes msg (error message), doc (the JSON document), lineno, colno, and pos.
  - name: json.JSONEncoder.encode
    signature: "json.JSONEncoder.encode(o)"
    description: Return a JSON string representation of a Python data structure o. Encodes the given object into a JSON formatted string.
metadata:
  lastModified: "2026-02-20T08:21:00Z"
  packagePath: json
  version: "3.12"
---

# json

The `json` module provides functions to encode Python objects as JSON strings and decode JSON strings back into Python objects.

## Import

```python
import json
```

## Encoding (Python → JSON)

### json.dumps

Serialize a Python object to a JSON-formatted string.

```python
data = {"name": "Alice", "age": 30, "active": True}
json_str = json.dumps(data)
# '{"name": "Alice", "age": 30, "active": true}'
```

### json.dump

Serialize a Python object and write to a file-like object.

```python
with open("data.json", "w") as f:
    json.dump(data, f)
```

## Decoding (JSON → Python)

### json.loads

Deserialize a JSON string to a Python object.

```python
json_str = '{"name": "Alice", "age": 30}'
data = json.loads(json_str)
print(data["name"])   # Alice
print(type(data))     # <class 'dict'>
```

### json.load

Deserialize JSON from a file-like object.

```python
with open("data.json", "r") as f:
    data = json.load(f)
```

## Type Mappings

| Python          | JSON      |
|-----------------|-----------|
| `dict`          | object    |
| `list`, `tuple` | array     |
| `str`           | string    |
| `int`, `float`  | number    |
| `True`          | `true`    |
| `False`         | `false`   |
| `None`          | `null`    |

## Formatting Options

### Indentation

Pretty-print with indentation:

```python
data = {"users": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]}
print(json.dumps(data, indent=2))
# {
#   "users": [
#     {
#       "id": 1,
#       "name": "Alice"
#     },
#     ...
#   ]
# }
```

### Sorting Keys

Sort dictionary keys alphabetically:

```python
data = {"z": 1, "a": 2, "m": 3}
json.dumps(data, sort_keys=True)
# '{"a": 2, "m": 3, "z": 1}'
```

### Separators

Compact output by customizing separators:

```python
json.dumps(data, separators=(",", ":"))
# '{"name":"Alice","age":30}'
```

## Handling Special Types

### Custom Encoder

Extend `json.JSONEncoder` to handle types that are not natively serializable:

```python
from datetime import datetime

class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

data = {"created_at": datetime.now()}
json.dumps(data, cls=CustomEncoder)
# '{"created_at": "2024-01-15T10:30:00.000000"}'
```

### Custom Decoder

Use `object_hook` to transform decoded objects:

```python
def as_datetime(d):
    if "created_at" in d:
        d["created_at"] = datetime.fromisoformat(d["created_at"])
    return d

data = json.loads(json_str, object_hook=as_datetime)
```

## Error Handling

```python
try:
    data = json.loads("not valid json")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
    print(f"At line {e.lineno}, column {e.colno}")
```

## Examples

### Read and Update a JSON Config File

```python
import json
import os

CONFIG_FILE = "config.json"

def load_config():
    if not os.path.exists(CONFIG_FILE):
        return {}
    with open(CONFIG_FILE, "r") as f:
        return json.load(f)

def save_config(config):
    with open(CONFIG_FILE, "w") as f:
        json.dump(config, f, indent=2)

config = load_config()
config["version"] = "2.0"
save_config(config)
```

### Parse an API Response

```python
import json
import urllib.request

def fetch_json(url):
    with urllib.request.urlopen(url) as response:
        raw = response.read().decode("utf-8")
        return json.loads(raw)

data = fetch_json("https://api.example.com/users")
for user in data["users"]:
    print(user["name"])
```

### Serialize Nested Objects

```python
import json
from dataclasses import dataclass, asdict

@dataclass
class Address:
    street: str
    city: str

@dataclass
class User:
    name: str
    age: int
    address: Address

user = User("Alice", 30, Address("123 Main St", "Springfield"))
json_str = json.dumps(asdict(user), indent=2)
print(json_str)
# {
#   "name": "Alice",
#   "age": 30,
#   "address": {
#     "street": "123 Main St",
#     "city": "Springfield"
#   }
# }
```
