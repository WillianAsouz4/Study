import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'https://api.openai.com/v1/chat/completions'; // Exemplo: OpenAI ChatGPT
const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY ?? ''; // Configure em .env

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Olá! Sou seu assistente virtual. Como posso ajudar?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: `Você é um assistente de saúde para diabetes. Considere sempre as seguintes informações do usuário:
- Fator de sensibilidade à insulina: 1 unidade de insulina reduz 15 mg/dL de glicemia
- Idade: 12 anos
- Faixa alvo de glicemia: 80 a 150 mg/dL
- Medicamento em uso: Puran T4
- Comorbidade: DM1
- Meta de HbA1c: abaixo de 6.5% (atual: 5.3%)
- Alimentos ingeridos recentemente: banana e maçã
Se o usuário relatar hipoglicemia, oriente imediatamente sobre o que fazer para tratar e prevenir novos episódios, considerando o perfil acima.` },
            ...newMessages.map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }))
          ],
          max_tokens: 200,
        }),
      });
      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || 'Desculpe, não consegui responder agora.';
      setMessages([...newMessages, { from: 'bot', text: botReply }]);
    } catch (e) {
      setMessages([...newMessages, { from: 'bot', text: 'Erro ao conectar à API.' }]);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color="#007AFF" />
          <Text style={styles.headerText}>Assistente Virtual</Text>
        </View>

        <ScrollView style={styles.messagesContainer} contentContainerStyle={{ paddingVertical: 10 }}>
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[styles.message, msg.from === 'user' ? styles.userMessage : styles.botMessage]}
            >
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))}
          {loading && (
            <View style={[styles.message, styles.botMessage]}>
              <ActivityIndicator size="small" color="#007AFF" />
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua mensagem..."
            value={input}
            onChangeText={setInput}
            editable={!loading}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={loading}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f8fb' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerText: { fontWeight: 'bold', fontSize: 18, marginLeft: 8, color: '#007AFF' },
  messagesContainer: { flex: 1, paddingHorizontal: 12 },
  message: { marginVertical: 6, padding: 12, borderRadius: 12, maxWidth: '80%' },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#d8efff' },
  botMessage: { alignSelf: 'flex-start', backgroundColor: '#fff' },
  messageText: { fontSize: 15 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  input: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 20, padding: 10, fontSize: 15, marginRight: 8 },
  sendButton: { backgroundColor: '#007AFF', borderRadius: 20, padding: 10 },
});
