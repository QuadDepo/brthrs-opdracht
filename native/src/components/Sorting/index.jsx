import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  sortingWrapper: {},

  sortingItemsWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  sortingTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: "#fff",
  },

  sortingButton: {
    width: "48%",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "yellow",
    color: "#000",
  },

  sortingButtonActive: {
    backgroundColor: "orange",
  },

  sortingButtonText: {
    textAlign: "center",
    fontSize: 12,
    color: "#000",
    textTransform: "capitalize",
  },
});

export default function sorting({ sortingData, onChange = () => {} }) {
  const [sorting, setsorting] = useState();
  const sortOrders = ["asc", "desc"];

  useEffect(() => {
    onChange(sorting);
  }, [sorting]);

  return (
    <View style={styles.sortingWrapper}>
      {sortingData.map(({ sortingKey, name }) => (
        <>
          <Text style={styles.sortingTitle}>{name}</Text>
          <View style={styles.sortingItemsWrapper}>
            {sortOrders.map((order) => (
              <TouchableOpacity
                onPress={() =>
                  setsorting(
                    sorting !== `${sortingKey}:${order}`
                      ? `${sortingKey}:${order}`
                      : undefined
                  )
                }
                style={[
                  styles.sortingButton,
                  sorting === `${sortingKey}:${order}` &&
                    styles.sortingButtonActive,
                ]}
              >
                <Text
                  style={styles.sortingButtonText}
                >{`${name} ${order}`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ))}
    </View>
  );
}
