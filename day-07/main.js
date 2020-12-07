function parseInput(inputText) {
  return inputText
    .trim()
    .split("\n")
    .map((line) => {
      return {
        bag: line
          .substr(0, line.indexOf("contain", 0))
          .replace("bags", "")
          .trim(),
        contains: line
          .substr(line.indexOf("contain", 0))
          .replace("contain", "")
          .trim(),
      };
    });
}

function resolve1(input, bags = ["shiny gold"], result = []) {

  if(bags.length == 0){
    return [...new Set(result.slice(1))];
  }

  result = result.concat(bags);

  var search = [];

  bags.forEach((bag) => {
    search.push(...input.filter((rules) => rules.contains.indexOf(bag) > -1));
  });

  search = [...new Set(search)];

  return resolve1(
      input,
      [...new Set(search.map((bag) => bag.bag))],
      result
    );
}

const input = parseInput(inputText);
const output = resolve1(input).length;

console.table(output);
