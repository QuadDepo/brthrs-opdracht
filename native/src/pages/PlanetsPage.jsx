import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { NavigationContext } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Pagination from "../components/Pagination";
// Get Planet Consts
import { GET_PLANETS } from "../const";
// Import Planet context
import { usePlanetContext } from "../context/Planets";

const styles = StyleSheet.create({
  planetWrapper: {
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
  const [page, setPage] = useState(1);
  // Get Navigation Context
  const { navigate } = useContext(NavigationContext);
  // Get state and dispatch from Film Context
  const { state, dispatch } = usePlanetContext();

  useEffect(() => {
    dispatch({ type: GET_PLANETS, payload: { climate: search, page } });
  }, [search, page]);

  useEffect(() => {
    dispatch({ type: GET_PLANETS, payload: { climate: "" } });
  }, []);

  useEffect(() => {
    setPage(1)
  }, [search])

  const Planet = ({ item }) => (
    <TouchableOpacity
      style={styles.planetItem}
      onPress={() => navigate("PlanetDetail", { id: item._id })}
    >
      <Text style={styles.planetItemText}>{item.name}</Text>
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
          placeholder="Search Climate: Arid, Temperate"
        />
        <ScrollView>
          <View style={state.planetWrapper}>
            <Pagination
              {...state.planets?.data}
              Component={Planet}
              onChange={(newPage) => setPage(newPage)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
