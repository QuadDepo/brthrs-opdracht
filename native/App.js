import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { FilmsProvider } from "./src/context/Films";
import { PlanetsProvider } from "./src/context/Planets";

// Import pages
import FilmsPage from "./src/pages/FilmsPage";
import FilmDetail from "./src/pages/FilmDetail";
import PlanetsPage from "./src/pages/PlanetsPage";
import PlanetDetail from "./src/pages/PlanetDetail";

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

function TabNavigtion() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          borderTopColor: "transparent",
          backgroundColor: "#0e1111",
        },
        activeTintColor: "yellow",
      }}
    >
      <Tab.Screen
        name="Films"
        component={FilmsPage}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              name="film-outline"
              type="ionicon"
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Planets"
        component={PlanetsPage}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              name="planet-outline"
              type="ionicon"
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FilmsProvider>
      <PlanetsProvider>
        <StatusBar style="light" />
        <SafeAreaProvider>
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator mode="modal">
              <Stack.Screen
                name="Tabs"
                component={TabNavigtion}
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
              <Stack.Screen
                name="PlanetDetail"
                component={PlanetDetail}
                options={{
                  headerTintColor: "#fff",
                  headerBackTitle: null,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PlanetsProvider>
    </FilmsProvider>
  );
}
