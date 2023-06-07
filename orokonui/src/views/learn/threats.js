import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import Page from '../../components/presentation/Page';

const ThreatsPage = () => {
  return (
    <div className="ThreatsPage">
      <Helmet title="Threats to Kākā" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Threats to Kākā</h1>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <Page id={65} hideTitle />
        </div>
      </section>
    </div>
  );
};

export default ThreatsPage;
