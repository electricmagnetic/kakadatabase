import React from 'react';
import { Field } from 'formik';

import RenderField from '../../helpers/RenderField';

/**
  Fieldset for optional fields.
 */
const FurtherInformationFieldset = ({ fieldOptions }) => (
  <fieldset className="mb-3">
    <legend>Further Information</legend>
    <Field
      component={RenderField}
      fieldOptions={fieldOptions.comments}
      name="comments"
      type="textarea"
      placeholder="(optional)"
    />
    <Field
      component={RenderField}
      fieldOptions={fieldOptions.behaviour}
      name="behaviour"
      type="textarea"
      placeholder="Behaviour observed? (optional)"
    />
    <div className="row">
      <div className="col-md-6">
        <Field
          component={RenderField}
          fieldOptions={fieldOptions.contributor.children.activity}
          name="contributor.activity"
          type="choice"
          helpText="(optional)"
        />
      </div>
      <div className="col-md-6">
        <Field
          component={RenderField}
          fieldOptions={fieldOptions.contributor.children.heard}
          name="contributor.heard"
          type="choice"
          label="How did you hear about this?"
          helpText="(optional)"
        />
      </div>
    </div>
  </fieldset>
);

export default FurtherInformationFieldset;
