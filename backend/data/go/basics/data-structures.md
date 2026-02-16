---
id: data-structures
title: Data Structures
description: Arrays, slices, maps, and structs in Go
type: basics
language: go
order: 5
---

# Data Structures

Go provides powerful built-in data structures for organizing data.

## Arrays

Fixed-size sequences of elements of the same type.

```go
var arr [5]int
arr[0] = 100

numbers := [5]int{1, 2, 3, 4, 5}
fmt.Println(numbers[0])  // 1
fmt.Println(len(numbers))  // 5
```

## Slices

Dynamic, flexible view into arrays.

### Creating Slices

```go
// From array literal
slice := []int{1, 2, 3, 4, 5}

// Using make
s := make([]int, 5)      // length 5, capacity 5
s := make([]int, 5, 10)  // length 5, capacity 10

// From array
arr := [5]int{1, 2, 3, 4, 5}
slice := arr[1:4]  // [2, 3, 4]
```

### Slice Operations

```go
slice := []int{1, 2, 3}

// Append
slice = append(slice, 4, 5)  // [1, 2, 3, 4, 5]

// Copy
dest := make([]int, len(slice))
copy(dest, slice)

// Length and capacity
fmt.Println(len(slice))  // 5
fmt.Println(cap(slice))  // capacity
```

## Maps

Key-value pairs (hash tables).

### Creating Maps

```go
// Using make
ages := make(map[string]int)
ages["Alice"] = 30
ages["Bob"] = 25

// Literal initialization
scores := map[string]int{
    "Alice": 95,
    "Bob":   87,
    "Carol": 92,
}
```

### Map Operations

```go
// Get value
age := ages["Alice"]

// Check if key exists
age, exists := ages["Alice"]
if exists {
    fmt.Println("Alice's age:", age)
}

// Delete
delete(ages, "Bob")

// Iterate
for name, age := range ages {
    fmt.Printf("%s: %d\n", name, age)
}
```

## Structs

Custom data types that group related data.

### Defining Structs

```go
type Person struct {
    Name string
    Age  int
    Email string
}

// Create instance
p1 := Person{
    Name: "Alice",
    Age:  30,
    Email: "alice@example.com",
}

// Short form
p2 := Person{"Bob", 25, "bob@example.com"}

// Access fields
fmt.Println(p1.Name)
p1.Age = 31
```

### Struct Methods

```go
type Rectangle struct {
    Width  int
    Height int
}

func (r Rectangle) Area() int {
    return r.Width * r.Height
}

func (r *Rectangle) Scale(factor int) {
    r.Width *= factor
    r.Height *= factor
}

rect := Rectangle{Width: 5, Height: 3}
fmt.Println(rect.Area())  // 15
rect.Scale(2)
fmt.Println(rect.Area())  // 60
```

### Embedded Structs

```go
type Address struct {
    Street string
    City   string
}

type Employee struct {
    Name string
    Address  // embedded
}

emp := Employee{
    Name: "Alice",
    Address: Address{
        Street: "123 Main St",
        City:   "Boston",
    },
}
fmt.Println(emp.City)  // directly access embedded field
```
