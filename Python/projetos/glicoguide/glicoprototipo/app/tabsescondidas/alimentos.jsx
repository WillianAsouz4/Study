import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAlimento } from '../../context/AlimentoContext';

export default function AlimentosScreen() {
  const { alimentos, removerAlimento } = useAlimento();
  const [searchQuery, setSearchQuery] = useState('');

  // Função para buscar alimento
  const buscarAlimento = (alimento) => {
    return alimento.nome.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contagem de Carboidratos</Text>
      </View>

      {/* Busca */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar alimento..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Categorias */}
      <Text style={styles.sectionTitle}>Categorias</Text>
      <View style={styles.categoriesRow}>
        <Category label="Frutas" emoji="🍎" />
        <Category label="Vegetais" emoji="🥦" />
        <Category label="Grãos" emoji="📦" />
        <Category label="Proteínas" emoji="🥩" />
      </View>

      {/* Alimentos Recentes */}
      <Text style={styles.sectionTitle}>Alimentos Recentes</Text>
      {alimentos.length === 0 ? (
        <Text style={{ color: '#888', marginBottom: 8 }}>Nenhum alimento registrado ainda.</Text>
      ) : (
        alimentos.filter(buscarAlimento).map((alimento, idx) => (
          <FoodItem
            key={idx}
            name={alimento.nome}
            portion={alimento.quantidade}
            carbs={alimento.carboidratos + 'g'}
            onRemove={() => {
              Alert.alert('Remover alimento', 'Deseja remover este alimento?', [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Remover', style: 'destructive', onPress: () => removerAlimento(idx) },
              ]);
            }}
          />
        ))
      )}

      {/* Total de carboidratos */}
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total de carboidratos</Text>
        <Text style={styles.totalValue}>{alimentos.reduce((acc, a) => acc + (parseFloat(a.carboidratos) || 0), 0)}g</Text>
      </View>
    </ScrollView>
  );
}

function Category({ emoji, label }) {
  return (
    <View style={styles.categoryCircle}>
      <Text style={{ fontSize: 22 }}>{emoji}</Text>
      <Text style={{ fontSize: 12, marginTop: 4 }}>{label}</Text>
    </View>
  );
}

function FoodItem({ name, portion, carbs, onRemove }) {
  return (
    <View style={styles.foodItemBox}>
      <View>
        <Text style={{ fontWeight: 'bold' }}>{name}</Text>
        <Text style={{ color: '#666', fontSize: 12 }}>{portion}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.foodCarbs}>{carbs}</Text>
        <TouchableOpacity onPress={onRemove} style={{ marginLeft: 8 }}>
          <Ionicons name="trash-outline" size={18} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fbfd' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
  searchInput: { backgroundColor: '#f0f0f0', borderRadius: 10, padding: 10, marginBottom: 16 },
  sectionTitle: { fontWeight: 'bold', marginVertical: 10, fontSize: 16 },
  categoriesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  categoryCircle: { backgroundColor: '#d8efff', borderRadius: 30, padding: 10, alignItems: 'center', width: 60 },
  foodItemBox: { backgroundColor: 'white', padding: 12, borderRadius: 10, marginVertical: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  foodCarbs: { color: '#007AFF', fontWeight: 'bold', fontSize: 16 },
  totalBox: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, padding: 10 },
  totalLabel: { fontWeight: 'bold' },
  totalValue: { fontWeight: 'bold', color: '#007AFF' },
});
