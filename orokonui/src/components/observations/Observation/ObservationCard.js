import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FormatDateTime from '../../helpers/FormatDateTime';
import generateSummary from './helpers/generateSummary';

import './ObservationCard.scss';

const ListItem = ({ icon, children }) => (
  <li className="list-group-item">
    <div className="row">
      <div className="col-1">
        <i className={`fas fa-fw ${icon} mr-2`} />
      </div>
      <div className="col">{children}</div>
    </div>
  </li>
);

/**
  Presents a nicely formatted card for a given observation.
 */
const ObservationCard = ({ observation, ...others }) => {
  const { className } = others;
  const classNames = ['ObservationCard'];
  if (className) classNames.push(className);

  return (
    <div className={classNames.join(' ')}>
      <div className="card card-dull">
        <h2 className="sr-only">Observation {observation.id}</h2>
        <ul className="list-group list-group-flush">
          <ListItem icon="fa-map-marker-alt">
            {observation.geocode}
            <br />
            <small>{observation.region}</small>
          </ListItem>
          <ListItem icon="fa-calendar">
            <FormatDateTime calendar>
              {observation.date_sighted} {observation.time_sighted}
            </FormatDateTime>
          </ListItem>
          <ListItem icon="fa-feather-alt">{generateSummary(observation)}</ListItem>
          <ListItem icon="fa-user">
            {observation.contributor} ({`#${observation.id}`})
          </ListItem>
          <ListItem icon="fa-info-circle">
            <Link to={`/observations/${observation.id}`}>View Observation</Link>
          </ListItem>
        </ul>
      </div>
    </div>
  );
};

ObservationCard.propTypes = {
  observation: PropTypes.object.isRequired,
};

export default ObservationCard;
