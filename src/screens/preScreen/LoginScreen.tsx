import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../navigation/RootNavigator";
import Modal from "react-native-modal";
import { useState } from "react";
import { useAuth, useUser } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const laranja_escuro = '#AD5900';
const laranja = "#FC8910";
const { width, height } = Dimensions.get('window');

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;


export default function Cadastro() {
    
    const { setUsuario } = useAuth(); 
    const [usuarioInput, setUsuarioInput] = useState('');
    
    const navigation = useNavigation<LoginScreenNavigationProp>();


const handleLogin = async () => {
  const usuario = {
    user: usuarioInput.trim()
  };

  if (usuario.user) {
    await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
    setUsuario(usuario); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  }
};

return(
    <View style={styles.container}>
        <View style={{ width: '100%', alignItems: 'center',justifyContent: 'center', flexDirection: 'row'}}>
<View>
                        
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
                <Icon name="lock-closed" size={20} color={"#606060"}></Icon>
                <TextInput
                placeholder="Senha"
                placeholderTextColor="#ccc"
                style={styles.input}
            
                />
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
        borderWidth: 1,
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
})
