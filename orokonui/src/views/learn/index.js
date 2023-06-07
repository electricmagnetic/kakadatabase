import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import Page from '../../components/presentation/Page';

const LearnPage = () => {
  return (
    <div className="LearnPage">
      <Helmet title="About Kākā" />
      <section className="mb-5">
        <Banner size="small">
          <h1>About Kākā</h1>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <Page id={39} hideTitle />
        </div>
      </section>
    </div>
  );
};

export default LearnPage;
