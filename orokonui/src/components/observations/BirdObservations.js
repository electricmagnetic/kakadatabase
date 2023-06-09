import React from "react";
import PropTypes from "prop-types";
import useSWR from "swr";

import BirdObservation from "./BirdObservation";
import ObservationsMap from "./Observation/ObservationsMap";

import Loader from "../helpers/Loader";
import Error from "../helpers/Error";

const API_URL = `${process.env.REACT_APP_API_BASE}/bird_observations/`;

/**
  BirdObservations fetches a series of bird observations using a given (optional) queryString and renders it using BirdObservation.
  */
const BirdObservations = ({ queryString, ...others }) => {
  const { data, error, isValidating } = useSWR(`${API_URL}${queryString}`);

  if (isValidating) {
    return <Loader />;
  } else if (error) {
    return <Error message="Error fetching bird observations" />;
  } else if (data) {
    const birdObservations = data.results;

    // Catch zero observations so map doesn't attempt to render
    if (birdObservations.length === 0) return null;

    // Intercept type 'map', as this needs rendering as a group on a single map
    if (others.type === "map")
      return (
        <ObservationsMap
          observations={birdObservations.map(
            (birdObservation) => birdObservation.observation
          )}
          {...others}
        />
      );
    return birdObservations.map((birdObservation) => (
      <BirdObservation
        birdObservation={birdObservation}
        key={birdObservation.id}
        {...others}
      />
    ));
  } else return null;
};

BirdObservations.propTypes = {
  queryString: PropTypes.string,
};

BirdObservations.defaultProps = {
  queryString: "",
};

export default BirdObservations;
