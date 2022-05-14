/* == Code Structure ==

* Variables
* * magicString
* * magicArray
* * maxGuesses
* * guessLog
* * blanksDisplay
* * playerGuess
* Magic string functionality
* * Magic string to array function
* * Array indexing function (This can be done in-line, doesn't require a special section.)
* Blanks functionality
* * Create blanks (must match magic string)
* * Blanks screen display
* * <Some functionality depend on input>
* Guesslog functionality
* * <Most/all functionality depends on input>
* Input functionality
* * Blanks functionality
* * * Blanks update based on input
* * Guesslog interactions
* * * Guesslog update based on input
* * * <check if letter is in guesslog. if not, update it. If there, ignore.>
* * Screen keyboard interactions
* * * Direct key input
* * * Block functionality once letter is pressed.
* * maxGuesses functionality
* * * maxGuesses countdown
* * * maxGuesses display
*/

// VARIABLES

let maxGuesses = 12; // edit this
let magicString = "turned down for what?"; // edit this
let magicArray = stringToArray(magicString);
let guessLog = [];
let blanksDisplay = [];
let playerGuess = "";
// let guessIndexMatch = "";

// MAGIC STRING FUNCTIONALITY. Successful.
// Convert string to array
function stringToArray(stringValue) {
  answerArray = [...stringValue];
  return answerArray;
}
console.log(magicString);

// BLANKS FUNCTIONALITY. Successful.
// Create blanks (must match magic string)

function makeBlanks(array) {
  for (i = 0; i < array.length; i++) {
    if (array[i] !== " ") {
      blanksDisplay.push("_");
    } else {
      blanksDisplay.push(" \xa0 \xa0 "); //UTF-8 non-breaking space
    }
  }
  return blanksDisplay;
}
makeBlanks(magicArray);

// Blanks screen display.
//Note: Below formatting is proper when using getElementbyID. (assigned to a variable)
var blanks = document.getElementById("blanks"); // This grabs the element with the ID "blanks"
blanks.innerHTML = blanksDisplay.join(" "); //This assigns it the array blanksDisplay.

// GUESSLOG FUNCTIONALITY
// See input functionality > guesslog interactions.

// INPUT FUNCTIONALITY
let keyPressEvent = document.addEventListener("keydown", function (event) {
  // Everything goes into a switch statement, to rule out invalid keypresses. The input functionality runs only in case the invalid keys are not triggered.
  switch (event.key) {
    case " ":
      console.log("Invalid key");
      break;
    case ",":
      console.log("Invalid key");
      break;
    case ".":
      console.log("Invalid key");
      break;
    case "-":
      console.log("Invalid key");
      break;
    case ":":
      console.log("Invalid key");
      break;
    case "Shift":
      console.log("Invalid key");
      break;
    default: //
      /* ALL THE FUNKY STUFF GOES IN HERE */

      // 1. Blanks functionality: Update blanks based on input. SUCCESSFUL.
      if (magicString.includes(event.key)) {
        //Grab the index of event.key in magicString
        let indexHolder = [];
        for (i = 0; i < magicString.length; i++) {
          if (event.key == magicString[i]) {
            indexHolder.push(i);
            // console.log(magicString[i] + ", index " + i);
          }
        }
        console.log(indexHolder);

        for (element of indexHolder)
          blanksDisplay.splice(element, 1, magicArray[element]);
      }
      // Blanks screen display.
      //Note: This is a repeat of code from above. The above version sets the original blanks, this finalizes it after keypresses.
      var blanks = document.getElementById("blanks");

      blanks.innerHTML = blanksDisplay;

      // 1.b. All blanks filled. Victory condition
      // Solution: If 'no blanks in blanks display', then 'victory text!'
      // ***JOSH CONTINUE HERE***

      // 2. Guesslog interactions. Successful.
      // 2.a. Update guesslog based on input. Successful.
      if (!guessLog.includes(event.key)) {
        guessLog.push(event.key);
      }

      break;
  }

  /* Testing switch case above */

  // 2.b. Guesslog screen display. Successful.
  //Note: The proper formatting of getElementbyID requires assigning it to a variable.
  var guessLogSpan = document.getElementById("guessLogSpan");
  guessLogSpan.innerHTML = guessLog;

  // 3. Screen keyboard interactions. TO DO.
  // 3.a. Direct key input
  // 3.b. Block keys once letter is pressed.

  // 4. maxGuesses Functionality. SUCCESSFUL
  if (maxGuesses == 0) {
    let gameOverAnnouncement = document.getElementById("gameOverAnnouncement");
    gameOverAnnouncement.innerHTML = "Game Over [said dramatically]";
  }

  // 4.a. maxGuesses countdown. Successful.
  // Countdown only if user guess is wrong, and for the first time.
  if (!magicArray.includes(event.key)) {
    maxGuesses -= 1;
  }

  // 4.b. Update maxGuesses display. Successful.
  var numOfTries = document.getElementById("numOfTries");
  numOfTries.innerHTML = maxGuesses;
});

/* 
* I want the screen keyboard to also work. This requires me to link the letters in the guesslog and letter/blank display to each letter on the keyboard. 
* It's not obvious how to do this. Link the data in the tag (<button>a</button>) to each letter? I don't know how to refer to "a" in the dom.

Potential solution:

Wordle characterizes its screen keyboard as follows:
  <button data-key="r" data-state="correct" class>r</button>
or
  <button data-key="p" data-state="correct">p</button>
(depending on whether it was clicked or not, and what its status was)

The keys are also located in div rows nested in div keyboard

<div id="keyboard">
  <div class="row">
  </div>
</div>

See this to interact with keys: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
*/
