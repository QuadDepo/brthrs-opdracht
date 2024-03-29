import * as CONST from "../const";

export const getFilms = async ({ title }) => {
  try {
    const params = new URLSearchParams({ title });
    const response = await fetch(`${CONST.API_URL}/films/?${params}`);
    const data = await response.json();

    // Dispatch SUCCESS
    return {
      type: CONST.GET_FILMS_SUCCESS,
      payload: data,
    };
  } catch (err) {
    console.log(err);
    // Dispatch ERROR
    return {
      type: CONST.GET_FILMS_ERROR,
    };
  }
};

export const getSingleFilm = async ({ id }) => {
  try {
    const response = await fetch(`${CONST.API_URL}/films/${id}`);
    const data = await response.json();

    // Dispatch SUCCESS
    return {
      type: CONST.GET_SINGLE_FILM_SUCCESS,
      payload: data,
    };
  } catch (err) {
    console.log(err);
    // Dispatch ERROR
    return {
      type: CONST.GET_SINGLE_FILM_ERROR,
    };
  }
};

export const getCharactersByFilm = async ({
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
      `${CONST.API_URL}/films/${id}/characters/?${params}`
    );
    const data = await response.json();

    // Dispatch SUCCESS
    return {
      type: CONST.GET_CHARACTERS_BY_FILM_SUCCESS,
      payload: data,
    };
  } catch (err) {
    console.log(err);
    // Dispatch ERROR
    return {
      type: CONST.GET_CHARACTERS_BY_FILM_ERROR,
    };
  }
};
