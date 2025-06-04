import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import HeaderTemplate from "../templates/HeaderTemplate";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import React, { useEffect, useState } from "react"; 


type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;


const laranja_escuro = '#AD5900';
const laranja = "#FC8910";
const laranja2 = "#ff5100";

type Breed = {
  id: string;
  name: string;
  maleWeightMax: number;
  hypoallergenic: boolean;
}


export default function HomeScreen() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  useEffect(() => {
    fetch('https://dogapi.dog/api/v2/breeds')
    .then((response) => response.json())
    .then((json) => {
      const parsed: Breed[] = json.data.map((breed: any) => ({
        id: breed.id,
        name: breed.attributes.name,
        maleWeightMax: breed.attributes.male_weight.max,
        hypoallergenic: breed.attributes.hypoallergenic,
    }));
      setBreeds(parsed);

    })
    .catch((error) => console.error("Erro ao Buscar na API", error))
    .finally(() => setLoading(false));
  }, []);
  
  return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <HeaderTemplate></HeaderTemplate>

        <View style={styles.container}>
          <View style={[{flexDirection: 'row', margin:20}]}>
            <Text style={[styles.subtitle, { color: '#000' }]}>Últimos</Text>
            <Text style={[styles.subtitle, { color: laranja2 }]}> Alertas</Text>
          </View>

          {loading ? (
          <ActivityIndicator size="large" color={laranja2} />
        ) : (
          <FlatList
            data={breeds}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text>Peso máx. macho: {item.maleWeightMax} kg</Text>
                <Text>
                  Hipoalergênico: {item.hypoallergenic ? "Sim" : "Não"}
                </Text>
              </View>
            )}
          />
        )}
        </View>
        
      </View>
    );
 }   
        

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#d8d8d8",
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    subtitle: {


        textAlign: "center",
        fontSize: 35,
        

    },
    card: {
      padding: 20,
      marginVertical: 10, 
      borderRadius: 10,
      backgroundColor: "#b8b8b8", 
      width: "100%", 
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    
    iconContainer: {
        height: 60, 
        justifyContent: "center", 
      },
    cardTitle: {

      fontSize: 20,
      fontWeight: "bold",
      color: "#000",

    },
});