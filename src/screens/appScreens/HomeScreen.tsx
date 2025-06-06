import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import HeaderTemplate from "../templates/HeaderTemplate";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import React, { useEffect, useState } from "react"; 
import { useAuth } from '../contexts/UserContext';
import { Alerta } from "../../types/Alerta"; 
import { format } from "date-fns";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

const laranja_escuro = '#AD5900';
const laranja = "#FC8910";
const laranja2 = "#ff5100";

export default function HomeScreen() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { usuario } = useAuth();
  const [hasMore, setHasMore] = useState(true);
  const [authError, setAuthError] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  

  const loadAlertas = async (pageNumber: number) => {
    setLoading(true);
    setAuthError(false);
    try {
      const response = await fetch(`http://52.168.182.169:8081/alertas?page=${pageNumber}&size=20`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario?.token}`,
        },
      });

      if (response.status === 403 || response.status === 401) {
        setAuthError(true);
        setLoading(false);
        return;
      }

      const json = await response.json();

      if (!json.content || json.content.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const parsed: Alerta[] = json.content.map((alerta: any) => ({
        id: alerta.id,
        tipo: alerta.tipo,
        descricao: alerta.descricao,
        dataHora: alerta.dataHora,
        leituraId: alerta.leituraId,
      }));
      parsed.sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime());

      if (pageNumber === 0) {
        setAlertas(parsed);
      } else {
        setAlertas((prev) => [...prev, ...parsed]);
      }
      setHasMore(json.content.length > 0);
    } catch (error) {
      console.error("Erro ao buscar alertas:", error);
    } finally {
      setLoading(false);
    }
  };
  function corDoAlerta(alerta: string): string {
  switch (alerta) {
    case "Estresse térmico alto":
      return "#e63946"; 
    case "Ambiente muito seco e quente":
      return "#f4a261"; 
    case "Risco de geada":
      return "#457b9d"; 
    case "Risco de fungos e doenças":
      return "#2a9d8f"; 
    case "Temperatura muito alta":
      return "#d90429"; 
    case "Risco de queimada":
      return "#e76f51"; 
    case "Umidade muito baixa":
      return "#f4a261"; 
    case "Congelamento possível":
      return "#73a3e6"; 
    default:
      return "#000"; 
  }
}



  useEffect(() => {
    loadAlertas(page);
  }, [page]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage(0);
      setHasMore(true);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderTemplate />

      <View style={styles.container}>
        <View style={[{ flexDirection: 'row', margin: 20 }]}>
          <Text style={[styles.subtitle, { color: '#000' }]}>Últimos</Text>
          <Text style={[styles.subtitle, { color: laranja2 }]}> Alertas</Text>
        </View>

        {loading && page === 0 ? (
          <ActivityIndicator size="large" color={laranja2} />
        ) : authError ? (
          <View style={styles.noAlertasContainer}>
            <Text style={styles.noAlertasText}>Você não tem permissão para acessar os alertas.</Text>
          </View>
        ) : alertas.length === 0 ? (
          <View style={styles.noAlertasContainer}>
            <Text style={styles.noAlertasText}>Não há alertas disponíveis no momento.</Text>
          </View>
        ) : (
          <FlatList
            data={alertas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={[styles.cardTitle, { color: corDoAlerta(item.tipo) }]}>{item.tipo}</Text>
              <Text style={styles.cardDesc}>{item.descricao}</Text>
              <Text style={styles.deviceId}>ID do dispositivo: <Text style={{ fontWeight: 'bold' }}>{item.leituraId}</Text></Text>
              <Text style={styles.date}>{format(new Date(item.dataHora), 'dd/MM/yyyy HH:mm')}</Text>
            </View>
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading && hasMore ? (
              <ActivityIndicator size="small" color={laranja2} />
            ) : null}
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
  },iconContainer: {
    height: 60,
    justifyContent: "center",
  },
  card: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#d1d1d1",
    width: 330,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
   cardDesc: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
  },
  deviceId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  date: {
    fontSize: 13,
    color: '#999',
    textAlign: 'right',
    fontStyle: 'italic',
  },
  noAlertasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAlertasText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});
