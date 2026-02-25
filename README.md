# CMU_Assessment_Weather

A responsive web dashboard that consumes live country data from the REST Countries API and presents it in an interactive, user-friendly layout.

## Overview

This application demonstrates:

- API integration using fetch
- Dynamic DOM rendering
- State management in vanilla JavaScript
- Error and loading state handling
- Responsive layout design
- Data visualization using Chart.js

The goal was to transform raw API data into a structured dashboard interface with meaningful interaction.

## API Used

REST Countries  
https://restcountries.com/

Endpoint:
https://restcountries.com/v3.1/all?fields=name,region,capital,population,flags,languages,currencies,subregion

No authentication required.

## Features

- Scrollable country list with flag and region
- Detail panel showing:
  - Flag
  - Capital
  - Population
  - Region
  - Languages
  - Currencies
  -Sub-Region
- Live search filtering
- Bar chart comparing population within the same region
- Loading state
- Error state handling
- Responsive layout for mobile and desktop

## Architecture Decisions

Vanilla JavaScript was chosen to avoid build setup overhead and focus on core functionality within time constraints.

The code is structured with clear separation of concerns:

- index.html handles layout
- styles.css handles presentation
- script.js handles data fetching, transformation, and rendering

In script.js:

- fetchCountries manages API communication
- renderCountryList updates sidebar content
- renderDetails updates the detail panel
- renderChart manages Chart.js instance lifecycle
- UI helpers manage loading and error states

The original dataset is preserved in a `countries` array, while filtered results are stored separately to avoid mutating the original data.

## Error Handling

- Checks for HTTP errors using response.ok
- Displays a user-friendly error message if the API fails
- Prevents silent crashes

## Responsiveness

CSS Grid and media queries are used to:
- Display a two-column layout on desktop
- Stack sections vertically on mobile

## How to Run

Option 1:
Open with a local server (recommended).


Option 2:
Double-click `index.html` in your file explorer  

Option 3:
If using VS Code:
Use Live Server extension.


## Future Improvements

- Add pagination for large datasets
- Add region dropdown filtering
- Add sorting options
- Improve chart comparison logic
- Add unit tests
- Improve accessibility attributes
- Deploy to a live hosting platform
- Integrate with Weather API 

## Notes

All data is fetched live at runtime. No mock data is used.
