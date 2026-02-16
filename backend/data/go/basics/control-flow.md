---
id: control-flow
title: Control Flow
description: If statements, loops, and switch cases in Go
type: basics
language: go
order: 3
---

# Control Flow

Go provides several control flow structures for managing program execution.

## If Statements

### Basic If

```go
if x > 10 {
    fmt.Println("x is greater than 10")
}
```

### If-Else

```go
if x > 10 {
    fmt.Println("x is greater than 10")
} else {
    fmt.Println("x is 10 or less")
}
```

### If with Initialization

```go
if num := 9; num < 0 {
    fmt.Println("negative")
} else if num < 10 {
    fmt.Println("single digit")
} else {
    fmt.Println("multiple digits")
}
```

## For Loops

Go has only one looping construct: `for`

### Classic For Loop

```go
for i := 0; i < 5; i++ {
    fmt.Println(i)
}
```

### While-style Loop

```go
i := 0
for i < 5 {
    fmt.Println(i)
    i++
}
```

### Infinite Loop

```go
for {
    // runs forever
    // use break to exit
}
```

### Range Loop

```go
numbers := []int{1, 2, 3, 4, 5}
for index, value := range numbers {
    fmt.Printf("Index: %d, Value: %d\n", index, value)
}
```

## Switch Statements

### Basic Switch

```go
day := "Monday"
switch day {
case "Monday":
    fmt.Println("Start of work week")
case "Friday":
    fmt.Println("End of work week")
case "Saturday", "Sunday":
    fmt.Println("Weekend!")
default:
    fmt.Println("Midweek day")
}
```

### Switch without Expression

```go
hour := 15
switch {
case hour < 12:
    fmt.Println("Morning")
case hour < 18:
    fmt.Println("Afternoon")
default:
    fmt.Println("Evening")
}
```

## Break and Continue

```go
for i := 0; i < 10; i++ {
    if i == 3 {
        continue  // skip this iteration
    }
    if i == 7 {
        break     // exit loop
    }
    fmt.Println(i)
}
```
