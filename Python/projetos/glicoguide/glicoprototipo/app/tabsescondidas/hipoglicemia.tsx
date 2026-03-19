import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useHipo } from '../../context/HipoContext';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY ?? ''; // Configure em .env

function formatarData(data: Date) {
  return data.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export default function HipoglicemiaScreen() {
  const { hipos, adicionarHipo } = useHipo();
  const [valor, setValor] = useState('');
  const [observacao, setObservacao] = useState('');
  const [chatbotMsg, setChatbotMsg] = useState('');
  const [loadingChatbot, setLoadingChatbot] = useState(false);

  const handleSalvar = async () => {
    if (!valor) {
      Alert.alert('Erro', 'Informe o valor da hipoglicemia!');
      return;
    }
    adicionarHipo(valor, observacao);
    setValor('');
    setObservacao('');
    Alert.alert('Hipoglicemia registrada!');
    // Envia mensagem automática ao chatbot
    setLoadingChatbot(true);
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
            { role: 'system', content: `Você é um assistente de saúde para diabetes. Considere sempre as seguintes informações do usuário:\n- Fator de sensibilidade à insulina: 1 unidade de insulina reduz 15 mg/dL de glicemia\n- Idade: 12 anos\n- Faixa alvo de glicemia: 80 a 150 mg/dL\n- Medicamento em uso: Puran T4\n- Comorbidade: DM1\n- Meta de HbA1c: abaixo de 6.5% (atual: 5.3%)\n- Alimentos ingeridos recentemente: banana e maçã\nSe o usuário relatar hipoglicemia, oriente imediatamente sobre o que fazer para tratar e prevenir novos episódios, considerando o perfil acima.` },
            { role: 'user', content: `Acabei de registrar um episódio de hipoglicemia. Valor: ${valor} mg/dL. Observação: ${observacao}` }
          ],
          max_tokens: 200,
        }),
      });
      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || 'Desculpe, não consegui responder agora.';
      setChatbotMsg(botReply);
      Alert.alert('Dica do Assistente', botReply);
    } catch (e) {
      setChatbotMsg('Erro ao conectar à API.');
    }
    setLoadingChatbot(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Hipoglicemia</Text>
      <Text style={styles.label}>Valor da Glicemia (mg/dL)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 60"
        value={valor}
        onChangeText={setValor}
      />
      <Text style={styles.label}>Observação</Text>
      <TextInput
        style={[styles.input, { height: 60 }]}
        placeholder="Ex: sintomas, ações tomadas..."
        value={observacao}
        onChangeText={setObservacao}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSalvar} disabled={loadingChatbot}>
        <Text style={styles.buttonText}>{loadingChatbot ? 'Enviando...' : 'Salvar Hipoglicemia'}</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { marginTop: 30, fontSize: 18 }]}>Histórico de Hipoglicemias</Text>
      <FlatList
        data={[...hipos].reverse()}
        keyExtractor={(_, idx) => idx.toString()}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.hipoBox}>
            <Text style={styles.hipoData}>{formatarData(new Date(item.data))}</Text>
            <Text style={styles.hipoValor}>Valor: {item.valor} mg/dL</Text>
            {item.observacao ? <Text style={styles.hipoObs}>Obs: {item.observacao}</Text> : null}
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center' }}>Nenhum registro ainda.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f8fb', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { marginTop: 10, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  hipoBox: { backgroundColor: 'white', borderRadius: 8, padding: 12, marginBottom: 10, elevation: 1 },
  hipoData: { fontSize: 12, color: '#888', marginBottom: 2 },
  hipoValor: { fontSize: 15, fontWeight: 'bold', color: '#FF3B30' },
  hipoObs: { fontSize: 14, color: '#333', marginTop: 2 },
});
