import React from 'react';
import { Field } from 'formik';

import RenderField from '../../helpers/RenderField';

/**
  Fieldset for main details.
 */
const DetailsFieldset = ({ fieldOptions }) => (
  <fieldset className="mb-3">
    <legend className="sr-only">Observation Details</legend>
    <div className="form-sentence form-inline">
      <span className="form-word">On</span>
      <Field
        component={RenderField}
        fieldOptions={fieldOptions.date_sighted}
        name="date_sighted"
        type="date"
        tooltip
        hideLabel
      />
      <span className="form-word">at</span>
      <Field
        component={RenderField}
        fieldOptions={fieldOptions.time_sighted}
        name="time_sighted"
        type="time"
        tooltip
        hideLabel
      />
      <span className="form-word">I</span>
      <Field
        component={RenderField}
        fieldOptions={fieldOptions.observation_type}
        name="observation_type"
        type="choice"
        className="text-lowercase"
        tooltip
        hideLabel
      />
      <Field
        component={RenderField}
        fieldOptions={fieldOptions.number}
        name="number"
        type="number"
        min={1}
        tooltip
        hideLabel
        className="form-number"
      />
      <span className="form-word">kākā in this location:</span>
    </div>
  </fieldset>
);

export default DetailsFieldset;
