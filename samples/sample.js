// This is a single-line comment

/*
This is a multi-line comment
*/


// Variables
var x = 10;
let y = 20;
const z = 30;

// Data types
let myString = "Hello, World!";
let myNumber = 123;
let myBoolean = true;
let myArray = [1, 2, 3];
let myObject = { 
  name: "John",
  age: 30,
  hobbies: ["reading", "music"]
};

// Control structures
if (x > y) {
  console.log("x is greater than y");
} else if (y > x) {
  console.log("y is greater than x");
} else {
  console.log("x is equal to y");
}

for (let i = 0; i < myArray.length; i++) {
  console.log(myArray[i]);
}

while (x < 20) {
  console.log(x);
  x++;
}

// Functions
function greet(name) {
    console.log("Hello, " + name + "!");
}

greet("John");

// Arrow functions
const multiply = (a, b) => a * b;
console.log(multiply(2, 3));

// Classes
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
  }
}

const john = new Person("John", 30);
john.greet();