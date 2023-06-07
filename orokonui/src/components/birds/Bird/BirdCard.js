import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import generateSummary from "./helpers/generateSummary";
import getPicture from "./helpers/getPicture";
import birdLink from "./helpers/birdLink";

/**
  Presents a nicely formatted card for a given bird.
 */
const BirdCard = ({ bird, ...others }) => {
  const { className } = others;
  const classNames = ["BirdCard"];
  if (className) classNames.push(className);

  return (
    <div className={classNames.join(" ")}>
      <div className="card card-dull">
        <Link to={birdLink(bird)}>
          <img
            src={getPicture(bird)}
            alt={bird.label}
            className="card-img-top"
          />
        </Link>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <h2 className="card-title m-0">
              <Link to={birdLink(bird)}>{bird.label}</Link>
            </h2>
          </li>
          <li className="list-group-item">{generateSummary(bird)}</li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-1">
                <i className={`far fa-fw fa-circle`} />
              </div>
              <div className="col">{bird.band_combo}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

BirdCard.propTypes = {
  bird: PropTypes.object.isRequired,
};

export default BirdCard;
