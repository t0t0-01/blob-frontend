import React, { useState, useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/screens/LoginScreen";
import AuthContext from "./src/context/AuthContext";
import SignupScreen from "./src/screens/SignupScreen";
import PhotoScreen from "./src/screens/PhotoScreen";
import TestScreen from "./src/screens/TestScreen";
import IDScreen from "./src/screens/IDScreen";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { PRIMARY_BLUE } from "./src/constants";
import SelectPersonalityScreen from "./src/screens/SelectPersonalityScreen";
import PersonalityDescriptionScreen from "./src/screens/PersonalityDescriptionScreen";
import AccountScreen from "./src/screens/AccountScreen";
import FriendsScreen from "./src/screens/FriendsScreen";
import MeetingScreen from "./src/screens/MeetingScreen";
import ZonesScreen from "./src/screens/ZonesScreen";
import VenueScreen from "./src/screens/VenueScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import BookingsScreen from "./src/screens/BookingsScreen";
import FriendProfileScreen from "./src/screens/FriendProfileScreen";
import PersonalityDashboardScreen from "./src/screens/PersonalityDashboardScreen";
import SelectInterestsScreen from "./src/screens/SelectInterestsScreen";
import MeetingChattingScreen from "./src/screens/MeetingChattingScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import RecordScreen from "./src/screens/RecordScreen";
import GiveComplimentScreen from "./src/screens/GiveComplimentScreen";

export default function App() {
  const LoginStack = createNativeStackNavigator();
  const FriendsStack = createNativeStackNavigator();
  const ZonesStack = createNativeStackNavigator();
  const MeetingStack = createNativeStackNavigator();
  const VenueStack = createNativeStackNavigator();
  const AccountStack = createNativeStackNavigator();

  const MainTab = createBottomTabNavigator();

  const [userToken, setUserToken] = useState(null);

  // Start by creating the subnavigators to nest inside the main tab navigator

  const VenueNavigator = () => {
    return (
      <VenueStack.Navigator screenOptions={{ headerShown: false }}>
        <VenueStack.Screen name="Venue" component={VenueScreen} />

        <VenueStack.Screen name="Reviews" component={ReviewScreen} />
      </VenueStack.Navigator>
    );
  };
  const FriendsNavigator = () => {
    return (
      <FriendsStack.Navigator screenOptions={{ headerShown: false }}>
        <FriendsStack.Screen name="Friends" component={FriendsScreen} />
        <FriendsStack.Screen name="Profile" component={FriendProfileScreen} />
        <FriendsStack.Screen
          name="PersDescription"
          component={PersonalityDescriptionScreen}
        />
      </FriendsStack.Navigator>
    );
  };

  const ZonesNavigator = () => {
    return (
      <ZonesStack.Navigator screenOptions={{ headerShown: false }}>
        <ZonesStack.Screen name="Venues" component={ZonesScreen} />
        <ZonesStack.Screen name="VenueNavigator" component={VenueNavigator} />
      </ZonesStack.Navigator>
    );
  };

  const MeetingNavigator = () => {
    return (
      <MeetingStack.Navigator screenOptions={{ headerShown: false }}>
        <MeetingStack.Screen name="Meeting" component={MeetingScreen} />
        <MeetingStack.Screen name="Loading" component={LoadingScreen} />
        <MeetingStack.Screen
          options={{ tabBarStyle: { display: "none" } }}
          name="Chatting"
          component={MeetingChattingScreen}
        />
        <MeetingStack.Screen name="Record" component={RecordScreen} />
        <MeetingStack.Screen
          name="Compliment"
          component={GiveComplimentScreen}
        />
      </MeetingStack.Navigator>
    );
  };

  const AccountNavigatior = () => {
    return (
      <AccountStack.Navigator screenOptions={{ headerShown: false }}>
        <AccountStack.Screen name="Account" component={AccountScreen} />
        <AccountStack.Screen
          name="Dashboard"
          component={PersonalityDashboardScreen}
        />
      </AccountStack.Navigator>
    );
  };

  const MainTabOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "Friends Hub") {
        iconName = focused ? "people" : "people-outline";
      } else if (route.name === "Zones") {
        iconName = focused ? "ios-map" : "ios-map-outline";
      } else if (route.name == "Profile") {
        iconName = focused ? "user" : "user-o";
        size = focused ? 24 : 20;
        return <FontAwesome name={iconName} size={size} color={color} />;
      } else if (route.name == "Meet & Greet") {
        iconName = focused ? "ios-home" : "ios-home-outline";
      } else if (route.name == "Plans") {
        iconName = focused ? "notebook" : "notebook-outline";
        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },

    tabBarActiveTintColor: PRIMARY_BLUE,
    tabBarInactiveTintColor: "gray",
    headerShown: false,
  });

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      <NavigationContainer>
        {userToken ? (
          <MainTab.Navigator screenOptions={MainTabOptions}>
            <MainTab.Screen
              options={{ tabBarStyle: { display: "none" } }}
              name="Meet & Greet"
              component={MeetingNavigator}
            />
            <MainTab.Screen name="Zones" component={ZonesNavigator} />
            <MainTab.Screen name="Plans" component={BookingsScreen} />
            <MainTab.Screen name="Friends Hub" component={FriendsNavigator} />
            <MainTab.Screen name="Profile" component={AccountNavigatior} />
          </MainTab.Navigator>
        ) : (
          <LoginStack.Navigator screenOptions={{ headerShown: false }}>
            {
              //<LoginStack.Screen name="Test" component={TestScreen} />
            }

            <LoginStack.Screen name="Login" component={LoginScreen} />
            <LoginStack.Screen
              name="Personality"
              component={SelectPersonalityScreen}
            />
            <LoginStack.Screen
              name="PersDescription"
              component={PersonalityDescriptionScreen}
            />

            <LoginStack.Screen name="Signup" component={SignupScreen} />
            <LoginStack.Screen name="ID" component={IDScreen} />
            <LoginStack.Screen name="Photo" component={PhotoScreen} />
            <LoginStack.Screen
              name="Interests"
              component={SelectInterestsScreen}
            />
          </LoginStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
