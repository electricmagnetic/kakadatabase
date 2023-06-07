import * as yup from "yup";
import { maximumBirdObservations } from "./observationParameters";

const requiredMessage = "This field is required.";
const notNumber = "This field must be a number.";
const emailInvalid = "Invalid email address.";
const formatInvalid = "Date format invalid, please adjust.";
const minDateInvalid = "Date too old, please adjust.";
const maxDateInvalid = "Date must be today or earlier.";
const maxBirdObservationMessage =
  "You have reached the maximum of birds permitted.";
const invalidLongitude = "Longitude must be between -180 and 180.";
const invalidLatitude = "Latitude must be between -90 and 90.";
const invalidNumber = "You must have seen at least one bird.";

/**
  Specifies validation of contributor.
  */
export const contributorValidationSchema = yup
  .object({
    name: yup.string().required(requiredMessage),
    email: yup.string().email(emailInvalid).required(requiredMessage),
    activity: yup.string(),
    heard: yup.string(),
  })
  .required()
  .strict()
  .noUnknown();

/**
  Specifies validation of nested object xxxxx in URL parameters.
  */
export const birdObservationValidationSchema = yup
  .object()
  .shape({
    banded: yup.string().required(requiredMessage),
    band_combo: yup.string(),
    sex_guess: yup.string(),
    life_stage_guess: yup.string(),
  })
  .strict()
  .noUnknown();

/**
  Specifies full validation schema for form.
  Values are also verified by API, yup is used to provide immediate (async) feedback to users.
  Defined by what is expected by the API (e.g. date_sighted as a string, not Date object).
  */
export const fullValidationSchema = yup
  .object({
    contributor: contributorValidationSchema.required(requiredMessage),
    date_sighted: yup.string().required(requiredMessage),
    time_sighted: yup.string().required(requiredMessage),
    birds: yup
      .array()
      .of(birdObservationValidationSchema)
      .max(maximumBirdObservations, maxBirdObservationMessage),
    comments: yup.string(),
    observation_type: yup.string().required(requiredMessage),
    point_location: yup.object({
      type: yup
        .string()
        .matches(/(Point)/)
        .required(),
      coordinates: yup
        .array()
        .of(yup.number().min(-180).max(180).typeError(notNumber))
        .required(),
    }),
    precision: yup.number().typeError(notNumber),
    number: yup
      .number()
      .min(1, invalidNumber)
      .typeError(notNumber)
      .required(requiredMessage),
    location_details: yup.string(),
    behaviour: yup.string(),
    challenge: yup
      .string()
      .matches(/(kaka)/)
      .required(),
  })
  .required()
  .strict()
  .noUnknown();

/**
  xxxxx
  */
export const initialValidationSchema = yup
  .object({
    date_sighted: yup
      .date()
      .min(new Date("1970-01-01").toString(), minDateInvalid)
      .max(new Date().toString(), maxDateInvalid)
      .typeError(formatInvalid)
      .required(requiredMessage),
    time_sighted: yup
      .string()
      .matches(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/, formatInvalid)
      .required(),
    observation_type: yup.string().required(requiredMessage),
    number: yup
      .number()
      .min(1, invalidNumber)
      .typeError(notNumber)
      .required(requiredMessage),
    location_details: yup.string(),
    longitude: yup
      .number()
      .min(-180, invalidLongitude)
      .max(180, invalidLongitude)
      .typeError(notNumber)
      .required(requiredMessage),
    latitude: yup
      .number()
      .min(-90, invalidLatitude)
      .max(90, invalidLatitude)
      .typeError(notNumber)
      .required(requiredMessage),
    precision: yup.number().typeError(notNumber),
  })
  .required()
  .noUnknown();
