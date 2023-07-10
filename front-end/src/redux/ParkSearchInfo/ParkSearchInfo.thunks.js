import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getActivities,
  getParksByPreferences,
  getParksByProximity,
} from "../../services/park-service";
import { Z_TO_A_SORTING } from "./ParkSearchInfo.slice";

export const fetchParkActivities = createAsyncThunk(
  "parkSearchInfo/fetchParkActivities",
  async () => {
    const activitiesRes = await getActivities();
    return activitiesRes.data;
  }
);

export const searchForParks = createAsyncThunk(
  "parkSearchInfo/searchForParks",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    console.log("this is the state:", state);
    let res;
    if (state.parkSearchInfo.searchMode === "PREFERENCES") {
      let sort =
        state.parkSearchInfo.sortDir === Z_TO_A_SORTING ? "&sortBy=desc" : "";
      res = await getParksByPreferences(
        state.parkSearchInfo.searchActivities
          .map((activity) => `&activities[]=${activity.label}`)
          .join(""),
        state.parkSearchInfo.searchStates.value,
        state.parkSearchInfo.searchAmenities
          .map((amenity) => `&amenities[]=${amenity.label}`)
          .join(""),
        sort
      );
    } else {
      console.log(
        "Search city",
        state.parkSearchInfo.searchCity,
        state.parkSearchInfo.searchDistance
      );
      res = await getParksByProximity(
        state.parkSearchInfo.searchCity.split(", ")[0],
        state.parkSearchInfo.searchCity.split(", ")[1],
        state.parkSearchInfo.searchDistance
      );
    }

    console.log("RES ", res);
    // const res = await getParksByActivity(state.parkSearchInfo.searchActivities);
    return res.data;
  }
);