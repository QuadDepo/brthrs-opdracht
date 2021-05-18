import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { NavigationContext } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// Get Planet Consts
import { GET_PLANETS } from "../const";
// Import Planet context
import { usePlanetContext } from "../context/Planets";

const styles = StyleSheet.create({
  planetWrapper: {
    marginTop: 20,
    borderTopColor: "#fff",
    borderTopWidth: 1,
  },

  planetItem: {
    padding: 20,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },

  planetItemText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default function PlanetsPage() {
  const [search, setSearch] = useState("");
  // Get Navigation Context
  const { navigate } = useContext(NavigationContext);
  // Get state and dispatch from Film Context
  const { state, dispatch } = usePlanetContext();

  useEffect(() => {
    dispatch({ type: GET_PLANETS, payload: { climate: search } });
  }, [search]);

  useEffect(() => {
    dispatch({ type: GET_PLANETS, payload: { climate: "" } });
  }, []);

  const flatListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.planetItem}
      onPress={() => navigate("planetDetail", { id: item._id })}
    >
      <Text style={styles.planetItemText}>{item.title}</Text>
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
          placeholder="Acid, Temperate"
        />
        <FlatList
          style={styles.planetWrapper}
          data={state.planets?.data?.results}
          keyExtractor={(planet) => planet._id}
          renderItem={flatListItem}
        />
      </SafeAreaView>
    </View>
  );
}
