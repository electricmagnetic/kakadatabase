import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import Observation from './Observation';
import ObservationsMap from './Observation/ObservationsMap';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `${process.env.REACT_APP_API_BASE}/observations/`;

/**
  Observations fetches a series of observations using a given (optional) queryString and renders it using Observation.
  */
const Observations = ({ queryString, ...others }) => {
  const { data, error, isValidating } = useSWR(`${API_URL}${queryString}`);

  if (isValidating) {
    return <Loader />;
  } else if (error) {
    return <Error message="Error fetching observations" />;
  } else if (data) {
    const observations = data.results;

    // Catch zero observations so map doesn't attempt to render
    if (observations.length === 0) return null;

    // Intercept type 'map', as this needs rendering as a group on a single map
    if (others.type === 'map') return <ObservationsMap observations={observations} {...others} />;
    return observations.map(observation => (
      <Observation observation={observation} key={observation.id} {...others} />
    ));
  } else return null;
};

Observations.propTypes = {
  queryString: PropTypes.string,
};

Observations.defaultProps = {
  queryString: '',
};

export default Observations;
