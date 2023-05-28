interface ExerciseCalculatorResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

enum ExerciseRating {
  Bad = 1,
  Decent,
  Good,
}

export const calculateExercises = (
  hours: number[],
  target: number
): ExerciseCalculatorResult => {
  if (hours.some((h) => h < 0) || target < 0)
    throw new RangeError('Arguments must be zeros or positive numbers.');

  target = Math.abs(target);

  const average = hours.reduce((acc, val) => acc + val, 0) / hours.length;

  const rating: ExerciseRating = Math.min(
    Math.max(
      ExerciseRating.Bad,
      Math.floor((average / target) * ExerciseRating.Good)
    ),
    ExerciseRating.Good
  );

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h > 0).length,
    success: average >= target,
    rating,
    ratingDescription: ExerciseRating[rating],
    target,
    average,
  };
};

export const parseExerciseArguments = (
  argv: (string | number)[]
): Parameters<typeof calculateExercises> => {
  const args = argv.map((arg) =>
    typeof arg === 'string' ? parseFloat(arg) : arg
  );

  if (args.some((arg) => isNaN(arg)))
    throw new Error('Arguments must be convertible to numeric.');

  if (args.length < 2)
    throw new Error('At least two numeric arguments are required.');

  const [target, ...hours] = args;
  return [hours, target];
};

if (process.argv.length > 2) {
  try {
    console.log(
      calculateExercises(...parseExerciseArguments(process.argv.splice(2)))
    );
  } catch (error: unknown) {
    console.log(
      'Failed to calculate exercises.',
      error instanceof Error ? error.message : 'Unknown error.'
    );
  }
}
