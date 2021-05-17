import React, { createContext, useContext } from "react";
import { useReducerWithSideEffects } from "use-reducer-effect";

import * as CONST from "../const";
import * as API from "../fetch/Films";

// Create Film Context
const FilmsContext = createContext();

// Set initial State
const initialState = {
  films: {
    loading: false,
    error: false,
    data: [],
  },
  film: {
    loading: false,
    error: false,
    data: {},
  },
  characters: {
    loading: false,
    error: false,
    data: [],
  },
};

// Create Film reducer
function FilmReducer(state, action) {
  switch (action.type) {
    case CONST.GET_FILMS:
      return {
        ...state,
        films: { ...state.films, loading: true, error: false },
      };
    case CONST.GET_FILMS_SUCCESS:
      return {
        ...state,
        films: { data: payload.data, loading: false, error: false },
      };
    case CONST.GET_FILMS_ERROR:
      return {
        ...state,
        films: { ...state.films, loading: false, error: true },
      };
    case CONST.GET_SINGLE_FILM:
      return {
        ...state,
        film: { ...state.film, loading: false, error: true },
      };
    case CONST.GET_SINGLE_FILM_SUCCESS:
      return {
        ...state,
        film: { data: payload.data, loading: false, error: false },
      };
    case CONST.GET_SINGLE_FILM_ERROR:
      return {
        ...state,
        film: { ...state.film, loading: false, error: true },
      };
    case CONST.GET_CHARACTERS_BY_FILM:
      return {
        ...state,
        characters: { ...state.characters, loading: false, error: true },
      };
    case CONST.GET_CHARACTERS_BY_FILM_SUCCESS:
      return {
        ...state,
        characters: { data: payload.data, loading: false, error: false },
      };
    case CONST.GET_CHARACTERS_BY_FILM_ERROR:
      return {
        ...state,
        characters: { ...state.film, loading: false, error: true },
      };
    default:
      return state;
  }
}

// Create Side Effect for Reducer actions
async function effect(state, action) {
  switch (action.type) {
    case CONST.GET_FILMS:
      return API.getFilms(action.payload);
    case GET_SINGLE_FILM:
      return API.getSingleFilm(action.payload);
    case CONST.GET_CHARACTERS_BY_FILM:
      return API.getCharactersByFilm(action.payload);
  }
}

function FilmsProvider({ children }) {
  const [state, dispatch] = useReducerWithSideEffects(
    FilmReducer,
    effect,
    initialState
  );
  const value = { state, dispatch };

  return (
    <FilmsContext.Provider value={value}>{children}</FilmsContext.Provider>
  );
}

function useFilmContext() {
  const context = useContext(FilmsContext);
  return context;
}

export { FilmsProvider, useFilmContext };
