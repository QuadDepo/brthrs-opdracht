import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FilmsProvider } from "./src/context/Films";

// Import pages
import FilmsPage from "./src/pages/FilmsPage";
import FilmDetail from "./src/pages/FilmDetail";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: "#1C2222",
    border: "transparent",
    background: "#1C2222",
    text: "#fff",
  },
};

// Create navigation
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function FilmStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          borderTopColor: "transparent",
          backgroundColor: "#0e1111",
        },
      }}
    >
      <Tab.Screen name="Films" component={FilmsPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FilmsProvider>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator mode="modal">
            <Stack.Screen
              name="FilmsPage"
              component={FilmStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FilmDetail"
              component={FilmDetail}
              options={{
                headerTintColor: "#fff",
                headerBackTitle: null,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </FilmsProvider>
  );
}
