# kakadatabase-front (Orokonui)

A React-based tool for tracking kākā.

## Setup

You will need to have Node >= 18 installed (and pnpm). Then run:  
`pnpm install`

## Running

To run on your local machine at <http://localhost:3000/> run:  
`pnpm start`

## Building

To build the app for production use, run: `pnpm run build`

## Documentation

Some basic documentation can be generated using:
`jsdoc src/**/*.js`

## Layout

- `public/` Static HTML files included in build
- `src/` Main source code
  - `assets/` Static assets, including SCSS and logos/banners
  - `components/` View and form components
    - `birds/` Components for fetching and displaying bird information
    - `helpers/` Various helper components, including loading spinners, date formatting and field rendering
    - `map/` Map components, including Mapbox/LINZ base maps and Observation mapping
    - `observations/ Components for fetching and displaying observation information
    - `presentation/` Presentational components, including WordPress fetching
    - `report/` Observation submission form components and fieldsets
  - `views/` Layouts constructed from components

## Deploying

To deploy : `pnpm run deploy`

## Bug reports

Should be filed on the Kākā Database Trello board (not presently public)
