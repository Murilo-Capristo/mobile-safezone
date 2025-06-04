import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../screens/preScreen/LandingScreen";
import PreCadastro from "../screens/preScreen/PreCadastroScreen";
import Login from "../screens/preScreen/LoginScreen";
import Cadastro from "../screens/preScreen/CadastroScreen";
import HomeScreen from "../screens/appScreens/HomeScreen";
import BottomTabsNavigator from "./BottomTabsNavigator";
import Users from "../screens/appScreens/Users";
import Splash from "../screens/Splash";


export type RootStackParamList = {
    Splash: undefined;
    Landing: undefined;
    PreCadastro: undefined;
    Login: undefined;
    Cadastro: undefined;
    HomeScreen: undefined;
    Users: undefined;

  };
  
  const Stack = createNativeStackNavigator<RootStackParamList>();
  
  export default function RootNavigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="PreCadastro" component={PreCadastro} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />

          <Stack.Screen 
          name="HomeScreen" 
          component={BottomTabsNavigator} 
          options={{headerShown: false}} /> 
          <Stack.Screen 
          name="Users" 
          component={Users} 
          options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
