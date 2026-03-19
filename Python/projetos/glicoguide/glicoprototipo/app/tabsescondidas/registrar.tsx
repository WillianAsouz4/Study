import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAlimento } from '../../context/AlimentoContext';

const ALIMENTOS_LISTA = [
  { nome: 'Maçã', carboPor100g: 15, colherSopa: 10 },
  { nome: 'Banana', carboPor100g: 22, colherSopa: 12 },
  { nome: 'Arroz branco', carboPor100g: 28, colherSopa: 5 },
  { nome: 'Pão francês', carboPor100g: 50, colherSopa: 12 },
  { nome: 'Batata doce', carboPor100g: 20, colherSopa: 7 },
  { nome: 'Frango grelhado', carboPor100g: 0, colherSopa: 0 },
  { nome: 'Feijão', carboPor100g: 14, colherSopa: 2 },
  { nome: 'Ovo cozido', carboPor100g: 1, colherSopa: 0.5 },
  { nome: 'Iogurte natural', carboPor100g: 4, colherSopa: 1 },
  { nome: 'Aveia', carboPor100g: 66, colherSopa: 10 },
];

const UNIDADES = [
  { label: 'g', value: 'g' },
  { label: 'colher(es) de sopa', value: 'colher' },
  { label: 'unidade(s)', value: 'unidade' },
];

function calcularCarboidratos(alimento: { nome: string; carboPor100g: number; colherSopa: number } | undefined, quantidade: string, unidade: string): string {
  const qtd = parseFloat(quantidade.replace(',', '.'));
  if (!alimento || isNaN(qtd)) return '';
  if (unidade === 'g') {
    return ((alimento.carboPor100g * qtd) / 100).toFixed(1);
  } else if (unidade === 'colher') {
    return (alimento.colherSopa * qtd).toFixed(1);
  } else if (unidade === 'unidade') {
    // Considera 1 unidade = 100g para cálculo padrão, pode ser ajustado conforme necessidade
    return ((alimento.carboPor100g * qtd)).toFixed(1);
  }
  return '';
}

export default function RegistrarAlimentoScreen() {
  const navigation = useNavigation();
  const { adicionarAlimento } = useAlimento();

  const [alimentos, setAlimentos] = useState([
    { nome: ALIMENTOS_LISTA[0].nome, quantidade: '', unidade: 'g', carboidratos: '', observacoes: '' },
  ]);

  const handleChange = (idx: number, field: keyof typeof alimentos[0], value: string) => {
    setAlimentos((prev) => {
      const novo = [...prev];
      (novo[idx] as any)[field] = value;
      // Atualiza carboidratos automaticamente
      if (field === 'nome' || field === 'quantidade' || field === 'unidade') {
        const alimentoObj = ALIMENTOS_LISTA.find(a => a.nome === novo[idx].nome);
        novo[idx].carboidratos = calcularCarboidratos(alimentoObj, novo[idx].quantidade, novo[idx].unidade);
      }
      return novo;
    });
  };

  const handleAddAlimento = () => {
    setAlimentos((prev) => [
      ...prev,
      { nome: ALIMENTOS_LISTA[0].nome, quantidade: '', unidade: 'g', carboidratos: '', observacoes: '' },
    ]);
  };

  const handleRemoveAlimento = (idx: number) => {
    setAlimentos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSalvar = () => {
    const validos = alimentos.filter(a => a.nome && a.quantidade && a.carboidratos);
    if (validos.length === 0) {
      Alert.alert('Preencha todos os campos obrigatórios!');
      return;
    }
    validos.forEach(adicionarAlimento);
    Alert.alert('Alimentos salvos com sucesso!');
    setAlimentos([
      { nome: ALIMENTOS_LISTA[0].nome, quantidade: '', unidade: 'g', carboidratos: '', observacoes: '' },
    ]);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Registrar Alimento</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            {alimentos.map((alimento, idx) => {
              const alimentoObj = ALIMENTOS_LISTA.find(a => a.nome === alimento.nome);
              return (
                <View key={idx} style={styles.alimentoBox}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.label}>Alimento {idx + 1}</Text>
                    {alimentos.length > 1 && (
                      <TouchableOpacity onPress={() => handleRemoveAlimento(idx)}>
                        <Ionicons name="trash-outline" size={20} color="#d00" />
                      </TouchableOpacity>
                    )}
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerBox} contentContainerStyle={{paddingVertical: 2}}>
                    {ALIMENTOS_LISTA.map((item) => (
                      <TouchableOpacity
                        key={item.nome}
                        style={[styles.pickerItem, alimento.nome === item.nome && styles.pickerItemSelected]}
                        onPress={() => handleChange(idx, 'nome', item.nome)}
                      >
                        <Text style={{ color: alimento.nome === item.nome ? '#fff' : '#007AFF', fontSize: 14 }}>{item.nome}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      placeholder="Quantidade"
                      value={alimento.quantidade}
                      onChangeText={text => handleChange(idx, 'quantidade', text)}
                      keyboardType="numeric"
                    />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.unidadeBox} contentContainerStyle={{paddingVertical: 2}}>
                      {UNIDADES.map(u => (
                        <TouchableOpacity
                          key={u.value}
                          style={[styles.unidadeItem, alimento.unidade === u.value && styles.unidadeItemSelected]}
                          onPress={() => handleChange(idx, 'unidade', u.value)}
                        >
                          <Text style={{ color: alimento.unidade === u.value ? '#fff' : '#007AFF', fontSize: 13 }}>{u.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                  <Text style={styles.label}>Carboidratos (g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Carboidratos"
                    keyboardType="numeric"
                    value={alimento.carboidratos}
                    onChangeText={text => handleChange(idx, 'carboidratos', text)}
                  />
                  <Text style={styles.label}>Observações</Text>
                  <TextInput
                    style={[styles.input, { height: 60 }]}
                    placeholder="Adicione observações"
                    multiline
                    value={alimento.observacoes}
                    onChangeText={text => handleChange(idx, 'observacoes', text)}
                  />
                </View>
              );
            })}
            <TouchableOpacity style={styles.addButton} onPress={handleAddAlimento}>
              <Ionicons name="add-circle-outline" size={22} color="#007AFF" />
              <Text style={{ color: '#007AFF', marginLeft: 6, fontWeight: 'bold' }}>Adicionar alimento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSalvar}>
              <Text style={styles.buttonText}>Salvar Alimentos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f8fb', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 12 },
  form: { backgroundColor: 'white', padding: 20, borderRadius: 12 },
  label: { fontWeight: 'bold', marginTop: 10, marginBottom: 4 },
  input: { backgroundColor: '#f0f0f0', borderRadius: 8, padding: 10, marginBottom: 8 },
  button: { backgroundColor: '#007AFF', marginTop: 20, padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  pickerBox: { flexDirection: 'row', flexWrap: 'nowrap', marginBottom: 8, maxWidth: '100%' },
  pickerItem: { borderWidth: 1, borderColor: '#007AFF', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 14, margin: 4 },
  pickerItemSelected: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  addButton: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10, alignSelf: 'flex-start' },
  alimentoBox: { marginBottom: 18, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
  unidadeBox: { flexDirection: 'row', marginLeft: 8, flexWrap: 'nowrap', maxWidth: '60%' },
  unidadeItem: { borderWidth: 1, borderColor: '#007AFF', borderRadius: 12, paddingVertical: 4, paddingHorizontal: 10, marginLeft: 4 },
  unidadeItemSelected: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
});
