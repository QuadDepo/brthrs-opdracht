import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { NavigationContext } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

// Get Film Consts
import { GET_FILMS } from "../const";
// Import Film context
import { useFilmContext } from "../context/Films";


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
    <TouchableOpacity onPress={() => navigate("FilmDetail", {id: _id})}>
      <Text>{item.title}</Text>
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
          data={state.films?.data?.results}
          keyExtractor={(film) => film._id}
          renderItem={flatListItem}
        />
      </SafeAreaView>
    </View>
  );
}
