import React from "react";
import PropTypes from "prop-types";

import Bird from "../../birds/Bird";
import getPicture from "../../birds/Bird/helpers/getPicture";

/**
  If bird is unknown/unmoderated, present information that is currently known.
  */
const UnknownBirdCard = ({ birdObservation }) => (
  <div className="UnknownBirdCard">
    <div className="card card-dull">
      <img src={getPicture()} alt="Bird silhouette" className="card-img-top" />
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <i className="far fa-fw fa-circle mr-2" />
          {birdObservation.banded}
        </li>
        {(birdObservation.band_combo ||
          birdObservation.life_stage_guess ||
          birdObservation.sex_guess) && (
          <li className="list-group-item">
            {birdObservation.band_combo ? (
              <>{birdObservation.band_combo}</>
            ) : (
              <>
                {birdObservation.life_stage_guess} {birdObservation.sex_guess}
              </>
            )}
          </li>
        )}
      </ul>
    </div>
  </div>
);

/**
  Presents a card about a given bird as part of an BirdObservation (given a specified Observation,
  show either the Bird (if known) or given information about a bird).
  */
const BirdObservationBirdCard = ({ birdObservation, ...others }) => {
  const { className } = others;
  const classNames = ["BirdObservationBirdCard"];
  if (className) classNames.push(className);

  return (
    <div className={classNames.join(" ")}>
      {birdObservation.bird ? (
        <Bird bird={birdObservation.bird} type="card" />
      ) : (
        <UnknownBirdCard birdObservation={birdObservation} />
      )}
    </div>
  );
};

BirdObservationBirdCard.propTypes = {
  birdObservation: PropTypes.object.isRequired,
};

export default BirdObservationBirdCard;
