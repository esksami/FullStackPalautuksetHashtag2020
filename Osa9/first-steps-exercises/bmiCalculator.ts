interface Args {
  height: number;
  weight: number;
}


const parseArguments = (args: Array<string>): Args => {
  if (args.length < 4) throw new Error('Not enough arguments provided.');
  if (args.length > 4) throw new Error('Too many arguments.');

  const arguments: Array<number> = args.slice(2).map(value => {
    if (isNaN(Number(value))) {
      throw new Error('At least one of the provided values was not a number.')
    }

    return Number(value)
  })

  return {
    height: arguments[0],
    weight: arguments[1]
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100)**2;

  if (bmi < 15) {
    return "Very severely underweight";
  } else if (bmi < 16) {
    return "Severely underweight";
  } else if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else if (bmi < 35) {
    return "Obese Class I (Moderately obese)";
  } else if (bmi < 40) {
    return "Obese Class II (Severely obese)";
  } else {
    return "Obese Class III (Very severely obese)"
  }
}

try {
  const { height, weight} = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error: ', e.message);
}