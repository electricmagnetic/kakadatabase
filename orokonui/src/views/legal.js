import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../components/presentation/Banner';
import Page from '../components/presentation/Page';

const LegalPage = () => {
  return (
    <div className="LegalPage">
      <Helmet title="Legal" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Legal</h1>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <Page id={36} hideTitle />
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
