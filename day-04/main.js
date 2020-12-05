function parseInput(inputText) {
  return inputText.trim().split("\n\n");
}

function resolve1(input) {
  return input
    .map((passport) => {
      return required.map((field) => {
        return passport.indexOf(field) > -1;
      });
    })
    .map((check) => !check.includes(false))
    .filter((valid) => valid).length;
}

function resolve2(input) {
  return input
  .map(passport => {
    return passport.replace(/[\n]/g, ' ').split(' ')
    .map(fields => {
      
      const firstCheck = required.map((field) => {
        return passport.indexOf(field) > -1;
      });

      const [field, value] = fields.split(':');
      const secondCheck = requiredHighSecurity.find(required => required.field == field);

      if (secondCheck != undefined) {
        let valid = false;

        switch (secondCheck.field) {
          case "pid":
          case "hcl":
            
            valid =
              secondCheck.regex.test(value) && 
              !firstCheck.includes(false);
            break;

          case "ecl":
            
            valid =
              secondCheck.values.includes(value) && 
              !firstCheck.includes(false);
            break;

          case "hgt":
            
            let inRange = false;

            if( secondCheck.regex.test(value) ){
              const number = Number.parseInt(value.substr(0, value.length-2));

              if ( value.indexOf("cm") > -1 ) {
                inRange = number >= secondCheck.min && number <= secondCheck.max;
  
              } else {
                const inch = 2.54; //cm
                inRange = Math.round(number * inch) >= secondCheck.min && Math.round(number * inch) <= secondCheck.max;

              }
            }

            valid =
              secondCheck.regex.test(value) &&
              !firstCheck.includes(false) &&
              inRange;

            break;
          default:
            
            const number = Number.parseInt(value);
            
            valid =
            secondCheck.regex.test(number) &&
            !firstCheck.includes(false) &&
            (number >= secondCheck.min &&
              number <= secondCheck.max);
            
        }
        
        return valid;
      } else {
        // Valores opcionales
        return true;
      }

    });
  }).filter((check) => {
    return !check.includes(false);
  }).length;
}

const input = parseInput(inputText);
const output = resolve2(input);

console.log(output);
