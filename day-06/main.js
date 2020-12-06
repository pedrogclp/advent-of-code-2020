function parseInput(inputText) {
  return inputText
  .trim();
}

function resolve1(input) {
  return input
  .split('\n\n')
  .map(group => [...new Set(group.replace(/[\n]/g,''))].length)
  .reduce((a, b) => a + b);
}

function resolve2(input) {
  return input
  .split('\n\n')
  .map(group => group.replace(/[\n]/g,':'))
  .map(forms => forms.split(':'))
  .map(person => {
    // One person group, count length
    if (person.length === 1) return person[person.length - 1].length;
    else {
      // People on group
      const people = person.length;
      // Unique answers
      const unique = [...new Set(person.join("").split(""))];

      return unique
        .map((find) => {
          // Find repeats answers inside unique options.
          const repeats = person.join("").match(new RegExp(find, "g")).length;
          // If there's more than one, means some answer the same other
          if (repeats > 1) {
            // If repeats equals number of group's people, means all did the same.
            return people == repeats ? 1 : 0;
          } else {
            return 0;
          }
        })
        .reduce((a, b) => a + b);
    }
  })
  .reduce((a, b) => a + b);
}

const input = parseInput(inputText);
const output = resolve2(input);

console.table(output);
