// Single-line comment example

/*
Multi-line comment example
*/

/**
 * JSDoc style comment
 * This function greets a user by name.
 * @param {string} name - The user's name
 * @returns {void}
 */

import Locale from './locale/locale';
import { removeEmptyLines, fixNbsp, fixSpaces } from './lib/whitespace/lines';

// Variable declarations with types
var x: number = 10; // var example
let y: number = 20; // let example
const z: number = 30; // const example

// Data types
let myString: string = 'Hello, World!'; // String
let myNumber: number = 123; // Number
let myBoolean: boolean = true; // Boolean
let myArray: number[] = [1, 2, 3]; // Array
let myObject: {
  name: string;
  age: number;
  hobbies: string[];
} = {
  // Object
  name: 'John',
  age: 30,
  hobbies: ['reading', 'music'],
};

// Template literals
console.log(`Template literal example: ${myString}`);

// Control structures
if (x > y) {
  console.log('x is greater than y');
} else {
  console.log('x is not greater than y');
}

for (let item of myArray) {
  console.log(item); // for-of loop
}

while (x < 15) {
  console.log(`Incrementing x: ${x}`);
  x++;
}

// Functions with parameter and return types
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}

// Arrow function with type annotations
const multiply = (a: number, b: number): number => a * b;
console.log(multiply(2, 3));

// Classes with TypeScript-specific features
class Person {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public greet(): void {
    console.log(`Hello, my name is ${this.name}.`);
  }

  public greetAnother(): void {
    console.log(
      'Hello, my name is ' + this.name + ' and I am ' + this.age + ' years old.'
    );
  }
}

const john = new Person('John', 30);
john.greet();

// Regular expressions
let regex: RegExp = /abc/g;
console.log('Regex test:', regex.test('abc'));

// Additional TypeScript-specific examples

// Enums
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

// Type aliases
type Point = {
  x: number;
  y: number;
};

// Interfaces
interface Animal {
  legs: number;
}

interface Bird {
  wings: number;
}

// Intersection types
type Griffin = Animal & Bird;

const griffin: Griffin = {
  legs: 4,
  wings: 2,
};

// Generics
function identity<T>(arg: T): T {
  return arg;
}

const numericIdentity = identity<number>(123);

// Union types
let nullableNumber: number | null = null;

// Function overloads
function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
function combine(a: any, b: any): any {
  return a + b;
}

const combinedNumber = combine(1, 2); // number
const combinedString = combine('Hello, ', 'World!'); // string

// Class implementing an interface
class Employee implements Animal {
  legs: number;
  private salary: number;

  constructor(legs: number, salary: number) {
    this.legs = legs;
    this.salary = salary;
  }
}

// Nullable and optional properties
interface OptionalPerson {
  name: string;
  age?: number;
}

const employeeOfTheMonth: Employee = { legs: 3, salary: 4 };
console.log(employeeOfTheMonth);

const optionalPerson: OptionalPerson = { name: 'Alice' };
