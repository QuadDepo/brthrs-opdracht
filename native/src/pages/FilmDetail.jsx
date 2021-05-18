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

  const filter = {
    filterKey: "gender",
    name: "Gender",
    data: ["n/a", "male", "female"],
    onChange: (filter) => setFilters({...filters, filter})
  };

  useEffect(() => {
    // Get Single Film and Characters by Film ID
    dispatch({ type: GET_SINGLE_FILM, payload: { id } });
    dispatch({ type: GET_CHARACTERS_BY_FILM, payload: { id, page } });
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: state.film.data?.title });
  }, [state.film.data.title]);

  useEffect(() => {
    console.log(filters);
    console.log({...filters});
    dispatch({ type: GET_CHARACTERS_BY_FILM, payload: { id, page, ...filters } });
  }, [page, filters]);

  const flatListItem = ({ item }) => (
    <TouchableOpacity>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ backgroundColor: "#1C2222", flex: 1 }}>
      <SafeAreaView style={styles.page}>
        <Text style={styles.title}>{state.film.data?.title}</Text>
        <Text style={styles.opening_crawl}>
          {state.film.data?.opening_crawl}
        </Text>
        <Filter {...filter} />
        <Pagination
          {...state.characters.data}
          onChange={(newPage) => setPage(newPage)}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
