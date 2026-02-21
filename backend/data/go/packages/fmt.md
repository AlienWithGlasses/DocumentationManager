---
id: fmt
title: fmt
description: Package fmt implements formatted I/O with functions analogous to C's printf and scanf.
type: packages
language: go
functionCount: 25
order: 1
functions:
  - name: Print
    signature: "func Print(a ...any) (n int, err error)"
    description: Print formats using the default formats for its operands and writes to standard output. Spaces are added between operands when neither is a string.
  - name: Println
    signature: "func Println(a ...any) (n int, err error)"
    description: Println formats using the default formats for its operands and writes to standard output. Spaces are always added between operands and a newline is appended.
  - name: Printf
    signature: "func Printf(format string, a ...any) (n int, err error)"
    description: Printf formats according to a format specifier and writes to standard output.
  - name: Sprint
    signature: "func Sprint(a ...any) string"
    description: Sprint formats using the default formats for its operands and returns the resulting string. Spaces are added between operands when neither is a string.
  - name: Sprintln
    signature: "func Sprintln(a ...any) string"
    description: Sprintln formats using the default formats for its operands and returns the resulting string. Spaces are always added between operands and a newline is appended.
  - name: Sprintf
    signature: "func Sprintf(format string, a ...any) string"
    description: Sprintf formats according to a format specifier and returns the resulting string.
  - name: Fprint
    signature: "func Fprint(w io.Writer, a ...any) (n int, err error)"
    description: Fprint formats using the default formats for its operands and writes to w. Spaces are added between operands when neither is a string.
  - name: Fprintln
    signature: "func Fprintln(w io.Writer, a ...any) (n int, err error)"
    description: Fprintln formats using the default formats for its operands and writes to w. Spaces are always added between operands and a newline is appended.
  - name: Fprintf
    signature: "func Fprintf(w io.Writer, format string, a ...any) (n int, err error)"
    description: Fprintf formats according to a format specifier and writes to w.
  - name: Scan
    signature: "func Scan(a ...any) (n int, err error)"
    description: Scan scans text read from standard input, storing successive space-separated values into successive arguments.
  - name: Scanf
    signature: "func Scanf(format string, a ...any) (n int, err error)"
    description: Scanf scans text read from standard input, storing successive space-separated values into successive arguments as determined by the format.
  - name: Scanln
    signature: "func Scanln(a ...any) (n int, err error)"
    description: Scanln is similar to Scan, but stops scanning at a newline.
  - name: Sscan
    signature: "func Sscan(str string, a ...any) (n int, err error)"
    description: Sscan scans the argument string, storing successive space-separated values into successive arguments.
  - name: Sscanf
    signature: "func Sscanf(str string, format string, a ...any) (n int, err error)"
    description: Sscanf scans the argument string, storing successive space-separated values into successive arguments as determined by the format.
  - name: Sscanln
    signature: "func Sscanln(str string, a ...any) (n int, err error)"
    description: Sscanln is similar to Sscan, but stops scanning at a newline.
  - name: Fscan
    signature: "func Fscan(r io.Reader, a ...any) (n int, err error)"
    description: Fscan scans text read from r, storing successive space-separated values into successive arguments.
  - name: Fscanf
    signature: "func Fscanf(r io.Reader, format string, a ...any) (n int, err error)"
    description: Fscanf scans text read from r, storing successive space-separated values into successive arguments as determined by the format.
  - name: Fscanln
    signature: "func Fscanln(r io.Reader, a ...any) (n int, err error)"
    description: Fscanln is similar to Fscan, but stops scanning at a newline.
  - name: Errorf
    signature: "func Errorf(format string, a ...any) error"
    description: Errorf formats according to a format specifier and returns the string as a value that satisfies error.
  - name: Stringer
    signature: "type Stringer interface { String() string }"
    description: Stringer is implemented by any value that has a String method, which defines the native format for that value.
  - name: GoStringer
    signature: "type GoStringer interface { GoString() string }"
    description: GoStringer is implemented by any value that has a GoString method, which defines the Go syntax for that value.
  - name: Formatter
    signature: "type Formatter interface { Format(f State, verb rune) }"
    description: Formatter is implemented by any value that has a Format method. The implementation controls how State and rune are interpreted, and may call Sprint or Fprint to generate its output.
  - name: Scanner
    signature: "type Scanner interface { Scan(state ScanState, verb rune) error }"
    description: Scanner is implemented by any value that has a Scan method, which scans the input for the representation of a value and stores the result in the receiver.
  - name: Stringer
    signature: "type State interface { Write(b []byte) (n int, err error); Width() (wid int, ok bool); Precision() (prec int, ok bool); Flag(c int) bool }"
    description: State represents the printer state passed to custom formatters. It provides access to the io.Writer interface plus information about the flags and options for the operand's format specifier.
metadata:
  lastModified: "2026-02-14T09:15:00Z"
  packagePath: fmt
  version: go1.21
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
