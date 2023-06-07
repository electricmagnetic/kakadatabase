/**
  Helper function that counts the number of the given search term in the array specified
 */
const countInstancesInArray = (tokenTypes, search) =>
  tokenTypes.reduce((count, tokenType) => (tokenType.includes(search) ? (count += 1) : count), 0);

/**
  Helper function that compile the separators as a string separated by spaces.
 */
const getSeparatorsAsString = tokens =>
  tokens
    .filter(token => token.type.includes('Separator'))
    .map(separator => separator.type)
    .join(' ')
    .trim();

/**
  Helper function that compiles logic across validators (all must be true to be evaluated as true)
 */
const compileValidators = validators =>
  Object.values(validators).reduce((isValid, validator) => validator.validator && isValid, true);

export { countInstancesInArray, getSeparatorsAsString, compileValidators };
