import * as CONST from "../const";

export const getPlanets = async ({ climate, page = 1, limit }) => {
  try {
    // Create Query String from given data
    const query = { page, limit, climate };

    // Remove undefined query params
    Object.keys(query).forEach(
      (key) => query[key] === undefined && delete query[key]
    );

    // Create URL Search Pararms
    const params = new URLSearchParams({ ...query });
    const response = await fetch(`${CONST.API_URL}/planets/?${params}`);
    const data = await response.json();

    // Dispatch SUCCESS
    return {
      type: CONST.GET_PLANETS_SUCCESS,
      payload: data,
    };
  } catch (err) {
    console.log(err);
    // Dispatch ERROR
    return {
      type: CONST.GET_PLANETS_ERROR,
    };
  }
};

export const getSinglePlanet = async ({ id }) => {
  try {
    const response = await fetch(`${CONST.API_URL}/planets//${id}`);
    const data = await response.json();

    console.log(data);

    // Dispatch SUCCESS
    return {
      type: CONST.GET_SINGLE_PLANET_SUCCESS,
      payload: data,
    };
  } catch (err) {
    console.log(err);
    // Dispatch ERROR
    return {
      type: CONST.GET_SINGLE_PLANET_ERROR,
    };
  }
};

export const getResidentsByPlanet = async ({
  id,
  page = 1,
  limit,
  filter,
  sorting,
}) => {
  try {
    // Create Query String from given data
    const query = { page, limit, ...filter, sorting };

    // Remove undefined query params
    Object.keys(query).forEach(
      (key) => query[key] === undefined && delete query[key]
    );

    // Create URL Search Pararms
    const params = new URLSearchParams({ ...query });

    const response = await fetch(
      `${CONST.API_URL}/planets/${id}/residents/?${params}`
    );
    const data = await response.json();

    // Dispatch SUCCESS
    return {
      type: CONST.GET_RESIDENTS_BY_PLANET_SUCCESS,
      payload: data,
    };
  } catch (err) {
    console.log(err);
    // Dispatch ERROR
    return {
      type: CONST.GET_RESIDENTS_BY_PLANET_ERROR,
    };
  }
};
