---
id: fmt
title: fmt
description: Package fmt implements formatted I/O with functions analogous to C's printf and scanf
type: packages
language: go
functionCount: 25
order: 1
---

# fmt

Package `fmt` implements formatted I/O with functions analogous to C's printf and scanf. The format verbs are derived from C but are simpler.

## Import

```go
import "fmt"
```

## Printing Functions

### Print

Print to standard output.

```go
fmt.Print("Hello")
fmt.Print("World")
// Output: HelloWorld
```

### Println

Print with newline.

```go
fmt.Println("Hello")
fmt.Println("World")
// Output:
// Hello
// World
```

### Printf

Formatted print.

```go
name := "Alice"
age := 30
fmt.Printf("Name: %s, Age: %d\n", name, age)
// Output: Name: Alice, Age: 30
```

## String Formatting

### Sprint

Return formatted string.

```go
s := fmt.Sprint("Hello ", "World")
// s = "Hello World"
```

### Sprintln

Return formatted string with newline.

```go
s := fmt.Sprintln("Hello", "World")
// s = "Hello World\n"
```

### Sprintf

Return formatted string with format specifiers.

```go
name := "Bob"
age := 25
s := fmt.Sprintf("%s is %d years old", name, age)
// s = "Bob is 25 years old"
```

## Format Verbs

### General

- `%v` - value in default format
- `%+v` - value with field names (for structs)
- `%#v` - Go-syntax representation
- `%T` - type of value
- `%%` - literal percent sign

```go
type Person struct {
    Name string
    Age  int
}
p := Person{"Alice", 30}

fmt.Printf("%v\n", p)   // {Alice 30}
fmt.Printf("%+v\n", p)  // {Name:Alice Age:30}
fmt.Printf("%#v\n", p)  // main.Person{Name:"Alice", Age:30}
fmt.Printf("%T\n", p)   // main.Person
```

### Boolean

- `%t` - boolean

```go
fmt.Printf("%t\n", true)  // true
```

### Integer

- `%d` - decimal
- `%b` - binary
- `%o` - octal
- `%x` - hexadecimal (lowercase)
- `%X` - hexadecimal (uppercase)

```go
fmt.Printf("%d\n", 42)   // 42
fmt.Printf("%b\n", 42)   // 101010
fmt.Printf("%o\n", 42)   // 52
fmt.Printf("%x\n", 42)   // 2a
```

### Float

- `%f` - decimal point, no exponent
- `%e` - scientific notation
- `%g` - whichever is more compact

```go
fmt.Printf("%f\n", 3.14159)    // 3.141590
fmt.Printf("%.2f\n", 3.14159)  // 3.14
fmt.Printf("%e\n", 3.14159)    // 3.141590e+00
```

### String

- `%s` - string
- `%q` - quoted string
- `%x` - hex dump

```go
fmt.Printf("%s\n", "Hello")   // Hello
fmt.Printf("%q\n", "Hello")   // "Hello"
```

## Scanning Input

### Scan

Scan from standard input.

```go
var name string
var age int
fmt.Scan(&name, &age)
```

### Scanf

Scan with format.

```go
var name string
var age int
fmt.Scanf("%s %d", &name, &age)
```

### Sscan

Scan from string.

```go
var name string
var age int
input := "Alice 30"
fmt.Sscan(input, &name, &age)
```

## Error Formatting

### Errorf

Create formatted error.

```go
err := fmt.Errorf("user %s not found", username)
```

## Examples

### Pretty Print Struct

```go
type User struct {
    ID    int
    Name  string
    Email string
}

user := User{1, "Alice", "alice@example.com"}
fmt.Printf("%+v\n", user)
// Output: {ID:1 Name:Alice Email:alice@example.com}
```

### Format Numbers with Padding

```go
for i := 1; i <= 5; i++ {
    fmt.Printf("%04d\n", i)
}
// Output:
// 0001
// 0002
// 0003
// 0004
// 0005
```

### Custom String Representation

```go
type Point struct {
    X, Y int
}

func (p Point) String() string {
    return fmt.Sprintf("(%d, %d)", p.X, p.Y)
}

p := Point{3, 4}
fmt.Println(p)  // (3, 4)
```
