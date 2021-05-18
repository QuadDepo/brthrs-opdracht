import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  filterWrapper: {},

  filterItemsWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  filterTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: "#fff",
  },

  filterButton: {
    width: "30%",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "yellow",
    color: "#000",
  },

  filterButtonActive: {
    backgroundColor: "orange",
  },

  filterButtonText: {
    textAlign: "center",
    fontSize: 12,
    color: "#000",
    textTransform: "capitalize",
  },
});

export default function Filter({ filterKey, name, data, onChange = () => {} }) {
  const [filter, setFilter] = useState();

  useEffect(() => {
    onChange({ [filterKey]: filter });
  }, [filter]);

  return (
    <View style={styles.filterWrapper}>
      <Text style={styles.filterTitle}>{name}</Text>
      <View style={styles.filterItemsWrapper}>
        {data.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setFilter(filter !== item ? item : '' )}
            style={[
              styles.filterButton,
              filter === item && styles.filterButtonActive,
            ]}
          >
            <Text style={styles.filterButtonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
