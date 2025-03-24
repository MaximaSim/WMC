function FizzBuzz() {
  for (let i = 1; ; i++) {  // Endlosschleife, bis die Bedingung zum Stoppen erfüllt ist
    if (i % 3 === 0 && i % 5 === 0 && i % 7 === 0 && i % 11 === 0) {
      console.log("FizzBuzzWhizzBang");
      break; // Beenden, wenn FizzBuzzWhizzBang erreicht wird
    }
    else if (i % 3 === 0 && i % 5 === 0 && i % 7 === 0) {
      console.log("FizzBuzzWhizz");
    }
    else if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    }
    else if (i % 3 === 0 && i % 7 === 0) {
      console.log("FizzWhizz");
    }
    else if (i % 3 === 0 && i % 11 === 0) {
      console.log("FizzBang");
    }
    else if (i % 5 === 0 && i % 7 === 0) {
      console.log("BuzzWhizz");
    }
    else if (i % 5 === 0 && i % 11 === 0) {
      console.log("BuzzBang");
    }
    else if (i % 7 === 0 && i % 11 === 0) {
      console.log("WhizzBang");
    }
    else if (i % 3 === 0) {
      console.log("Fizz");
    }
    else if (i % 5 === 0) {
      console.log("Buzz");
    }
    else if (i % 7 === 0) {
      console.log("Whizz");
    }
    else if (i % 11 === 0) {
      console.log("Bang");
    }
    else {
      console.log(i);
    }
  }
}

FizzBuzz();