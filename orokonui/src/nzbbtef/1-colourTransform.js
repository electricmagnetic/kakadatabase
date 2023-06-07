import { longColours, longCombinedColours } from './colours/transforms';

/**
 This function iterates over the colour object given, doing a (word bounded) find/replace.
 - Use of \b necessary to not transform PaleBlue to PaleB
 - Double backslash because string escaping necessary
 */
const transform = (nzbbtef, colours) =>
  Object.keys(colours).reduce(
    (nzbbtef, currentSearch) =>
      nzbbtef.replace(new RegExp(`\\b${currentSearch}\\b`, 'gi'), colours[currentSearch]),
    nzbbtef
  );

const colourTransform = nzbbtef => transform(transform(nzbbtef, longColours), longCombinedColours);

export default colourTransform;
