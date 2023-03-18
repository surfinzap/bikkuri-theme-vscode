# Header 1

This is some **bold text** and some *italic text*.

## Header 2

Here’s a list of items:
- Item 1
- Item 2
- Item 3

### Header 3

This is a blockquote:

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus sit amet mauris nec lacinia. Fusce bibendum magna sed ex vestibulum, eu tincidunt risus sodales.

#### Header 4

This is a table:

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

##### Header 5

This is a code block:

```python
def hello_world():
    print("Hello, World!")
    
hello_world()
```

This is a horizontal rule:

---

This is some more text. You can also create [links](https://www.example.com) and include images:

![Alt Text](https://via.placeholder.com/150)

And here’s some inline code: `print("Hello, World!")`

And here’s some ~~strikethrough~~ text.

```mermaid
graph TD %% Comment 
OUTCOME(Desired Outcome) 
OUTCOME--> OPP1(Opportunity 1) & OPP2(Opportunity 2) & OPP3(Opportunity 3)
OPP1 --> IDEA1(Solution idea 1) & IDEA2(Solution idea 2) & IDEA3(...)
IDEA1 --> EXP1(Experiment A) & EXP2(Experiment B) & EXP3(...)
```

```mermaid
sequenceDiagram
  participant A as Alice
  participant B as Bob
  participant J as John
  A->>+J: Hello John, how are you?
  J-->>-A: Hi Alice, I'm doing well, thanks for asking!
  A->>+B: Hello Bob, how are you?
  B-->>-A: Hi Alice, I'm good, thanks!
```

```mermaid
pie
  "Dogs": 33
  "Cats": 24
  "Fish": 10
```

```mermaid
classDiagram

class Animal {
  - name : String
  - age : Integer
  + setName(name : String) : void
  + setAge(age : Integer) : void
  + getName() : String
  + getAge() : Integer
}

class Dog {
  - breed : String
  + setBreed(breed : String) : void
  + getBreed() : String
}

Animal <|-- Dog
```

```mermaid
gantt
  dateFormat  YYYY-MM-DD
  title Example Gantt Chart

  section Section 1
  Task 1         :a1, 2023-03-01, 7d
  Task 2         :a2, after a1, 4d
  Task 3         :a3, after a2, 5d

  section Section 2
  Task 4         :b1, 2023-03-08, 3d
  Task 5         :b2, after b1, 6d
  Task 6         :b3, after b2, 4d
```