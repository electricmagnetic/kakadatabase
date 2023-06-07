import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import Banner from '../components/presentation/Banner';
import Page from '../components/presentation/Page';
import BirdObservations from '../components/observations/BirdObservations';
import Birds from '../components/birds/Birds';

import banner from '../assets/img/banner.jpg';

const HomePage = () => {
  return (
    <div className="HomePage">
      <Helmet title={`${process.env.REACT_APP_AUTHORITY_NAME} Kākā Database`} />
      <section>
        <Banner backgroundImage={banner} size="home">
          <div className="banner-title mb-4">
            <p className="m-0">Welcome to the Orokonui Ecosanctuary</p>
            <h1 className="m-0">Kākā Database</h1>
          </div>
          <div className="home-buttons">
            <Link to="/report" className="btn btn-lg btn-primary mr-2 mb-2">
              <i className="fa-fw fas fa-eye mr-1" />
              Report Observation
            </Link>
          </div>
          <div className="home-buttons">
            <Link to="/birds" className="btn btn-light mr-1 mb-1">
              <i className="fa-fw fas fa-search mr-1" />
              Search Birds
            </Link>
            <Link to="/observations" className="btn btn-light mr-1 mb-1">
              <i className="fa-fw fas fa-list-alt mr-1" />
              View Observations
            </Link>
          </div>
        </Banner>
      </section>
      <div className="constrainer">
        <section className="my-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <Page id={22} />
              </div>
              <div className="col-md-6">
                <Page id={30} />
              </div>
            </div>
          </div>
        </section>
        <section className="mb-5">
          <Banner size="small" className="bg-primary text-white">
            <h2 className="h4 text-center mt-0 mb-3">Meet some of our kākā…</h2>
            <div className="row">
              <Birds
                type="feature"
                queryString="?is_featured=true&ordering=random&limit=4"
                className="col-6 col-lg-3 mb-3"
              />
            </div>
          </Banner>
        </section>
        <section className="mb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2>Recently observed</h2>
                <div className="row">
                  <BirdObservations
                    type="feature"
                    queryString="?has_bird=true&limit=4"
                    className="col-6 col-sm-3 col-md-6 col-lg-3 mb-3"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <Page id={52} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
