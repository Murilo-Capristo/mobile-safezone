import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../navigation/RootNavigator";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";


const laranja_escuro = '#AD5900';
const laranja = "#FC8910";
const { width, height } = Dimensions.get('window');

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;


export default function Cadastro() {
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { setUsuario } = useAuth(); 
    const [usuarioInput, setUsuarioInput] = useState('');
    const [senhaInput, setSenhaInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); 
      };

    const handleLogin = async () => {
        const usuario = {
          email: usuarioInput.trim(), 
          senha: senhaInput.trim(),  
        };

        if (!usuario.email || !usuario.senha) {
            setErrorMessage("Por favor, preencha todos os campos.");
            setErrorModalVisible(true);
            setTimeout(() => {
                setErrorModalVisible(false);
            }, 3000);
            return;
        }
          try {
            console.log("Tentando fazer login com:", usuario);
            const response = await axios.post("http://52.168.182.169:8081/auth/login", usuario);     
            console.log("Response: ", response.data);    
            const token = response.data; 
            if (token) {
                const usuarioData = { email: usuarioInput, token: token };
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('usuario', JSON.stringify(usuarioData));
                
                console.log("Token armazenado com sucesso:", token);
    
                setUsuario(usuarioData);
    
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
            } else {
                setErrorMessage("Token não encontrado na resposta.");
                setErrorModalVisible(true);
            }
    
      
          } catch (error: any) {
            console.error("Erro ao fazer login:", error);
            const errorMessage = error?.response?.data?.message || "Erro ao realizar login.";
            setErrorMessage(errorMessage);  
            setErrorModalVisible(true);    
      
            setTimeout(() => {
              setErrorModalVisible(false); 
            }, 3000);
        }
      };
      

return(
    <View style={styles.container}>
        <View style={{ width: '100%', alignItems: 'center',justifyContent: 'center', flexDirection: 'row'}}>
            <View>
                    <TouchableOpacity>
                        <Icon
                name="arrow-back-outline"
                size={30}
                color={laranja}
                style={{ marginTop: 30, marginLeft: 10 }}
                onPress={() => navigation.reset({
    index: 0,
    routes: [{ name: 'Landing' }],
  })}/>
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

            
        <View style={styles.formulario}>

                {/* Campo email */}
            <View style={styles.inputContainer}>
                <Icon name="mail-outline" size={20} color={"#606060"}></Icon>
                <TextInput
                placeholder="Email"
                placeholderTextColor="#ccc"
                style={styles.input}
                onChangeText={setUsuarioInput}
                />
            </View>
                {/* Campo senha */}
                <View style={styles.inputContainer}>
                    <Icon name="lock-closed" size={20} color={"#606060"} />
                    <TextInput
                        placeholder="Senha"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        secureTextEntry={!showPassword}
                        value={senhaInput}
                        onChangeText={setSenhaInput} 
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Icon
                        name={showPassword ? "eye-off-outline" : "eye-outline"} 
                        size={24}
                        color={"#606060"}
                        />
                    </TouchableOpacity>
                    </View>
        </View>
        <View>
            <TouchableOpacity style={[styles.button,
            { backgroundColor: usuarioInput ? laranja : laranja_escuro }]} onPress={() => {
                handleLogin();
                }}
                disabled={!usuarioInput}
                >
                <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginBottom: 30, alignItems:"center"}} onPress={() => {
            
                navigation.navigate("PreCadastro");

            }}>
            <Text style={{color:laranja, fontSize:20, fontWeight:"300"}}>
                Crie uma conta
            </Text>
        </TouchableOpacity>

        </View>
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
        // marginBottom: 20,
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



    formulario:{
        width:'70%',
        height:'30%',
        borderRadius:20,
        paddingBottom: 40,
        paddingTop: 40,

        // marginTop:200,
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom:40,
    },
    textButton:{
        color:'#000',
        fontSize:20,
        fontWeight:'semibold',
    },
    button: {
        backgroundColor: "#000",
        borderRadius: 10,
        paddingVertical: 16,
        paddingHorizontal: '20%',
        alignItems: "center",
        marginBottom: 210,
        width:'80%',
    },
    buttonGoBack: {

        position: 'absolute',
        top: 0,
        left: 0,
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
