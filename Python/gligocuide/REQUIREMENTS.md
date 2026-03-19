# GlicoProtótipo - Requisitos e Dependências

## 📋 Descrição
Aplicativo móvel para monitoramento de glicemia desenvolvido com React Native e Expo.

## 🛠️ Tecnologias Utilizadas

### Framework Principal
- **React Native**: 0.79.3
- **React**: 19.0.0
- **Expo**: ~53.0.11

### Navegação
- **@react-navigation/bottom-tabs**: ^7.3.10
- **@react-navigation/elements**: ^2.3.8
- **@react-navigation/native**: ^7.1.6
- **expo-router**: ~5.1.0

### UI e Gráficos
- **@expo/vector-icons**: ^14.1.0
- **victory-native**: ^41.17.4
- **react-native-svg**: ^7.2.1
- **react-native-svg-charts**: ^5.4.0
- **d3-scale**: ^4.0.2

### Funcionalidades Expo
- **expo-camera**: ~16.1.8 (Scanner de alimentos)
- **expo-image-picker**: ~16.1.4 (Seleção de imagens)
- **expo-blur**: ~14.1.5 (Efeitos visuais)
- **expo-haptics**: ~14.1.4 (Feedback tátil)
- **expo-font**: ~13.3.1 (Gerenciamento de fontes)
- **expo-image**: ~2.3.0 (Otimização de imagens)
- **expo-linking**: ~7.1.5 (Deep linking)
- **expo-splash-screen**: ~0.30.9 (Tela de splash)
- **expo-status-bar**: ~2.2.3 (Barra de status)
- **expo-symbols**: ~0.4.5 (Ícones do sistema)
- **expo-system-ui**: ~5.0.8 (Interface do sistema)
- **expo-web-browser**: ~14.1.6 (Navegador web integrado)
- **expo-constants**: ~17.1.6 (Constantes do dispositivo)

### Componentes Nativos
- **react-native-gesture-handler**: ~2.24.0
- **react-native-reanimated**: ~3.17.4
- **react-native-safe-area-context**: 5.4.0
- **react-native-screens**: ~4.11.1
- **react-native-webview**: 13.13.5

### Web Support
- **react-dom**: 19.0.0
- **react-native-web**: ~0.20.0

## 🔧 Ferramentas de Desenvolvimento

### TypeScript e Linting
- **TypeScript**: ~5.8.3
- **@types/react**: ~19.0.10
- **ESLint**: ^9.25.0
- **eslint-config-expo**: ~9.2.0

### Build e Compilação
- **@babel/core**: ^7.25.2

## 📦 Pré-requisitos do Sistema

### Software Necessário
- **Node.js**: v16 ou superior (recomendado v18+)
- **npm**: v8 ou superior
- **Expo CLI**: Instalado globalmente ou via npx

### Para Desenvolvimento Mobile
- **Android Studio** (para Android)
- **Xcode** (para iOS - apenas macOS)
- **Expo Go App** (para testes rápidos)

### Para Desenvolvimento Web
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)

## 🚀 Comandos de Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npx expo start

# Executar no Android
npx expo start --android

# Executar no iOS
npx expo start --ios

# Executar na web
npx expo start --web

# Linter
npm run lint
```

## 📱 Funcionalidades do App

### Principais Features
- ✅ Monitoramento de glicemia
- ✅ Scanner de alimentos (câmera)
- ✅ Gráficos e visualizações
- ✅ Sistema de pontos (GlicoPoints)
- ✅ Chatbot integrado
- ✅ Alertas de hipoglicemia
- ✅ Registro de alimentos
- ✅ Perfil do usuário
- ✅ Notificações
- ✅ Exportação de dados (CSV)

### Arquitetura
- **Context API** para gerenciamento de estado
- **Expo Router** para navegação
- **TypeScript** para tipagem
- **Componentes reutilizáveis**

## 🔐 Configurações de Ambiente

### Variáveis de Ambiente (se necessário)
```env
# Adicionar em .env (se houver APIs externas)
API_URL=your_api_url
API_KEY=your_api_key
```

## 📄 Licença
Projeto privado - Todos os direitos reservados

## 👥 Desenvolvimento
- Framework: React Native + Expo
- Linguagem: TypeScript/JavaScript
- Plataformas: Android, iOS, Web