import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions } from 'react-native';

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/RootNavigator";

const laranja_escuro = '#AD5900';
const laranja = "#FC8910";
const { width, height } = Dimensions.get('window');
const fontSizeButton = 46;
const fontSizeText = 20;

type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

export default function Landing() {
  const navigation = useNavigation<LandingScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Image source={require('../../../assets/Vector.png')} style={styles.logo} />
      </View>

      <View style={styles.view2}>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.push('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Novo por aqui?</Text>

        <TouchableOpacity style={styles.buttonCadastro} onPress={() => navigation.push('PreCadastro')}>
          <Text style={{ color: '#000000', fontSize: fontSizeText }}>Conecte Já</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>

      <View style={styles.footer}>
        <Image source={require('../../../assets/imagem_arvore.png')} style={styles.imagem} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    backgroundColor: laranja_escuro,
    alignItems: 'center',
    paddingHorizontal: "10%",
    paddingVertical: 10,
    marginTop: 60,
    marginBottom: 30,
    width: '80%',
  },
  footer: {
    width: '100%',

    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonCadastro: {
    borderRadius: 20,
    backgroundColor: "#ffffff",
    alignItems: 'center',
    paddingHorizontal: "10%",
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 30,
    width: '100%',
  },
  text:{
    color: '#000',
    fontSize: fontSizeText,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: fontSizeButton,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  imagem: {
    width: width * 1,
    height: height * 0.4,

  },
  logo: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    bottom: -30
  },
  view1: {
    marginBottom: 20,
    width: '100%',
    height: '20%',
    alignItems: 'center',
  },
  view2: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
