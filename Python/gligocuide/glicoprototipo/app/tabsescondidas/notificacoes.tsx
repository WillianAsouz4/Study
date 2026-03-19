import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';

const NOTIFICACOES_PADRAO = [
  {
    id: 'alimento',
    label: 'Lembrar de adicionar alimento',
    hora: '08:00',
    ativo: true,
  },
  {
    id: 'insulina',
    label: 'Lembrar de registrar insulina',
    hora: '12:00',
    ativo: true,
  },
  {
    id: 'progresso',
    label: 'Lembrar de manter o progresso',
    hora: '20:00',
    ativo: true,
  },
];

export default function NotificacoesScreen() {
  const [notificacoes, setNotificacoes] = useState(NOTIFICACOES_PADRAO);

  const toggleAtivo = (id: string) => {
    setNotificacoes((prev) => prev.map(n => n.id === id ? { ...n, ativo: !n.ativo } : n));
  };

  const handleSalvar = () => {
    Alert.alert('Notificações salvas!', 'Suas preferências de lembretes foram atualizadas.');
    // Aqui você pode integrar com push notification/local notification
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações e Lembretes</Text>
      {notificacoes.map((n) => (
        <View key={n.id} style={styles.notificacaoBox}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>{n.label}</Text>
            <Text style={styles.hora}>Horário: {n.hora}</Text>
          </View>
          <Switch
            value={n.ativo}
            onValueChange={() => toggleAtivo(n.id)}
            thumbColor={n.ativo ? '#007AFF' : '#ccc'}
            trackColor={{ true: '#b3e0ff', false: '#eee' }}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar Preferências</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f8fb', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  notificacaoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 16, marginBottom: 14, elevation: 1 },
  label: { fontSize: 16, fontWeight: 'bold' },
  hora: { fontSize: 13, color: '#888', marginTop: 2 },
  button: { backgroundColor: '#007AFF', marginTop: 30, padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
