import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'formik';

import FormatDateTime from '../../../helpers/FormatDateTime';
import RenderField from '../../helpers/RenderField';

import { initialBirdObservationValues } from '../../schema/initialValues';

class RenderBirdObservation extends Component {
  render() {
    const { index, fieldOptions } = this.props;
    const name = `birds.${index}`;

    return (
      <div className="col-sm-4 col-lg-3 mb-3" key={index}>
        <div className="card card-dull">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h2 className="card-title m-0">Kākā #{index + 1}</h2>
            </li>
            <li className="list-group-item">
              <Field
                component={RenderField}
                fieldOptions={fieldOptions.banded}
                name={`${name}.banded`}
                type="choice"
                label="Banded?"
                className="custom-select-sm"
                addBlank
              />
            </li>
            <li className="list-group-item">
              <Field
                component={RenderField}
                fieldOptions={fieldOptions.band_combo}
                name={`${name}.band_combo`}
                type="text"
                label="Band combo (if known)"
                className="form-control-sm"
                addBlank
              />
            </li>
            <li className="list-group-item">
              <div className="form-row">
                <div className="col-md-6">
                  <Field
                    component={RenderField}
                    fieldOptions={fieldOptions.sex_guess}
                    name={`${name}.sex_guess`}
                    type="choice"
                    label="Sex?"
                    className="custom-select-sm"
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    component={RenderField}
                    fieldOptions={fieldOptions.life_stage_guess}
                    name={`${name}.life_stage_guess`}
                    label="Life stage?"
                    type="choice"
                    className="custom-select-sm"
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

class RenderBirdObservations extends Component {
  render() {
    const { values } = this.props;

    return (
      <div className="RenderBirdObservations">
        <div className="row">
          {values.birds &&
            values.birds.length > 0 &&
            values.birds.map((bird, index) => (
              <RenderBirdObservation index={index} {...this.props} key={index} />
            ))}
        </div>
      </div>
    );
  }
}

const BirdsFieldset = ({ fieldOptions, values }) => {
  switch (values.observation_type) {
    case 'sighted':
      return (
        <fieldset className="mb-3">
          <legend className="sr-only">Birds</legend>
          <p className="lead">
            <i className="fa-fw fas fa-feather-alt mr-2" />
            <FormatDateTime calendar>
              {values.date_sighted} {values.time_sighted}
            </FormatDateTime>
            , you {values.observation_type} {values.number} kāka:
          </p>
          <FieldArray
            initialValues={initialBirdObservationValues}
            name="birds"
            render={arrayHelpers => (
              <RenderBirdObservations
                fieldOptions={fieldOptions.birds.child.children}
                values={values}
                {...arrayHelpers}
              />
            )}
          />
        </fieldset>
      );
    default:
      return (
        <section>
          <p className="lead">
            <i className="fa-fw fas fa-feather-alt mr-2" />
            {values.number} kākā ({values.observation_type}) on{' '}
            <FormatDateTime format="longDateTime">
              {values.date_sighted} {values.time_sighted}
            </FormatDateTime>
            .
          </p>
        </section>
      );
  }
};

BirdsFieldset.propTypes = {
  fieldOptions: PropTypes.object.isRequired,
};

export default BirdsFieldset;
