---
id: os
title: os
description: Portable interface to operating system functionality.
type: packages
language: python
functionCount: 32
order: 1
functions:
  - name: os.path.join
    signature: "os.path.join(path, *paths)"
    description: Join one or more path components intelligently. Returns a string formed by joining the components with the OS path separator.
  - name: os.path.exists
    signature: "os.path.exists(path)"
    description: Return True if path refers to an existing path or an open file descriptor. Returns False for broken symbolic links.
  - name: os.path.isfile
    signature: "os.path.isfile(path)"
    description: Return True if path is an existing regular file. This follows symbolic links.
  - name: os.path.isdir
    signature: "os.path.isdir(path)"
    description: Return True if path is an existing directory. This follows symbolic links.
  - name: os.path.abspath
    signature: "os.path.abspath(path)"
    description: Return a normalized absolutized version of the pathname path by joining with the current working directory.
  - name: os.path.basename
    signature: "os.path.basename(path)"
    description: Return the base name of pathname path (the final component of the path).
  - name: os.path.dirname
    signature: "os.path.dirname(path)"
    description: Return the directory name of pathname path (all components before the final one).
  - name: os.path.splitext
    signature: "os.path.splitext(path)"
    description: Split the pathname path into a pair (root, ext) such that root + ext == path, and ext is the file extension.
  - name: os.path.split
    signature: "os.path.split(path)"
    description: Split the pathname path into a pair (head, tail) where tail is the last component and head is everything leading up to that.
  - name: os.path.getsize
    signature: "os.path.getsize(path)"
    description: Return the size, in bytes, of path. Raise OSError if the file does not exist or is inaccessible.
  - name: os.getcwd
    signature: "os.getcwd()"
    description: Return a string representing the current working directory.
  - name: os.chdir
    signature: "os.chdir(path)"
    description: Change the current working directory to path.
  - name: os.listdir
    signature: "os.listdir(path='.')"
    description: Return a list containing the names of the entries in the directory given by path. The list is in arbitrary order.
  - name: os.scandir
    signature: "os.scandir(path='.')"
    description: Return an iterator of os.DirEntry objects corresponding to the entries in the directory given by path.
  - name: os.mkdir
    signature: "os.mkdir(path, mode=0o777)"
    description: Create a directory named path with numeric mode. Raises FileExistsError if the directory already exists.
  - name: os.makedirs
    signature: "os.makedirs(name, mode=0o777, exist_ok=False)"
    description: Recursive directory creation function. Makes all intermediate-level directories needed to contain the leaf directory.
  - name: os.rmdir
    signature: "os.rmdir(path)"
    description: Remove (delete) the directory path. Only works when the directory is empty; raises OSError otherwise.
  - name: os.removedirs
    signature: "os.removedirs(name)"
    description: Remove directories recursively. Works like rmdir() except that, if the leaf directory is successfully removed, directories corresponding to rightmost path segments will be attempted to be removed as well.
  - name: os.walk
    signature: "os.walk(top, topdown=True, onerror=None, followlinks=False)"
    description: Generate the file names in a directory tree by walking the tree top-down or bottom-up. Yields a 3-tuple (dirpath, dirnames, filenames) for each directory.
  - name: os.rename
    signature: "os.rename(src, dst)"
    description: Rename the file or directory src to dst. If dst is a directory, OSError will be raised.
  - name: os.replace
    signature: "os.replace(src, dst)"
    description: Rename the file or directory src to dst. If dst is a non-empty directory, OSError will be raised. Unlike rename(), dst is replaced silently if it is a file.
  - name: os.remove
    signature: "os.remove(path)"
    description: Remove (delete) the file path. If path is a directory, OSError is raised.
  - name: os.unlink
    signature: "os.unlink(path)"
    description: Remove (delete) the file path. This is identical to os.remove().
  - name: os.stat
    signature: "os.stat(path)"
    description: Get the status of a file or a file descriptor. Returns a stat_result object with attributes like st_size, st_mtime, st_mode.
  - name: os.environ
    signature: "os.environ"
    description: A mapping object where keys and values are strings that represent the process environment. Setting a key assigns the environment variable for the current process.
  - name: os.getenv
    signature: "os.getenv(key, default=None)"
    description: Return the value of the environment variable key as a string if it exists, or default if it doesn't. default is None by default.
  - name: os.putenv
    signature: "os.putenv(key, value)"
    description: Set the environment variable named key to the string value. Assignments to os.environ are automatically translated into corresponding calls to putenv().
  - name: os.getpid
    signature: "os.getpid()"
    description: Return the current process id as an integer.
  - name: os.getppid
    signature: "os.getppid()"
    description: Return the parent's process id as an integer.
  - name: os.system
    signature: "os.system(command)"
    description: Execute the command (a string) in a subshell. Returns the exit status of the command.
  - name: os.cpu_count
    signature: "os.cpu_count()"
    description: Return the number of CPUs in the system as an integer, or None if undetermined.
  - name: os.urandom
    signature: "os.urandom(size)"
    description: Return a bytes object of size random bytes suitable for cryptographic use.
  - name: os.getlogin
    signature: "os.getlogin()"
    description: Return the name of the user logged in on the controlling terminal of the process.
