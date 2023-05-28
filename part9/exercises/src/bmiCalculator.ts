const bmiMetricUnits = (height: number, mass: number): number => {
  if (height <= 0 || mass <= 0)
    throw new RangeError('Arguments must be greater than zero.');

  return mass / Math.pow(height / 100, 2);
};

/**
 * Source: https://en.wikipedia.org/w/index.php?title=Body_mass_index&oldid=1032659751#Categories
 */
const bmiCategory = (bmi: number): string => {
  switch (true) {
    case bmi < 15:
      return 'Very severely underweight';
    case bmi < 16:
      return 'Severely underweight';
    case bmi < 18.5:
      return 'Underweight';
    case bmi < 25:
      return 'Normal (healthy weight)';
    case bmi < 30:
      return 'Overweight';
    case bmi < 35:
      return 'Obese Class I (Moderately obese)';
    case bmi < 40:
      return 'Obese Class II (Severely obese)';
    default:
      return 'Obese Class III (Very severely obese)';
  }
};

export const calculateBmi = (height: number, mass: number): string => {
  return bmiCategory(bmiMetricUnits(height, mass));
};

export const parseBmiArguments = (
  argv: string[]
): Parameters<typeof calculateBmi> => {
  const args = argv.map((arg) => parseFloat(arg)).filter((arg) => !isNaN(arg));

  if (args.length !== 2)
    throw new Error('Exactly two numeric arguments are required.');

  return [args[0], args[1]];
};

if (process.argv.length > 2) {
  try {
    console.log(calculateBmi(...parseBmiArguments(process.argv.splice(2))));
  } catch (error: unknown) {
    console.log(
      'Failed to calculate BMI.',
      error instanceof Error ? error.message : 'Unknown error.'
    );
  }
}
