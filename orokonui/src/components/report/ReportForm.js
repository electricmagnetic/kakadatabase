import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-refetch";
import qs from "qs";
import PropTypes from "prop-types";

import Loader from "../helpers/Loader";
import Error from "../helpers/Error";

import { qsOptions } from "./schema/observationParameters";
import { initialValidationSchema } from "./schema/validationSchemas";
import InitialDetailsForm from "./initialDetails/InitialDetailsForm";
import FinalDetailsForm from "./finalDetails/FinalDetailsForm";

import "./ReportForm.scss";

const API_URL = `${process.env.REACT_APP_API_BASE}/report/`;

/**
  Master form layout for observation submission.

  Loads permissible choices using react-refetch from an OPTIONS call to the API.
  Validates data using yup, reports errors back to user. Also reports API errors back to user using 'status' field.

  On successful client-side validation, values are posted to server and user is redirected to success page.
 */
class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: {},
    };
  }

  updateStateFromQueryString() {
    // Store query string in state
    this.setState({
      queryString: qs.parse(this.props.location.search, qsOptions),
    });
  }

  componentDidMount() {
    // Set state from and query string parameters passed on load
    this.updateStateFromQueryString();
  }

  componentDidUpdate(prevProps) {
    // If location changes, update state accordingly
    if (this.props.location !== prevProps.location)
      this.updateStateFromQueryString();
  }

  render() {
    const { submissionOptions } = this.props;

    if (submissionOptions.pending)
      return (
        <div className="container mb-5">
          <Loader />
        </div>
      );
    else if (submissionOptions.rejected)
      return (
        <div className="container mb-5">
          <Error message="Error">
            {submissionOptions.reason.cause &&
              `(${submissionOptions.reason.cause.detail})`}
          </Error>
        </div>
      );
    else if (submissionOptions.fulfilled && submissionOptions.value) {
      const fieldOptions = submissionOptions.value.actions.POST;

      return (
        <div className="ReportForm">
          {initialValidationSchema.isValidSync(this.state.queryString) ? (
            <FinalDetailsForm
              queryString={this.state.queryString}
              fieldOptions={fieldOptions}
            />
          ) : (
            <InitialDetailsForm fieldOptions={fieldOptions} />
          )}
        </div>
      );
    } else return null;
  }
}

ReportForm.propTypes = {
  "location.search": PropTypes.string,
};

export default withRouter(
  connect((props) => ({
    submissionOptions: {
      url: API_URL,
      method: "OPTIONS",
    },
  }))(ReportForm)
);
