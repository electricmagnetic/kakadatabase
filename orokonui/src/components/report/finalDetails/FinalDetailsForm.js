import React, { Component } from "react";
import Helmet from "react-helmet";
import { connect } from "react-refetch";
import { Form, withFormik } from "formik";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import Error from "../../helpers/Error";

import Messages from "../helpers/Messages";
import BirdsFieldset from "./fieldsets/BirdsFieldset";
import ContributorFieldset from "./fieldsets/ContributorFieldset";
import FurtherInformationFieldset from "./fieldsets/FurtherInformationFieldset";
import SubmitFieldset from "./fieldsets/SubmitFieldset";

import {
  initialFullValues,
  initialBirdObservationValues,
} from "../schema/initialValues";
import {
  fullValidationSchema,
  initialValidationSchema,
} from "../schema/validationSchemas";

const API_URL = `${process.env.REACT_APP_API_BASE}/report/`;

/**
  xxxxx
 */
class FormComponent extends Component {
  componentDidUpdate(prevProps) {
    // Handle react-refetch response (either successful POST or error handling for fields)
    if (this.props.postSubmissionResponse) {
      const { postSubmissionResponse } = this.props;
      const isSettled =
        postSubmissionResponse.settled &&
        prevProps.postSubmissionResponse.settled !==
          postSubmissionResponse.settled;

      // Conclude isSubmitting if either rejected or fulfilled
      if (
        (postSubmissionResponse.rejected || postSubmissionResponse.fulfilled) &&
        this.props.isSubmitting
      )
        this.props.setSubmitting(false);

      // Set formik status if API errors encountered, otherwise redirect to success page
      if (postSubmissionResponse.rejected && isSettled)
        this.props.setStatus(postSubmissionResponse.reason.cause);
      else if (postSubmissionResponse.fulfilled && isSettled)
        this.props.history.push(
          `/report/success/${postSubmissionResponse.value.id}`
        );
    }
  }

  render() {
    // Validate parameters passed via queryString
    if (!initialValidationSchema.isValidSync(this.props.queryString))
      return <Error message="Invalid or missing URL parameters" />;

    return (
      <div className="FinalDetailsForm">
        <Helmet title="2. Report Observation" />
        <section className="mb-5">
          <Form>
            <div className="container">
              <Messages {...this.props} />
              <BirdsFieldset {...this.props} />
              <ContributorFieldset {...this.props} />
              <FurtherInformationFieldset {...this.props} />
              <SubmitFieldset {...this.props} />
            </div>
          </Form>
        </section>
      </div>
    );
  }
}

/**
  Transforms initial values for the form, based on values provided via the queryString.
  Casts values as per schema (e.g. "2" -> 2), adds requisite number of birds (if not 'distant' or 'heard'), and tranforms coordinates.
 */
const computeInitialValues = (props) => {
  const { queryString } = props;
  const initialDetailsValues = initialValidationSchema.cast(queryString);

  return Object.assign({}, initialFullValues, initialDetailsValues, {
    point_location: {
      type: "Point",
      coordinates: [
        initialDetailsValues.longitude,
        initialDetailsValues.latitude,
      ],
    },
    birds:
      initialDetailsValues.observation_type === "sighted"
        ? Array(initialDetailsValues.number).fill(initialBirdObservationValues)
        : [],
    date_sighted: queryString.date_sighted, // expected as string object, not Date
  });
};

/**
  Primary submission form, using formik, yup and react-refetch
*/
const FinalDetailsForm = withFormik({
  mapPropsToValues: (props) => computeInitialValues(props),
  validationSchema: fullValidationSchema,
  handleSubmit: (values, actions) => {
    actions.props.postSubmission(Object.assign({}, values));
  },
})(FormComponent);

FinalDetailsForm.propTypes = {
  fieldOptions: PropTypes.object.isRequired,
  queryString: PropTypes.object.isRequired,
};

export default withRouter(
  connect((props) => ({
    postSubmission: (values) => ({
      postSubmissionResponse: {
        url: API_URL,
        method: "POST",
        body: JSON.stringify(values),
      },
    }),
  }))(FinalDetailsForm)
);
