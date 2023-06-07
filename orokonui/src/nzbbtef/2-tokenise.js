import * as moo from 'moo';

let symbolBandiser = moo.compile({
  symbol: { match: /\S+\son\s/, value: value => value.match(/\S+/)[0] },
  symbolColour: /^[a-zA-Z]+/,
  bandColour: /[a-zA-Z]+$/,
  WS: /[ \t]+/,
  error: moo.error,
});

let idBandiser = moo.compile({
  bandColour: /^[a-zA-Z]+/,
  inscription: { match: /\(\S+\)/, value: value => value.match(/[^()]+/)[0] },
  error: moo.error,
});

let tokeniser = moo.compile({
  symbolBand: /\w+\s\S+\son\s\w+/,
  partSeparator: /\/\//,
  bandSeparator: /\//,
  legSeparator: /-/,
  colouredIdBand: /[a-zA-Z]+\(\S+\)/,
  uncolouredIdBand: /\(\S+\)/,
  nullBand: /x/,
  colouredBand: /[a-zA-Z]+/,
  WS: /[ \t]+/,
  error: moo.error,
});

/**
 Tokenise the string using `moo` as per the rules defined above, then further process certain types further.
 */
const tokenise = nzbbtef => {
  tokeniser.reset(nzbbtef);

  const allTokens = Array.from(tokeniser).map(token => {
    // If nested token, initialise tokeniser
    switch (token.type) {
      case 'symbolBand':
        symbolBandiser.reset(token.value);
        break;
      case 'uncolouredIdBand':
        idBandiser.reset(`M${token.value}`); // Assume metal band
        break;
      case 'colouredIdBand':
        idBandiser.reset(token.value);
        break;
      default:
        break;
    }

    // Depending on type, use tokeniser (as initialised) or otherwise just return the token as is
    switch (token.type) {
      case 'symbolBand':
        return Object.assign(
          {},
          token,
          { type: 'tokenisedSymbolBand' },
          { tokens: Array.from(symbolBandiser) }
        );
      case 'uncolouredIdBand':
      case 'colouredIdBand':
        return Object.assign(
          {},
          token,
          { type: 'tokenisedIdBand' },
          { tokens: Array.from(idBandiser) }
        );
      default:
        return token;
    }
  });

  // Remove whitespace tokens as they are not helpful after tokenisation
  return allTokens.filter(token => token.type !== 'WS');
};

export default tokenise;
