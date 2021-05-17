import React, { useState, useEffect, useContext } from "react";
import { ScrollView, FlatList, Text, TouchableOpacity } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Pagination from '../components/Pagination'

// Get Film Consts
import { GET_SINGLE_FILM, GET_CHARACTERS_BY_FILM } from "../const";
// Import Film context
import { useFilmContext } from "../context/Films";

export default function FilmDetail({ route }) {
  // Get Film ID
  const { id } = route.params;
  // Get Navigation Context
  const { navigate } = useContext(NavigationContext);
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
      <SafeAreaView style={{ flex: 1 }}>
        <Text>{state.film.data?.title}</Text>
        <Text>{state.film.data?.opening_crawl}</Text>
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
