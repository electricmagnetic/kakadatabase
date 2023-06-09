import { getValidatedTokens } from "../../../nzbbtef/nzbbtef";

import {
  IS_COLOUR,
  IS_SYMBOL,
  IS_NAME,
  IS_PRIMARY_BAND,
  IS_AREA,
} from "./constants";

/**
  Takes an array of NZBBTEF tokens and flattens the recursive tokens (e.g. tokenisedSymbolBand)
 */
const flattenTokens = (tokens) =>
  tokens &&
  tokens.reduce(
    (accumulator, tokens) =>
      accumulator.concat(
        (tokens.tokens && flattenTokens(tokens.tokens)) || tokens
      ),
    []
  );

/**
  Obtains a (unique) set of colours from a given array of flattened tokens
 */
const getColours = (tokens) => [
  ...new Set(
    tokens
      .filter((token) => token && token.isColourToken)
      .map((token) => token.value)
  ),
];

/**
  Obtains a (unique) set of symbols from a given array of flattened tokens
 */
const getSymbols = (tokens) => [
  ...new Set(
    tokens
      .filter((token) => token && token.type === "symbol")
      .map((token) => token.value)
  ),
];

/**
  Obtain bird names from a given array of birds
 */
const getNames = (birds) =>
  birds.filter((bird) => bird.name).map((bird) => bird.name);

/**
  Obtain primary bands from a given array of birds
 */
const getPrimaryBands = (birds) =>
  birds.filter((bird) => bird.primary_band).map((bird) => bird.primary_band);

/**
  Obtains a (unique) set of areas from a given array of birds
 */
const getAreas = (birds) => [
  ...new Set(birds.filter((bird) => bird.area).map((bird) => bird.area)),
];

/**
  Returns a processed list of birds with band combos, adding:
    * tokens (as determined by NZBBTEF)
    * flattened tokens (see above)
    * colours per band combo (bird)
    * symbols per band combo (bird)
 */
const processBirds = (birds) =>
  birds
    .filter((bird) => bird.band_combo !== null)
    .map((bird) => {
      const tokens = getValidatedTokens(bird.band_combo);
      const flattenedTokens = flattenTokens(tokens);

      return Object.assign(
        {},
        bird,
        {
          tokens: tokens,
          flattenedTokens: flattenTokens(tokens),
        },
        tokens && {
          colours: getColours(flattenedTokens),
          symbols: getSymbols(flattenedTokens),
        }
      );
    });

/**
  Take a series of birds (with tokens) and extract all tokens
 */
const getAllTokens = (processedBirds) =>
  processedBirds.map((bird) => bird.flattenedTokens).flat();

/**
  Generate the arrays of each criteria by which birds can be sorted
 */
const getCriteria = (processedBirds) => {
  const allTokens = getAllTokens(processedBirds);

  return {
    symbols: getSymbols(allTokens).sort(),
    colours: getColours(allTokens).sort(),
    names: getNames(processedBirds).sort(),
    primaryBands: getPrimaryBands(processedBirds).sort(),
    areas: getAreas(processedBirds).sort(),
  };
};

/**
  Filter an array of birds given an array of (selected) tokens
 */
const filterBirds = (birds, selected) =>
  birds.filter((bird) =>
    selected.every((criteria) => {
      if (criteria.optionType === IS_COLOUR && bird.colours)
        return bird.colours.includes(criteria.colour);
      if (criteria.optionType === IS_SYMBOL && bird.symbols)
        return bird.symbols.includes(criteria.symbol);
      if (criteria.optionType === IS_NAME && bird.name)
        return criteria.name === bird.name;
      if (criteria.optionType === IS_PRIMARY_BAND && bird.primary_band)
        return criteria.primaryBand === bird.primary_band;
      if (criteria.optionType === IS_AREA && bird.area)
        return criteria.area === bird.area;
      return false;
    })
  );

export {
  flattenTokens,
  getColours,
  getSymbols,
  getNames,
  getPrimaryBands,
  getAreas,
  processBirds,
  getAllTokens,
  getCriteria,
  filterBirds,
};
