import React, { createContext, useContext } from "react";
import { useReducerWithSideEffects } from "use-reducer-effect";

import * as CONST from "../const";
import * as API from "../fetch/Planets";

// Create Film Context
const PlanetsContext = createContext();

// Set initial State
const initialState = {
  planets: {
    loading: false,
    error: false,
    data: {},
  },
  planet: {
    loading: false,
    error: false,
    data: {},
  },
  residenets: {
    loading: false,
    error: false,
    data: {},
  },
};

// Create PLanet reducer
function PlanetReducer(state, { type, payload }) {
  switch (type) {
    case CONST.GET_PLANETS:
      return {
        ...state,
        planets: { ...state.planets, loading: true, error: false },
      };
    case CONST.GET_PLANETS_SUCCESS:
      return {
        ...state,
        planets: { ...state.planets, data: payload, loading: false, error: false },
      };
    case CONST.GET_PLANETS_ERROR:
      return {
        ...state,
        planets: { ...state.planets, loading: false, error: true },
      };
    case CONST.GET_SINGLE_PLANET:
      return {
        ...state,
        planet: { ...state.planet, loading: false, error: true },
      };
    case CONST.GET_SINGLE_PLANET_SUCCESS:
      return {
        ...state,
        planet: { data: payload, loading: false, error: false },
      };
    case CONST.GET_SINGLE_PLANET_ERROR:
      return {
        ...state,
        planet: { ...state.planet, loading: false, error: true },
      };
    case CONST.GET_RESIDENTS_BY_PLANET:
      return {
        ...state,
        residents: { ...state.residents, loading: false, error: true },
      };
    case CONST.GET_RESIDENTS_BY_PLANET_SUCCESS:
      return {
        ...state,
        residents: { data: payload, loading: false, error: false },
      };
    case CONST.GET_RESIDENTS_BY_PLANET_ERROR:
      return {
        ...state,
        residents: { ...state.residents, loading: false, error: true },
      };
    default:
      return state;
  }
}

// Create Side Effect for Reducer actions
async function effect(state, { type, payload }) {
  switch (type) {
    case CONST.GET_PLANETS:
      return API.getPlanets(payload);
    case CONST.GET_SINGLE_PLANET:
      return API.getSinglePlanet(payload);
    case CONST.GET_RESIDENTS_BY_PLANET:
      return API.getResidentsByPlanet(payload);
  }
}

function PlanetsProvider({ children }) {
  const [state, dispatch] = useReducerWithSideEffects(
    PlanetReducer,
    effect,
    initialState
  );
  const value = { state, dispatch };

  return (
    <PlanetsContext.Provider value={value}>{children}</PlanetsContext.Provider>
  );
}

function usePlanetContext() {
  const context = useContext(PlanetsContext);
  return context;
}

export { PlanetsProvider, usePlanetContext };
