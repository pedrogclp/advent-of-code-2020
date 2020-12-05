function parseInput(inputText) {
  return inputText
  .trim()
  .split('\n');
}

function resolve1(input) {

  return input
    .map((seat) => {
      let pointer = 0;

      let lower = 0;
      let upper = 128;

      let left = 0;
      let right = 8;

      let index = 0;

      let letters = seat.split("");

      let row = 0;
      let col = 0;

      pointer = 128;

      do {
        if (letters[index] === "B") {
          lower += Math.round(pointer / 2);
        } else if (letters[index] === "F") {
          upper -= Math.round(pointer / 2);
        }

        pointer /= 2;
        index++;
      } while (index < 7);

      row = upper - 1;

      pointer = 8;

      do {
        if (letters[index] === "R") {
          left += Math.round(pointer / 2);
        } else if (letters[index] === "L") {
          right -= Math.round(pointer / 2);
        }

        pointer /= 2;
        index++;
      } while (index < 9);

      // Last letter. 
      if (letters[index] === "R") {
        col = right - 1;
      } else if (letters[index] === "L") {
        col = left;
      }

      return Math.round(row * 8 + col);
    })
    // Part One
    // .reduce((a, b) => (a > b ? a : b));
}

function resolve2(input) {
  return input
    .sort((a, b) => a - b)
    .find((value, index, array) => value != (index+array[0])) - 1; //offset
}

const input = parseInput(inputText);
const output = resolve2(resolve1(input));

console.table(output);
