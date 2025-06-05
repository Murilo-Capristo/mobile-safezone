import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../navigation/RootNavigator";
import Modal from "react-native-modal";
import { useState } from "react";

const laranja_escuro = '#AD5900';
const laranja = "#FC8910";
const { width, height } = Dimensions.get('window');

type CadastroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cadastro'>;

export default function Cadastro() {
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmada, setSenhaConfirmada] = useState(""); 
  const [role, setRole] = useState("USER"); 

  const [isModalVisible, setModalVisible] = useState(false);

  const handleCadastro = async () => {
    if (senha !== senhaConfirmada) {

      setErrorMessage("As senhas não coincidem.");
      setErrorModalVisible(true);
      setTimeout(() => {
        setErrorModalVisible(false);
      }, 3000);
      return;
    }

    try {
      const response = await axios.post("http://52.168.182.169:8081/auth/register", {
        email,
        senha,
        role,
      });

      console.log("Cadastro realizado:", response.data);
      setModalVisible(true); // modal verde
      setTimeout(() => {
        setModalVisible(false);
        navigation.popToTop();
      }, 2000);
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      const mensagem = error?.response?.data?.message || "Erro ao cadastrar. Verifique os dados.";
      setErrorMessage(mensagem);
      setErrorModalVisible(true);
      setTimeout(() => {
        setErrorModalVisible(false);
      }, 3000);
    }
  };

  const navigation = useNavigation<CadastroScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <View>
          <TouchableOpacity>
            <Icon
              name="arrow-back-outline"
              size={30}
              color={laranja}
              style={{ marginTop: 30, marginLeft: 10 }}
              onPress={() => navigation.popToTop()} />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/Vector.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      <Text style={{ color: '#fff', fontSize: 30, fontWeight: "300" }}>
        Crie sua conta
      </Text>

      <View style={styles.formulario}>
        {/* Campo email */}
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={20} color={"#000"} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#888888"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Campo senha */}
        <View style={styles.inputContainer}>
          <Icon name="lock-closed" size={20} color={"#606060"} />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#888888"
            style={styles.input}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {/* Campo Confirmar Senha */}
        <View style={styles.inputContainer}>
          <Icon name="lock-closed" size={20} color={"#606060"} />
          <TextInput
            placeholder="Confirmar Senha"
            placeholderTextColor="#888888"
            style={styles.input}
            secureTextEntry
            value={senhaConfirmada}
            onChangeText={setSenhaConfirmada}
          />
        </View>

        {/* Role */}
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={{ flex: 1 }}
          >
            <Picker.Item label="Usuário" value="USER" />
            <Picker.Item label="Administrador" value="ADMIN" />
          </Picker>
        </View>
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.textButton}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de sucesso */}
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        backdropOpacity={0}
        style={styles.modal}
      >
        <View style={styles.modalContainerSuccess}>
          <Text style={styles.modalTitle}>Cadastro Bem-Sucedido!</Text>
        </View>
      </Modal>

      {/* Modal de erro */}
      <Modal
        isVisible={errorModalVisible}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        backdropOpacity={0}
        style={styles.modal}
      >
        <View style={styles.modalContainerError}>
          <Text style={styles.modalTitle}>{errorMessage}</Text>
        </View>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: "flex-start",
    marginTop: 90,
  },
  logo: {
    width: 300,
    height: 100,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#606060",
    borderWidth: 2,
    width: "100%",
    height: 50,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
  },
  formulario: {
    width: '70%',
    height: '50%',
    borderRadius: 20,
    paddingBottom: 100,
    justifyContent: "space-evenly",
    alignItems: 'center',
  },
  textButton: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'semibold',
  },
  button: {
    backgroundColor: laranja,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: '20%',
    alignItems: "center",
    marginBottom: 310,
    width: '80%',
  },
  modal: {
    justifyContent: "flex-start",
    margin: 0,
  },
  modalContainerSuccess: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 50,
  },
  modalContainerError: {
    backgroundColor: "#FF4C4C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 50,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
})
