// This is a single-line comment

/*
This is a multi-line comment
*/

import Locale from './locale/locale';
import { removeEmptyLines } from './lib/whitespace/lines';
import { fixNbsp } from './lib/whitespace/nbsp';
import { fixSpaces } from './lib/whitespace/spaces';

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

/**
 * Greets a person with their name.
 *
 * @param {string} name - The name of the person to greet.
 * @returns {string} The greeting message.
 */
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
fixSpaces();
fixNbsp();



/*
	Identify:
	- {{typopo__spacedHyphen}} 
	- improperly used or spaced en dash 
	- improperly used or spaced em dash 
	between words and fix dash and spacing for given locale

	Example
	see tests

  @param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with fixed dashes and spaces between words
*/
export function fixDashesBetweenWords(string, locale) {
	let pattern = 
			"([" + locale.allChars + "])"
		+ "([" + locale.spaces + "]?)+"
		+ "({{typopo__spacedHyphen}}|["+ locale.enDash + "|" + locale.emDash + "])"
		+ "([" + locale.spaces + "]?)+"
		+ "([" + locale.allChars + "])";

	let re = new RegExp(pattern, "g");
	let replacement = "";

	switch (locale.locale) {
		case "en-us":
			replacement = "$1" + locale.emDash + "$5";
			break;
		case "rue":
		case "sk":
			replacement = "$1" + locale.hairSpace + locale.emDash + locale.hairSpace + "$5";
			break;
		case "cs":
			replacement = "$1" + locale.nbsp + locale.enDash + locale.space + "$5";
			break;
		case "de-de":
			replacement = "$1" + locale.hairSpace + locale.enDash + locale.hairSpace + "$5";
			break;
	}

	return string = string.replace(re, replacement);
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

function greet(name, greeting) {
  console.log(`${greeting}, ${name}!`);
}

greet('Alice', 'Hello');
