export function getRoutes() {
  return {
    home: "/",
    searchResults: "/search-results",
    parkDetails: "/park-details/:parkCode",
  };
}

export const PARKS_API_BASE_ROUTE = "https://developer.nps.gov/api/v1/";
export const PARKS_API_KEY = "tpKlhub2fE3bdPbvzHdMthRnjLj560SE0eLaBUKZ";

export function getActivitiesRoute() {
  return `${PARKS_API_BASE_ROUTE}activities?api_key=${PARKS_API_KEY}`;
}

export function getActivitiesSearchRoute(ids) {
  return `${PARKS_API_BASE_ROUTE}activities/parks?id=${ids}&api_key=${PARKS_API_KEY}`;
}

export function getParkDetailsRoute(parkCode) {
  return `${PARKS_API_BASE_ROUTE}parks?parkCode=${parkCode}&api_key=${PARKS_API_KEY}`;
}