metadata:
  lastModified: "2026-02-19T11:45:00Z"
  packagePath: os
  version: "3.12"
---

# os

The `os` module provides a portable way to use operating system-dependent functionality like file system operations, environment variables, and process management.

## Import

```python
import os
```

## Path Operations

### os.path.join

Join one or more path components intelligently.

```python
os.path.join("home", "user", "docs")
# "home/user/docs" on Unix
# "home\\user\\docs" on Windows
```

### os.path.exists

Return `True` if the path refers to an existing file or directory.

```python
os.path.exists("/etc/hosts")       # True
os.path.exists("/nonexistent")     # False
```

### os.path.isfile / os.path.isdir

```python
os.path.isfile("/etc/hosts")    # True
os.path.isdir("/etc")           # True
```

### os.path.abspath

Return the normalized absolute path.

```python
os.path.abspath("relative/path")
# "/current/working/dir/relative/path"
```

### os.path.basename / os.path.dirname

```python
path = "/home/user/docs/report.txt"

os.path.basename(path)    # "report.txt"
os.path.dirname(path)     # "/home/user/docs"
```

### os.path.splitext

Split path into root and extension.

```python
os.path.splitext("report.txt")    # ("report", ".txt")
os.path.splitext("archive.tar.gz") # ("archive.tar", ".gz")
```

## Directory Operations

### os.getcwd

Return the current working directory.

```python
cwd = os.getcwd()
print(cwd)   # "/home/user/project"
```

### os.chdir

Change the current working directory.

```python
os.chdir("/tmp")
```

### os.listdir

Return a list of entries in the given directory.

```python
entries = os.listdir(".")
entries = os.listdir("/etc")
```

### os.mkdir / os.makedirs

Create a directory, or create directories recursively.

```python
os.mkdir("new_dir")
os.makedirs("parent/child/grandchild", exist_ok=True)
```

### os.rmdir / os.removedirs

Remove a directory (must be empty), or remove directories recursively.

```python
os.rmdir("empty_dir")
os.removedirs("parent/child/grandchild")
```

### os.walk

Generate file names in a directory tree by walking top-down or bottom-up.

```python
for dirpath, dirnames, filenames in os.walk("/home/user"):
    for filename in filenames:
        full_path = os.path.join(dirpath, filename)
        print(full_path)
```

## File Operations

### os.rename

Rename a file or directory.

```python
os.rename("old_name.txt", "new_name.txt")
```

### os.remove / os.unlink

Delete a file.

```python
os.remove("unwanted.txt")
```

### os.stat

Get file status (size, modification time, permissions, etc.).

```python
info = os.stat("report.txt")
print(info.st_size)       # file size in bytes
print(info.st_mtime)      # last modification time (Unix timestamp)
```

## Environment Variables

### os.environ

A mapping of the current environment variables.

```python
home = os.environ["HOME"]
path = os.environ.get("PATH", "")
```

### os.getenv

Get the value of an environment variable with an optional default.

```python
debug = os.getenv("DEBUG", "false")
port = int(os.getenv("PORT", "8080"))
```

### os.putenv / os.environ assignment

Set environment variables for the current process.

```python
os.environ["MY_VAR"] = "value"
```

## Process Management

### os.getpid / os.getppid

Get the current process ID and parent process ID.

```python
print(os.getpid())    # e.g., 12345
print(os.getppid())   # e.g., 12300
```

### os.system

Execute a shell command in a subshell.

```python
os.system("echo hello")
os.system("ls -la")
```

### os.cpu_count

Return the number of CPUs in the system.

```python
cpus = os.cpu_count()   # e.g., 8
```

## Examples

### Find All Python Files

```python
import os

python_files = []
for dirpath, dirnames, filenames in os.walk("."):
    for filename in filenames:
        if filename.endswith(".py"):
            python_files.append(os.path.join(dirpath, filename))

print(f"Found {len(python_files)} Python files")
```

### Read Config from Environment

```python
import os

config = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", "5432")),
    "name": os.getenv("DB_NAME", "mydb"),
}
```

### Ensure Directory Exists

```python
import os

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)
    return path

output_dir = ensure_dir("output/reports/2024")
```
