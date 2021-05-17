import * as CONST from "../const";

export const getFilms = async ({ title }) => {
  try {
    const params = new URLSearchParams({ title });
    const response = await fetch(`http://localhost:9000/films?${params}`);
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
    const response = await fetch(`http://localhost:9000/films/${id}`);
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
  page,
  limit,
  gender,
  sorting,
}) => {
  try {
    // Create Query String from given data
    const params = new URLSearchParams({ page, limit, gender, sorting });
    const response = await fetch(
      `http://localhost:9000/films/${id}/characters/?${params}`
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
