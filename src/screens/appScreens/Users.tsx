import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import HeaderTemplate from "../templates/HeaderTemplate";
import { useNavigation } from "@react-navigation/native";

interface Usuario {
  id: number;
  email: string;
  role: string;
}

const laranja = "#FC8910";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const buscarUsuarios = async () => {
    try {
      const response = await fetch("http://52.168.182.169:8081/usuario");
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
        headers: { "Content-Type": "application/json" },
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
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarBtn}>
        <Icon name="arrow-back" size={28} color={laranja} />
      </TouchableOpacity>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Buscar usuário..."
          value={search}
          onChangeText={setSearch}
        />
        <AntDesign name="search1" size={26} style={{ marginRight: 10 }} />
      </View>

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
            <TextInput
              style={styles.editInput}
              value={item.role}
              onChangeText={(text) =>
                setUsuarios((prev) =>
                  prev.map((u) => (u.id === item.id ? { ...u, role: text } : u))
                )
              }
            />
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => atualizarUsuario(item.id, item.email, item.role)}>
                <AntDesign name="checkcircle" size={24} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirUsuario(item.id)} style={{ marginLeft: 10 }}>
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  voltarBtn: { position: "absolute", top: 10, left: 10, zIndex: 1 },
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
});
