// ./tabsescondidas/RegistrarGlicemiaScreen.jsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGlicemia } from '../../context/GlicemiaContext';

export default function RegistrarGlicemiaScreen() {
  const [glicemiaPre, setGlicemiaPre] = useState('');
  const [glicemiaPos, setGlicemiaPos] = useState('');
  const navigation = useNavigation();
  const { adicionarGlicemia } = useGlicemia();

  const handleSalvar = () => {
    if (!glicemiaPre || !glicemiaPos) {
      Alert.alert('Erro', 'Por favor, preencha os dois campos.');
      return;
    }
    adicionarGlicemia(glicemiaPre, glicemiaPos);
    Alert.alert('Sucesso', 'Valores de glicemia salvos com sucesso!');
    setGlicemiaPre('');
    setGlicemiaPos('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Glicemia</Text>

      <Text style={styles.label}>Glicemia Pré-prandial (mg/dL)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 90"
        value={glicemiaPre}
        onChangeText={setGlicemiaPre}
      />

      <Text style={styles.label}>Glicemia Pós-prandial (mg/dL)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 130"
        value={glicemiaPos}
        onChangeText={setGlicemiaPos}
      />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar Glicemia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f8fb' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { marginTop: 10, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    backgroundColor: 'white'
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
