import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Form, withFormik } from 'formik';
import qs from 'qs';
import PropTypes from 'prop-types';

import Messages from '../helpers/Messages';
import DetailsFieldset from './fieldsets/DetailsFieldset';
import LocationFieldset from './fieldsets/LocationFieldset';
import SubmitFieldset from './fieldsets/SubmitFieldset';

import { qsOptions } from '../schema/observationParameters';
import { initialInitialValues } from '../schema/initialValues';
import { initialValidationSchema } from '../schema/validationSchemas';

/**
  Enables user to specify the conditions of thier observation.
  Submission results in an appropriately formatted query string pushed to same URL.
 */
class InitialDetailsFormComponent extends Component {
  render() {
    return (
      <div className="InitialDetailsForm">
        <Helmet title="1. Report Observation" />
        <section className="mb-5">
          <Form className="form mb-3">
            <div className="container">
              <Messages {...this.props} />
              <DetailsFieldset {...this.props} />
              <LocationFieldset {...this.props} />
              <SubmitFieldset {...this.props} />
            </div>
          </Form>
        </section>
      </div>
    );
  }
}

const InitialDetailsForm = withFormik({
  mapPropsToValues: props => initialInitialValues,
  validationSchema: initialValidationSchema,
  handleSubmit: (values, actions) => {
    const queryString = `${qs.stringify(values, qsOptions)}`;
    actions.props.history.push(`${queryString}`);
  },
})(InitialDetailsFormComponent);

InitialDetailsForm.propTypes = {
  fieldOptions: PropTypes.object.isRequired,
};

export default withRouter(InitialDetailsForm);
