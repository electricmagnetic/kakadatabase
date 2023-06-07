import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import Banner from "../../components/presentation/Banner";
import Page from "../../components/presentation/Page";

const ReportSuccessPage = ({ match }) => {
  const slug = match.params.slug;

  return (
    <div className="ReportSuccessPage">
      <Helmet title="Observation Submitted" />
      <section className="mb-5">
        <Banner size="small" className="mb-3">
          <h1 className="mb-3">Thanks!</h1>
          <p className="lead">
            Your observation {slug && `(#${slug})`} has been successfully
            submitted.
          </p>
          <Link
            to="/report"
            className="btn btn-primary mr-3 mb-1"
            role="button"
          >
            <i className="fa-fw fas fa-redo mr-1" />
            Report Another
          </Link>
          {slug && (
            <Link
              to={"/observations/" + slug}
              className="btn btn-light mr-3"
              role="button"
            >
              <i className="fa-fw fas fa-list-alt mr-1 mb-1" />
              View Observation
            </Link>
          )}
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <Page id={44} hideTitle />
        </div>
      </section>
    </div>
  );
};

export default ReportSuccessPage;
