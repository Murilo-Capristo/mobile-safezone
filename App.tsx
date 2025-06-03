import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootNavigator from "./src/navigation/RootNavigator";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider } from "./src/screens/contexts/UserContext";
import { Text, View } from "react-native";

export default function App() {
  useEffect(() => {
    const clearDetectedMotos = async () => {
      try {
        await AsyncStorage.removeItem("detectedMotos");
        console.log("Motos detectadas foram limpas ao iniciar o aplicativo.");
      } catch (error) {
        console.error("Erro ao limpar motos detectadas:", error);
      }
    };

    clearDetectedMotos();
  }, []);

  try {
    return (
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigator />
        </GestureHandlerRootView>
      </AuthProvider>
    );
  } catch (error) {
    console.error("Erro ao renderizar o app:", error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ocorreu um erro ao carregar o aplicativo.</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }
}
