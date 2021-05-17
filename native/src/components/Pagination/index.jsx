import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function Pagination({ total, prev, next, results, key = 'name', onChange }) {
  return (
    <View style={{ flex: 1 }}>
      {results?.map((item) => (
        <Text>{item[key]}</Text>
      ))}
      {prev && (
        <TouchableOpacity onPress={() => onChange(prev)}>
          <Text>Prev</Text>
        </TouchableOpacity>
      )}
      {next && (
        <TouchableOpacity onPress={() => onChange(next)}>
          <Text>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
