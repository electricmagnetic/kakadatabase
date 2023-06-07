import React from 'react';

import Observation from '../../components/observations/Observation';

const ObservationDetailPage = ({ match }) => {
  const slug = match.params.slug;

  return (
    <div className="ObservationDetailPage">
      <Observation id={slug} type="page" />
    </div>
  );
};

export default ObservationDetailPage;
