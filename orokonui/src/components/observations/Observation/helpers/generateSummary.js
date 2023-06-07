/**
  Generates a summary string from a given observation.
  */
const generateSummary = observation => {
  return `${observation.observation_type} ${observation.number} ${
    observation.number === 1 ? 'bird' : 'birds'
  }`;
};

export default generateSummary;
