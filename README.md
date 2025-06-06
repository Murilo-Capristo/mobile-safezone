# 🛡️ SafeZone

> Sistema para monitoramento ambiental com integração MQTT e API REST, coletando dados de sensores e enviando alertas.

---

## 🧑‍💻 Integrantes do Grupo
- Guilherme Romanholi Santos - RM557462  
- Murilo Capristo - RM556794  
- Nicolas Guinante Cavalcanti - RM557844  

---

## 🚀 Como Rodar o Projeto?

### Backend
- Rode os comandos no arquivo Azure.txt enviado na entrega para poder detectar novos alertas:
- 
  ` O app consegue ler os apps gravados, inicie o dispositivo IoT apenas se quiser gravar novos alertas`
  
### Frontend
- Clone o repositório do app mobile :  
  `git clone https://github.com/Murilo-Capristo/mobile-safezone.git`  
- Acesse a pasta do frontend:  
  `mobile-safezone`  
- Instale dependências:  
  `npm install`  
- Inicie o app com Expo:  
  `npx expo start`  
- Abra no seu emulador ou dispositivo físico pelo QR code gerado

---

## 📱 Frontend (App Mobile)

- Desenvolvido com **React Native** usando **Expo** para facilitar o desenvolvimento e testes rápidos  
- Consome a API REST para autenticação e exibição dos dados de sensores e alertas  
- Interface simples para visualização das leituras em tempo real e histórico  
- Simulação da leitura de sensores via mock, com plano para integração futura com dispositivos Bluetooth ou leitores RFID  
- Navegação gerenciada pelo **React Navigation** (Stack)  
- Comunicação HTTP feita com **Axios**  
- Estado global gerenciado por **Context API**

---

## 🔧 Backend (API)

- Construído com **Spring Boot**  
- Endpoints REST para login, envio de leituras e alertas  
- Integração com broker MQTT para receber dados de sensores ESP32  
- Banco de dados H2 para desenvolvimento e testes  
- Segurança via JWT para autenticação e autorização  

---

## ⚙️ Tecnologias Utilizadas

- **Backend:** Java 17, Spring Boot, Spring Security, JWT, H2 Database  
- **Frontend:** React Native + Expo, React Navigation, Axios, Context API  
- **Comunicação:** MQTT (Mosquitto), HTTP REST API  
- **Hardware:** ESP32 com sensores ambientais (simulação e integração futura)  

---

## 🧩 Funcionalidades

- Autenticação via API REST  
- Recebimento e cadastro automático de leituras de sensores via MQTT  
- Envio de alertas para API REST para registro e monitoramento  
- App mobile para visualização em tempo real e histórico das leituras  
- Simulação de leitura para testes sem hardware real  
