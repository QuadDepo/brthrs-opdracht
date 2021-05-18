import React, { useState, useEffect, useContext } from "react";
import { ScrollView, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Pagination from '../components/Pagination'
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
    width: '100%',
    fontSize: 20,
    color: "#fff",
  },
});

export default function FilmDetail({ route }) {
  // Get Film ID
  const { id } = route.params;
  // Get state and dispatch from Film Context
  const { state, dispatch } = useFilmContext();

  const [page, setPage] = useState(1)

  useEffect(() => {
    // Get Single Film and Characters by Film ID
    dispatch({ type: GET_SINGLE_FILM, payload: { id } });
    dispatch({ type: GET_CHARACTERS_BY_FILM, payload: { id, page } });
  }, []);

  useEffect(() => {
    console.log(page);
    dispatch({ type: GET_CHARACTERS_BY_FILM, payload: { id, page } });
  }, [page])

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
        <Pagination
          {...state.characters.data}
          onChange={(newPage) => setPage(newPage)}
        />
        {/* <FlatList
          data={state.characters?.data}
          onEndReached={loadMore}
          onEndReachedThreshold={0.7}
          keyExtractor={(character) => character._id}
          renderItem={flatListItem}
        /> */}
      </SafeAreaView>
    </ScrollView>
  );
}
