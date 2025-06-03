import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { RootStackParamList } from "../../navigation/RootNavigator";
import Icon from "react-native-vector-icons/Ionicons";


const {width, height} = Dimensions.get('window');
const fontSizeButton = 46;
const fontSizeText = 20;
const laranja_escuro = '#AD5900';
const laranja = "#FC8910";

type PreCadastroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PreCadastro'>;
export default function PreCadastro() {
   
   const navigation = useNavigation<PreCadastroScreenNavigationProp>();

    const features = [
        "Monitoramento em tempo real",
        "Geração de alertas",
        "Distribuiçao multicanal",
        "Sugestões práticas de segurança",
      
    ]
    return (
        <ScrollView style={styles.container}>
        {/* Logo */}
        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row'}}>
          <View>
            <TouchableOpacity>
              <Icon
                name="arrow-back-outline"
                size={30}
                color={laranja_escuro}
                style={{ marginTop: 30, marginLeft: 10 }}
                onPress={() => navigation.popToTop()}/>
            </TouchableOpacity>
          </View>
          <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logo-preenchida.png")} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        </View>
        
  

        <View style={styles.heroSection}>
          <View style={{flexDirection: "row"}}>
                    <Text style={styles.title}>
                      O SafeZone é um sistema inteligente 
                      de comunicação e prevenção voltado 
                      para populações vulneráveis durante 
                      situações de emergência climática, 
                      como ondas de calor extremo e focos 
                      de incêndio.
                    </Text>

                    <View style={styles.illustrationContainer}>
        
                      <Image
                        source={require("../../../assets/Parking-rafiki.png")}
                        style={styles.illustration}
                      />
                    </View>

          </View>
          

          <Text style={styles.textBelowButton}>Novo por aqui?</Text>
          <TouchableOpacity style={styles.button}
            onPress={() => {
              navigation.push("Cadastro");

            }}>
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
          
        </View>
  

        

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <Text key={index} style={styles.featureItem}>
              • {feature}
            </Text>
          ))}
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      flex: 1,
      padding: 16,
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 20,
      flex: 1,
    },
    logo: {
      width: '100%',
      height: 90,
      marginTop: 30,

    },
    heroSection: {
      marginBottom: 30,
    },
    title: {
      fontSize: 22,
      fontWeight: "regular",
      color: "#000",
      marginBottom: 16,
      flex: 1,
      flexShrink: 1,
 
    },
    subtitle: {
      fontSize: 18,
      color: "#333",
      marginBottom: 24,
    },
    button: {
      backgroundColor: laranja,
      borderRadius: 30,
      paddingVertical: 16,
      paddingHorizontal: 32,
      alignItems: "center",
      marginBottom: 8,
    },
    buttonText: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "600",
    },
    textBelowButton: {
      fontSize: 16,
      color: "#000",
      textAlign: "center",
      marginBottom: 10,
    },
    illustrationContainer: {
      alignItems: "center",
      justifyContent: "center",

    },
    illustration: {

    },
    featuresContainer: {
      marginTop: 20,
      paddingHorizontal: 8,
    },
    featureItem: {
      fontSize: 18,
      color: "#000",
      marginBottom: 12,
    },
  });