# 🩺 GlicoGuide - Aplicativo de Monitoramento de Glicemia

<div align="center">
  <img src="glicoprototipo/assets/images/icon.png" alt="GlicoGuide Logo" width="120"/>
  
  **Aplicativo móvel para monitoramento inteligente de glicemia**
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.79.3-blue.svg)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-~53.0.11-black.svg)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-blue.svg)](https://www.typescriptlang.org/)
</div>

## 📱 Sobre o Projeto

O **GlicoGuide** é um aplicativo móvel desenvolvido para ajudar pessoas com diabetes a monitorar sua glicemia de forma inteligente e prática. O app oferece recursos avançados como scanner de alimentos, gráficos interativos, sistema de gamificação e alertas personalizados.

### ✨ Principais Funcionalidades

- 📊 **Monitoramento de Glicemia**: Registro e acompanhamento dos níveis de glicose
- 📷 **Scanner de Alimentos**: Reconhecimento automático de alimentos via câmera
- 📈 **Gráficos Interativos**: Visualização de dados com gráficos avançados
- 🏆 **GlicoPoints**: Sistema de gamificação para motivar o usuário
- 🤖 **Chatbot Integrado**: Assistente virtual para dúvidas e orientações
- 🚨 **Alertas de Hipoglicemia**: Notificações personalizadas de emergência
- 🍎 **Registro de Alimentos**: Cadastro detalhado da alimentação
- 👤 **Perfil Personalizado**: Gerenciamento de dados pessoais
- 📊 **Exportação de Dados**: Relatórios em formato CSV
- 🔔 **Notificações**: Lembretes e alertas importantes

## 🛠️ Tecnologias

<table>
  <tr>
    <td align="center">
      <img src="https://reactnative.dev/img/header_logo.svg" width="40" height="40"/><br>
      <strong>React Native</strong>
    </td>
    <td align="center">
      <img src="https://github.com/expo/expo/raw/main/expo.png" width="40" height="40"/><br>
      <strong>Expo</strong>
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" width="40" height="40"/><br>
      <strong>TypeScript</strong>
    </td>
    <td align="center">
      <img src="https://reactjs.org/logo-og.png" width="40" height="40"/><br>
      <strong>React</strong>
    </td>
  </tr>
</table>

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn
- Expo CLI
- Expo Go app (para testes no dispositivo)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/WillianAsouz4/gligocuide.git
cd glicoguidetest
```

2. **Navegue para o diretório do projeto**
```bash
cd glicoprototipo
```

3. **Instale as dependências**
```bash
npm install
```

4. **Inicie o servidor de desenvolvimento**
```bash
npx expo start
```

### Executar em Diferentes Plataformas

```bash
# Android
npx expo start --android

# iOS (apenas macOS)
npx expo start --ios

# Web
npx expo start --web
```

## 📁 Estrutura do Projeto

```
glicoprototipo/
├── app/                    # Rotas e telas principais
│   ├── (tabs)/            # Navegação por tabs
│   │   ├── index.tsx      # Tela inicial
│   │   ├── Glicemia.tsx   # Monitoramento de glicemia
│   │   └── Perfil.tsx     # Perfil do usuário
│   ├── tabsescondidas/    # Telas secundárias
│   │   ├── escanear.jsx   # Scanner de alimentos
│   │   ├── graficos.tsx   # Gráficos e relatórios
│   │   ├── chatbot.tsx    # Assistente virtual
│   │   └── registrar.tsx  # Registro de dados
│   └── _layout.tsx        # Layout principal
├── components/            # Componentes reutilizáveis
├── context/              # Context API (estado global)
├── assets/               # Imagens, fontes e recursos
├── constants/            # Constantes e configurações
└── utils/               # Utilitários e helpers
```

## 🎯 Funcionalidades em Destaque

### 📊 Dashboard Inteligente
- Visualização em tempo real dos níveis de glicemia
- Gráficos interativos com histórico
- Indicadores visuais de status

### 📷 Scanner Inteligente
- Reconhecimento automático de alimentos
- Cálculo automático de carboidratos
- Base de dados nutricional integrada

### 🏆 Sistema de Gamificação
- Pontuação por metas atingidas
- Conquistas e troféus
- Ranking de progresso

### 🤖 Assistente Virtual
- Chatbot com IA para dúvidas
- Orientações personalizadas
- Suporte 24/7

## 📊 Screenshots

<div align="center">
  <img src="docs/screenshots/home.png" width="200" alt="Tela Inicial"/>
  <img src="docs/screenshots/scanner.png" width="200" alt="Scanner"/>
  <img src="docs/screenshots/charts.png" width="200" alt="Gráficos"/>
  <img src="docs/screenshots/profile.png" width="200" alt="Perfil"/>
</div>

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Willian Souza**
- GitHub: [@WillianAsouz4](https://github.com/WillianAsouz4)
- LinkedIn: [Willian Souza](https://linkedin.com/in/willian-souza)

## 📞 Suporte

Para suporte, envie um email para: suporte@glicoguide.com

---

<div align="center">
  <strong>Feito com ❤️ para a comunidade diabética</strong>
</div>