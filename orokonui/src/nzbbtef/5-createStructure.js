/**
  Extracts parts based on position of partSeparator (if one exists)
 */
const defineParts = tokens => {
  const partSeparatorIndex = tokens.findIndex(token => token.type === 'partSeparator');
  const hasPartSeparator = partSeparatorIndex >= 0;

  // Drop part separator token once it has been consumed
  hasPartSeparator && tokens.splice(partSeparatorIndex, 1);

  const parts = [
    {
      type: 'tibia',
      key: 'tibia',
      tokens: hasPartSeparator ? tokens.slice(0, partSeparatorIndex) : [],
    },
    {
      type: 'tarsus',
      key: 'tarsus',
      tokens: hasPartSeparator ? tokens.slice(partSeparatorIndex, tokens.length) : tokens,
    },
  ];

  return parts.filter(part => part.tokens.length > 0);
};

/**
  Extracts legs based on position of legSeparator (if one exists)
 */
const defineLegs = tokens => {
  const legSeparatorIndex = tokens.findIndex(token => token.type === 'legSeparator');
  const hasLegSeparator = legSeparatorIndex >= 0;

  // Drop leg separator token once it has been consumed
  hasLegSeparator && tokens.splice(legSeparatorIndex, 1);

  const legs = hasLegSeparator
    ? [
        { type: 'left', key: 'left', tokens: tokens.slice(0, legSeparatorIndex) },
        { type: 'right', key: 'right', tokens: tokens.slice(legSeparatorIndex, tokens.length) },
      ]
    : [{ type: 'unspecified', key: 'unspecified', tokens: tokens }];

  return legs.filter(leg => leg.tokens.length > 0);
};

/**
  Defines structure by legs, then iterates over legs to define part structure.
 */
const createStructure = tokens => {
  const legs = defineLegs(tokens);

  return legs.map(leg => Object.assign({}, leg, { tokens: defineParts(leg.tokens) }));
};

export default createStructure;
