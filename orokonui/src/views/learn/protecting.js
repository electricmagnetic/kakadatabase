import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import Page from '../../components/presentation/Page';

const ProtectingPage = () => {
  return (
    <div className="ProtectingPage">
      <Helmet title="Protecting Kākā" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Protecting Kākā</h1>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <Page id={68} hideTitle />
        </div>
      </section>
    </div>
  );
};

export default ProtectingPage;
