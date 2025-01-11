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

// Variable declarations
var x = 10; // var example
let y = 20; // let example
const z = 30; // const example

// Data types
let myString = 'Hello, World!'; // String
let myNumber = 123; // Number
let myBoolean = true; // Boolean
let myArray = [1, 2, 3]; // Array
let myObject = {
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

// Functions
function greet(name) {
  console.log(`Hello, ${name}!`);
}

// Arrow function
const multiply = (a, b) => a * b;
console.log(multiply(2, 3));

// Classes
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
  greetAnother() {
    console.log(
      'Hello, my name is ' + this.name + ' and I am ' + this.age + ' years old.'
    );
  }
}

const john = new Person('John', 30);
john.greet();

// Regular expressions
let regex = /abc/g;
console.log('Regex test:', regex.test('abc'));

export function fixDashesBetweenWords(string, locale) {
  let pattern =
    '([' +
    locale.allChars +
    '])' +
    '([' +
    locale.spaces +
    ']?)+' +
    '({{typopo__spacedHyphen}}|[' +
    locale.enDash +
    '|' +
    locale.emDash +
    '])' +
    '([' +
    locale.spaces +
    ']?)+' +
    '([' +
    locale.allChars +
    '])';

  let re = new RegExp(pattern, 'g');
  let replacement = '';

  switch (locale.locale) {
    case 'en-us':
      replacement = '$1' + locale.emDash + '$5';
      break;
  }

  return (string = string.replace(re, replacement));
}

export function getSemanticFamily(state) {
  return function (key) {
    const selection = state.items[state.selection];
    const families = selection.families;
    let familyId = undefined;

    if (selection.semanticFamilies) {
      familyId = selection.semanticFamilies[key];
    }

    if (
      semanticFamilyKeys.includes(key) &&
      families[familyId] != undefined &&
      familyId != undefined
    ) {
      return families[familyId];
    } else {
      return families[0];
    }
  };
}
