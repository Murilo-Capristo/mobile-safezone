import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import HeaderTemplate from "../templates/HeaderTemplate";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/RootNavigator";
import { Breed } from "../../types/Alerta"; 
import { useAuth } from '../contexts/UserContext';




type SearchScreenRouteProp = RouteProp<RootStackParamList, "SearchScreen">;

const laranja = "#FC8910";

export default function SearchScreen() {
  const navigation = useNavigation();
  const route = useRoute<SearchScreenRouteProp>();
  const [search, setSearch] = useState("");
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarRacas = async () => {
      try {
        const response = await fetch('https://dogapi.dog/api/v2/breeds');
        const json = await response.json();
        const racasFormatadas: Breed[] = json.data.map((item: any) => ({
          id: item.id,
          name: item.attributes.name,
          maleWeightMax: item.attributes.male_weight?.max ?? 0,
          hypoallergenic: item.attributes.hypoallergenic,
        }));
        setBreeds(racasFormatadas);
      } catch (error) {
        console.error('Erro ao buscar raças:', error);
      } finally {
        setLoading(false);
      }
    };

    buscarRacas();
  }, []);

  const racasFiltradas = breeds.filter((raca) =>
    raca.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Provider>
      <HeaderTemplate />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarBtn}>
          <Icon name="arrow-back" size={28} color={laranja} />
        </TouchableOpacity>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Pesquise aqui..."
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.filterButton}>
            <AntDesign name="search1" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.container2}>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Resultados</Text>
          <FlatList
            data={racasFiltradas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.resultadoItem}>
                <Text style={styles.resultadoTitulo}>{item.name}</Text>
                <Text>Peso máx. macho: {item.maleWeightMax} kg</Text>
                <Text>Hipoalergênico: {item.hypoallergenic ? "Sim" : "Não"}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  container2: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#d8d8d8",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 50,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
  },
  voltarBtn: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  resultadoItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  resultadoTitulo: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
});
