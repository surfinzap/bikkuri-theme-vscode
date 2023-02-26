# This is a single-line comment

"""
This is a multi-line comment
"""

# Variables
x = 10
y = 20
z = 30

# Data types
my_string = "Hello, World!"
my_number = 123
my_boolean = True
my_list = [1, 2, 3]
my_dict = {
  "name": "John",
  "age": 30,
  "hobbies": ["reading", "music"]
}

# Control structures
if x > y:
  print("x is greater than y")
elif y > x:
  print("y is greater than x")
else:
  print("x is equal to y")

for item in my_list:
  print(item)

while x < 20:
  print(x)
  x += 1

# Functions
def greet(name):
  print("Hello, " + name + "!")

greet("John")

# Classes
class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  def greet(self):
    print("Hello, my name is " + self.name +
      " and I am " + str(self.age) + " years old.")

john = Person("John", 30)
john.greet()