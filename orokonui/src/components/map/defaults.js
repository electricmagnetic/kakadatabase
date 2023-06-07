import { latLng, latLngBounds } from 'leaflet';

/**
  Default map bounds of New Zealand.
 */
export const DEFAULT_BOUNDS = latLngBounds(latLng(-48.25, 166.1), latLng(-34, 178.9));

/**
  Default zoom level, approximate for New Zealand based on typical map sizes.
 */
export const DEFAULT_ZOOM = 6;

/**
  Zoom level once point specified.
 */
export const POINT_ZOOM = 13;
