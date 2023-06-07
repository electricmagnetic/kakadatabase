import React from "react";
import Helmet from "react-helmet";

import ReportForm from "../../components/report/ReportForm";
import Banner from "../../components/presentation/Banner";

const ReportPage = () => {
  return (
    <div className="ReportPage">
      <Helmet title="Report Observation" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Report Observation</h1>
        </Banner>
      </section>
      <section className="mb-5">
        <ReportForm />
      </section>
    </div>
  );
};

export default ReportPage;
