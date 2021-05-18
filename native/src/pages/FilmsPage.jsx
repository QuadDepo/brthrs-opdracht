import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { NavigationContext } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// Get Film Consts
import { GET_FILMS } from "../const";
// Import Film context
import { useFilmContext } from "../context/Films";


const styles = StyleSheet.create({
  filmWrapper: {
    marginTop: 20,
    borderTopColor: "#fff",
    borderTopWidth: 1,
  },

  filmItem: {
    padding: 20,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },

  filmItemText: {
    fontSize: 20,
    color: "#fff",
  },
});



export default function FilmPage() {
  const [search, setSearch] = useState("");
  // Get Navigation Context
  const { navigate } = useContext(NavigationContext);
  // Get state and dispatch from Film Context
  const { state, dispatch } = useFilmContext();

  useEffect(() => {
    dispatch({ type: GET_FILMS, payload: { title: search } });
  }, [search]);

  useEffect(() => {
    dispatch({ type: GET_FILMS, payload: { title: "" } });
  }, []);

  const flatListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.filmItem}
      onPress={() => navigate("FilmDetail", { id: item._id })}
    >
      <Text style={styles.filmItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ backgroundColor: "#1C2222", flex: 1 }}>
      <SafeAreaView edges={["right", "top", "left"]} style={{ flex: 1 }}>
        <SearchBar
          containerStyle={{
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
            backgroundColor: "transparent",
          }}
          value={search}
          onChangeText={(text) => setSearch(text)}
          onClear={() => setSearch("")}
          placeholder="A new ... Job / Hope."
        />
        <FlatList
          style={styles.filmWrapper}
          data={state.films?.data?.results}
          keyExtractor={(film) => film._id}
          renderItem={flatListItem}
        />
      </SafeAreaView>
    </View>
  );
}
