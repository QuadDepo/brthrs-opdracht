import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import Sorting from "../components/Sorting";
// Get Film Consts
import { GET_SINGLE_FILM, GET_CHARACTERS_BY_FILM } from "../const";
// Import Film context
import { useFilmContext } from "../context/Films";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
  },

  title: {
    marginBottom: 20,
    fontSize: 36,
    color: "#fff",
  },

  subTitle: {
    marginTop: 30,
    fontSize: 24,
    color: "#fff",
  },

  opening_crawl: {
    width: "100%",
    fontSize: 20,
    color: "#fff",
  },
});

export default function FilmDetail({ route, navigation }) {
  // Get Film ID
  const { id } = route.params;
  // Get state and dispatch from Film Context
  const { state, dispatch } = useFilmContext();

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState();
  const [sorting, setSorting] = useState();

  const sortingData = [
    {
      name: "Age",
      sortingKey: "age",
    },
    {
      name: "Height",
      sortingKey: "height",
    },
  ];

  const filterData = {
    name: "Gender",
    filterKey: "gender",
    data: ["n/a", "male", "female"],
    onChange: (filter) => setFilters({ ...filters, filter }),
  };

  useEffect(() => {
    // Get Single Film and Characters by Film ID
    dispatch({ type: GET_SINGLE_FILM, payload: { id } });
    dispatch({ type: GET_CHARACTERS_BY_FILM, payload: { id, page } });
  }, []);

  useEffect(() => {
    // Set movie title as page Title
    navigation.setOptions({ title: state.film.data?.title });
  }, [state.film.data.title]);

  useEffect(() => {
    dispatch({
      type: GET_CHARACTERS_BY_FILM,
      payload: { id, page, ...filters, sorting },
    });
  }, [page, sorting, filters]);

  useEffect(() => {
    // If filters change move back to page 1
    setPage(1);
  }, [filters]);

  const flatListItem = ({ item }) => (
    <TouchableOpacity>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <SafeAreaView style={styles.page}>
        <Text style={styles.title}>{state.film.data?.title}</Text>
        <Text style={styles.opening_crawl}>
          {state.film.data?.opening_crawl}
        </Text>
        <Text style={styles.subTitle}>Filters</Text>
        <Filter {...filterData} />
        <Text style={styles.subTitle}>Sort</Text>
        <Sorting
          sortingData={sortingData}
          onChange={(sort) => setSorting(sort)}
        />
        <Pagination
          {...state.characters.data}
          onChange={(newPage) => setPage(newPage)}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
