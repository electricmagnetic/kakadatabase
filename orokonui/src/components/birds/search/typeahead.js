import React from 'react';
import { Token } from 'react-bootstrap-typeahead';

import colourLibrary from '../../../nzbbtef/colours/library';

import { IS_COLOUR, IS_SYMBOL, IS_NAME, IS_PRIMARY_BAND, IS_AREA } from './constants';

/**
  Generate an omnibus of options suitable for the typeahead
 */
const generateTypeaheadOptions = criteria => {
  return []
    .concat(
      criteria.colours.map(colour =>
        Object.assign({}, { colour: colour }, { optionType: IS_COLOUR }, colourLibrary[colour])
      )
    )
    .concat(
      criteria.symbols.map(symbol =>
        Object.assign({}, { symbol: symbol, label: symbol }, { optionType: IS_SYMBOL })
      )
    )
    .concat(
      criteria.names.map(name =>
        Object.assign({}, { name: name, label: name }, { optionType: IS_NAME })
      )
    )
    .concat(
      criteria.primaryBands.map(primaryBand =>
        Object.assign(
          {},
          { primaryBand: primaryBand, label: primaryBand },
          {
            optionType: IS_PRIMARY_BAND,
          }
        )
      )
    )
    .concat(
      criteria.areas.map(area =>
        Object.assign(
          {},
          { area: area, label: area },
          {
            optionType: IS_AREA,
          }
        )
      )
    );
};

/**
  Generate a visual 'colour block' for displaying the colours.
 */
const ColourBlock = ({ colour }) => (
  <>
    <div
      className="d-inline-block mr-1"
      style={{
        background: colourLibrary[colour].value,
        width: 10,
        height: 10,
        border: '1px solid #000',
      }}
    />
    {colourLibrary[colour].label}
  </>
);

/**
  Generate tokens suitable for the typeahead
 */
const generateTypeaheadToken = (option, props, index) => {
  if (option.label)
    return (
      <Token
        onRemove={props.onRemove}
        option={option}
        key={index}
        className={
          (option.optionType === IS_COLOUR && 'token-colour') ||
          (option.optionType === IS_SYMBOL && 'token-symbol') ||
          (option.optionType === IS_NAME && 'token-name') ||
          (option.optionType === IS_PRIMARY_BAND && 'token-primaryBand') ||
          (option.optionType === IS_AREA && 'token-area')
        }
      >
        {option.optionType === IS_COLOUR ? <ColourBlock colour={option.colour} /> : option.label}
      </Token>
    );
  else
    return (
      <Token onRemove={props.onRemove} option={option}>
        <>{option}</>
      </Token>
    );
};

/**
  Generate menu items suitable for the typeahead
 */
const generateTypeaheadMenuItemChildren = (option, props, index) => {
  if (option.label)
    return (
      <>
        {option.optionType === IS_COLOUR ? <ColourBlock colour={option.colour} /> : option.label}
        <small className="ml-2">
          (
          {(option.optionType === IS_COLOUR && 'Colour') ||
            (option.optionType === IS_SYMBOL && 'Symbol') ||
            (option.optionType === IS_NAME && 'Name') ||
            (option.optionType === IS_PRIMARY_BAND && 'Primary Band') ||
            (option.optionType === IS_AREA && 'Area')}
          )
        </small>
      </>
    );
  else return <>{option}</>;
};

export {
  generateTypeaheadOptions,
  ColourBlock,
  generateTypeaheadToken,
  generateTypeaheadMenuItemChildren,
};
