import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import HeaderTemplate from "../templates/HeaderTemplate";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../contexts/UserContext';
import { Usuario } from "../../types/Usuario";
import { Picker } from '@react-native-picker/picker';


const laranja = "#FC8910";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { usuario } = useAuth();
  const [authError, setAuthError] = useState(false);

  const buscarUsuarios = async () => {
    setLoading(true);
    setAuthError(false);
    try {
      const response = await fetch("http://52.168.182.169:8081/usuario", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${usuario?.token}`,
      },
    });
        if (response.status === 403) {
        setAuthError(true);
        setLoading(false);
        return;
      }
      const data = await response.json();

      const filtrados = data.filter(
        (u: any) => u.email.toLowerCase() !== "murilocapristo"
      );

      setUsuarios(
        filtrados.map((u: any) => ({
          id: u.id,
          email: u.email,
          role: u.role,
        }))
      );
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const atualizarUsuario = async (id: number, email: string, role: string) => {
    try {
      await fetch(`http://52.168.182.169:8081/usuario/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${usuario?.token}`,
      },
      body: JSON.stringify({ email, role }),
    });

      buscarUsuarios();
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
    }
  };

  const excluirUsuario = async (id: number) => {
    Alert.alert("Confirmação", "Deseja realmente excluir este usuário?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
              await fetch(`http://52.168.182.169:8081/usuario/${id}`, {
                method: "DELETE",
                headers: {
                  "Authorization": `Bearer ${usuario?.token}`,
                },
              });
            buscarUsuarios();
          } catch (err) {
            console.error("Erro ao excluir usuário:", err);
          }
        },
      },
    ]);
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <HeaderTemplate />


      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Buscar usuário..."
          value={search}
          onChangeText={setSearch}
        />
        <AntDesign name="search1" size={26} style={{ marginRight: 10 }} />
      </View>

      {loading && !authError ? (
        <ActivityIndicator size="large" color={laranja} style={{ marginTop: 30 }} />
      ) : authError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Você não tem permissão para acessar os usuários.</Text>
        </View>
      ) : (
        <FlatList
          data={usuariosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.usuarioItem}>
              <Text>ID: {item.id}</Text>
              <TextInput
                style={styles.editInput}
                value={item.email}
                onChangeText={(text) =>
                  setUsuarios((prev) =>
                    prev.map((u) => (u.id === item.id ? { ...u, email: text } : u))
                  )
                }
              />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={item.role}
                  onValueChange={(value) =>
                    setUsuarios((prev) =>
                      prev.map((u) => (u.id === item.id ? { ...u, role: value } : u))
                    )
                  }
                  style={styles.picker}
                  mode="dropdown"
                >
                  <Picker.Item label="Admin" value="admin" />
                  <Picker.Item label="User" value="user" />
                </Picker>
              </View>
              <View style={styles.actions}>
               <TouchableOpacity
                    onPress={() => {
                      const usuarioAtual = usuarios.find((u) => u.id === item.id);
                      if (usuarioAtual) {
                        atualizarUsuario(usuarioAtual.id, usuarioAtual.email, usuarioAtual.role);
                      }
                    }}
                  >
                  <AntDesign name="checkcircle" size={24} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => excluirUsuario(item.id)} style={{ marginLeft: 10 }}>
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  searchRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 60,
  },
  input: {
    flex: 1,
    height: 40,
  },
  usuarioItem: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  editInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 6,
    marginVertical: 4,
  },
  actions: {
    flexDirection: "row",
    marginTop: 6,
  },
    errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
  pickerWrapper: {
  backgroundColor: "#fff",
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 6,
  marginVertical: 4,
},
picker: {
  height: 50,
  width: "100%",
},

});
