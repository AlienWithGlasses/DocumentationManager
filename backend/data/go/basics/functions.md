---
id: functions
title: Functions
description: Defining and using functions in Go
type: basics
language: go
order: 4
---

# Functions

Functions are the building blocks of Go programs.

## Basic Function

```go
func greet(name string) {
    fmt.Printf("Hello, %s!\n", name)
}

// Call it
greet("Alice")
```

## Functions with Return Values

### Single Return

```go
func add(a int, b int) int {
    return a + b
}

result := add(5, 3)  // 8
```

### Multiple Returns

```go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

result, err := divide(10, 2)
if err != nil {
    fmt.Println("Error:", err)
} else {
    fmt.Println("Result:", result)
}
```

## Named Return Values

```go
func rectangle(width, height int) (area, perimeter int) {
    area = width * height
    perimeter = 2 * (width + height)
    return  // naked return
}

a, p := rectangle(5, 3)
```

## Variadic Functions

```go
func sum(numbers ...int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}

result := sum(1, 2, 3, 4, 5)  // 15
```

## Anonymous Functions

```go
// Assign to variable
multiply := func(a, b int) int {
    return a * b
}
result := multiply(3, 4)  // 12

// Immediate invocation
func(msg string) {
    fmt.Println(msg)
}("Hello from anonymous function")
```

## Closures

```go
func counter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

c := counter()
fmt.Println(c())  // 1
fmt.Println(c())  // 2
fmt.Println(c())  // 3
```

## Defer

Execute a function call after the surrounding function returns:

```go
func example() {
    defer fmt.Println("This runs last")
    fmt.Println("This runs first")
    fmt.Println("This runs second")
}
// Output:
// This runs first
// This runs second
// This runs last
```

## Function as Parameters

```go
func apply(fn func(int, int) int, a, b int) int {
    return fn(a, b)
}

add := func(x, y int) int { return x + y }
result := apply(add, 5, 3)  // 8
```
