import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../components/presentation/Banner';
import Page from '../components/presentation/Page';

const AboutPage = () => {
  return (
    <div className="AboutPage">
      <Helmet title="About the Project" />
      <section className="mb-5">
        <Banner size="small">
          <h1>About the Project</h1>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <Page id={33} hideTitle />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
