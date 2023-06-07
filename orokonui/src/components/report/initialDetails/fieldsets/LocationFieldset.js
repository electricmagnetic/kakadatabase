import React from 'react';
import { Field } from 'formik';

import MapSelector from '../../helpers/MapSelector';
import RenderField from '../../helpers/RenderField';

/**
  Fieldset for location details.
 */
const LocationFieldset = ({ fieldOptions, ...others }) => (
  <fieldset className="mb-3">
    <legend className="sr-only">Location Details</legend>
    <MapSelector {...others} />
    <div className="row">
      <div className="col-6 col-sm-4">
        <Field component={RenderField} name="longitude" type="text" label="Longitude" />
      </div>
      <div className="col-6 col-sm-4">
        <Field component={RenderField} name="latitude" type="text" label="Latitude" />
      </div>
      <div className="col-sm-4">
        <Field
          component={RenderField}
          name="precision"
          type="choice"
          label="Precision"
          fieldOptions={fieldOptions.precision}
        />
      </div>
    </div>
    <Field
      component={RenderField}
      fieldOptions={fieldOptions.location_details}
      name="location_details"
      type="textarea"
      placeholder="Location details (optional)"
    />
  </fieldset>
);

export default LocationFieldset;
