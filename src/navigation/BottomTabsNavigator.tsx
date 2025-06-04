
import Icon from "react-native-vector-icons/AntDesign";
import IconFeather from "react-native-vector-icons/Feather";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/appScreens/HomeScreen";
import SubmitScreen from "../screens/appScreens/SubmitScreen";
import SearchScreen from "../screens/appScreens/Users";

const Tab = createBottomTabNavigator();
const laranja_escuro = '#AD5900';
const laranja = "#FC8910";
const vermelho = "#AF0000"
export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          if (route.name === 'Home') {
            return (
              <Icon
                name="home"
                size={32}
                color={color}
                style={{ marginBottom: -4 }}
              />
            );
          } else if (route.name === 'Search') {
            return (
              <IconFeather
                name="users"
                size={32}
                color={color}
                style={{ marginBottom: -4 }}
              />
            );
          }},
        tabBarActiveTintColor: vermelho,
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#DCDEDF',
          height: 70, 
        },
        tabBarItemStyle: {
            backgroundColor: laranja,
            height: 70,
            paddingTop: 10,
            paddingBottom: 10,
          },

        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}