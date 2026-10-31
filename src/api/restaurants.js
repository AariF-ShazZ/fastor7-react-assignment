import api from "./client";

const CITY_ID = 118;
export const fetchRestaurants = (page = 1) => api.get("/v1/m/restaurant", { params: { city_id: CITY_ID,page_no: page } });