import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
  },

  title: {
    marginBottom: 10,
    fontSize: 24,
    color: "#fff",
  },

  listItem: {
    padding: 5,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    fontSize: 16,
    color: "#fff",
  },

  paginationWrapper: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  paginationText: {
    fontSize: 16,
    color: "#fff",
  },

  paginationTextDisabled: {
      opacity: .5
  }
});

export default function Pagination({
  title,
  prev,
  next,
  results,
  key = "name",
  Component,
  onChange,
}) {
  return (
    <View style={styles.page}>
      {title && <Text style={styles.title}>{title}:</Text>}
      {results?.map((item) =>
        Component ? (
          <Component item={item} />
        ) : (
          <Text style={styles.listItem}>{item[key]}</Text>
        )
      )}
      <View style={styles.paginationWrapper}>
        <TouchableOpacity
          disabled={!prev}
          onPress={() => prev && onChange(prev)}
        >
          <Text
            style={[
              styles.paginationText,
              !prev && styles.paginationTextDisabled,
            ]}
          >
            Prev Page
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!next}
          onPress={() => next && onChange(next)}
        >
          <Text
            style={[
              styles.paginationText,
              !next && styles.paginationTextDisabled,
            ]}
          >
            Next Page
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
