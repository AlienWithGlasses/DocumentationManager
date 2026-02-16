---
id: variables
title: Variables and Types
description: Understanding Go variables, constants, and type system
type: basics
language: go
order: 2
---

# Variables and Types

Go is a statically typed language with a clean and simple type system.

## Variable Declaration

### Using `var`

```go
var name string = "John"
var age int = 30
var isActive bool = true
```

### Type Inference

```go
var name = "John"  // Go infers string type
var age = 30       // Go infers int type
```

### Short Declaration

```go
name := "John"
age := 30
isActive := true
```

## Basic Types

### Numeric Types

```go
var i int = 42           // Platform dependent (32 or 64 bit)
var i8 int8 = 127        // -128 to 127
var i16 int16 = 32767    // -32768 to 32767
var i32 int32 = 2147483647
var i64 int64 = 9223372036854775807

var u uint = 42          // Unsigned integer
var f32 float32 = 3.14
var f64 float64 = 3.14159265359
```

### String Type

```go
var greeting string = "Hello, Go!"
var multiline = `This is a
multi-line string`
```

### Boolean Type

```go
var isTrue bool = true
var isFalse bool = false
```

## Constants

```go
const Pi = 3.14159
const (
    StatusOK = 200
    StatusNotFound = 404
)
```

## Zero Values

Variables without explicit initialization get zero values:
- `0` for numeric types
- `false` for boolean
- `""` (empty string) for strings
