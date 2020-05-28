interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Args {
  target: number,
  hours: Array<number>
}

const parseArguments = (args: Array<string>): Args => {
  if (args.length <= 3) throw new Error('Too few arguments');

  if (isNaN(Number(args[2]))) {
    throw new Error('target was not a number.');
  }

  const target = Number(args[2]);

  const hours: Array<number> = args.slice(3).map(value => {
    if (isNaN(Number(value))) {
      throw new Error(
        'At least one of the provided values for exercise hours was not a number.');
    }

    return Number(value);
  });

  return {
    target,
    hours
  };
};

const calculateExercises = (target: number, exerciseHours: Array<number>): Result => {
  const periodLength: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.reduce(
    (days, value) => (value > 0 ? days + 1 : days), 0
  );
  const totalHours: number = exerciseHours.reduce(
    (hours, value) => (hours + value), 0
  );
  const average: number = totalHours / periodLength;

  let rating: number;
  let ratingDescription: string;
  let success: boolean;

  if (average <= (target * 0.7)) {
    rating = 1;
    ratingDescription = "bad";
    success = false;
  } else if (average <= (target * 1.2 )) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
    success = false;
  } else {
    rating = 3;
    ratingDescription = "very good";
    success = true;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(target, hours));
} catch (e) {
  console.log('Error: ', (e as Error).message);
}