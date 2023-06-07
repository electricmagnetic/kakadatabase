import moment from 'moment';

/**
  Specifies initial values for a Contributor.
  See also: contributorValidationSchema
  */
export const initialContributorValues = {
  name: '',
  email: '',
  activity: '',
  heard: '',
};

/**
  Specifies initial values for a BirdObservation.
  See also: birdObservationValidationSchema
  */
export const initialBirdObservationValues = {
  banded: '',
  band_combo: '',
  sex_guess: '',
  life_stage_guess: '',
};

/**
  Specifies values and shape for submission to API. Includes API challenge.
  See also: fullValidationSchema
  */
export const initialFullValues = {
  contributor: initialContributorValues,
  birds: [],
  comments: '',
  point_location: {
    type: 'Point',
    coordinates: [],
  },
  behaviour: '',
  challenge: 'kaka',
};

/**
  xxxxx
  */
export const initialInitialValues = {
  date_sighted: moment().format('YYYY-MM-DD'),
  time_sighted: moment('12:00', 'H:mm').format('H:mm'),
  observation_type: 'sighted',
  number: 1,
  location_details: '',
  longitude: '',
  latitude: '',
  precision: '250',
};
