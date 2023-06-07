import colourLibrary from './colours/library';

const getColours = tokens => {
  return tokens.map(token => {
    const isColourToken = ['symbolColour', 'bandColour', 'colouredBand'].includes(token.type);

    return Object.assign(
      {},
      token,
      { isColourToken: isColourToken },
      isColourToken && { colour: colourLibrary[token.value] },
      token.tokens && { tokens: getColours(token.tokens) }
    );
  });
};
export default getColours;
