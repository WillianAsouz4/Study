import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PerfilScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [medicamentos, setMedicamentos] = useState<string[]>([]);
  const [comorbidades, setComorbidades] = useState<string[]>([]);
  const [metaHbA1c, setMetaHbA1c] = useState('');
  const [novoMedicamento, setNovoMedicamento] = useState('');
  const [novaComorbidade, setNovaComorbidade] = useState('');
  const [novaMeta, setNovaMeta] = useState('');

  const adicionarMedicamento = () => {
    if (novoMedicamento.trim()) setMedicamentos([...medicamentos, novoMedicamento.trim()]);
    setNovoMedicamento('');
  };
  const adicionarComorbidade = () => {
    if (novaComorbidade.trim()) setComorbidades([...comorbidades, novaComorbidade.trim()]);
    setNovaComorbidade('');
  };
  const salvarMeta = () => {
    if (novaMeta.trim()) setMetaHbA1c(novaMeta.trim());
    setNovaMeta('');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Topo do Perfil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>M</Text>
        </View>
        <Text style={styles.name}>Miguel Silva</Text>
        <Text style={styles.age}>12 anos</Text>
        <TouchableOpacity style={styles.configButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="settings-outline" size={24} color="#039BE5" />
        </TouchableOpacity>
      </View>

      {/* Informações Médicas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações Médicas</Text>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Tipo de Diabetes</Text>
          <Text style={styles.value}>Tipo 1</Text>
          <Text style={styles.label}>Médico Responsável</Text>
          <Text style={styles.value}>Dra. Ana Beatriz</Text>
          <Text style={styles.label}>Fator de Sensibilidade à Insulina</Text>
          <Text style={styles.value}>1:15 (1 unidade para 15g de carboidratos)</Text>
          <Text style={styles.label}>Faixa Alvo de Glicemia</Text>
          <Text style={styles.value}>80 - 150 mg/dL</Text>
        </View>
      </View>

      {/* Medicamentos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medicamentos</Text>
        {medicamentos.length === 0 ? (
          <Text style={{ color: '#888' }}>Nenhum medicamento cadastrado.</Text>
        ) : (
          <FlatList
            data={medicamentos}
            keyExtractor={(item, idx) => idx + '-' + item}
            renderItem={({ item }) => <Text style={styles.value}>• {item}</Text>}
          />
        )}
      </View>

      {/* Comorbidades */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Comorbidades</Text>
        {comorbidades.length === 0 ? (
          <Text style={{ color: '#888' }}>Nenhuma comorbidade cadastrada.</Text>
        ) : (
          <FlatList
            data={comorbidades}
            keyExtractor={(item, idx) => idx + '-' + item}
            renderItem={({ item }) => <Text style={styles.value}>• {item}</Text>}
          />
        )}
      </View>

      {/* Meta de Hemoglobina Glicada */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meta de Hemoglobina Glicada (HbA1c)</Text>
        <Text style={styles.value}>{metaHbA1c ? metaHbA1c + ' %' : 'Nenhuma meta cadastrada.'}</Text>
      </View>

      {/* Conquistas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conquistas</Text>
        <View style={styles.achievementsContainer}>
          <Image source={require('@/assets/images/trofeu.png')} style={styles.icon} />
          <Image source={require('@/assets/images/estrela.png')} style={styles.icon} />
          <Image source={require('@/assets/images/maça.png')} style={styles.icon} />
        </View>
      </View>

      {/* Modal de Configuração */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Configurações do Perfil</Text>
            <Text style={styles.label}>Adicionar Medicamento</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <TextInput
                style={styles.input}
                placeholder="Nome do medicamento"
                value={novoMedicamento}
                onChangeText={setNovoMedicamento}
              />
              <TouchableOpacity onPress={adicionarMedicamento} style={styles.addButton}>
                <Ionicons name="add-circle" size={28} color="#039BE5" />
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Adicionar Comorbidade</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <TextInput
                style={styles.input}
                placeholder="Nome da comorbidade"
                value={novaComorbidade}
                onChangeText={setNovaComorbidade}
              />
              <TouchableOpacity onPress={adicionarComorbidade} style={styles.addButton}>
                <Ionicons name="add-circle" size={28} color="#039BE5" />
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Meta de HbA1c (%)</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <TextInput
                style={styles.input}
                placeholder="Ex: 6.5"
                value={novaMeta}
                onChangeText={setNovaMeta}
                keyboardType="decimal-pad"
              />
              <TouchableOpacity onPress={salvarMeta} style={styles.addButton}>
                <Ionicons name="checkmark-circle" size={28} color="#039BE5" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={{ color: '#039BE5', fontWeight: 'bold', fontSize: 16 }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#B3E5FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    color: '#039BE5',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  age: {
    fontSize: 16,
    color: '#757575',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E1F5FE',
    padding: 10,
  },
  configButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    elevation: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#B3E5FC',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    backgroundColor: '#F8F8F8',
  },
  addButton: {
    padding: 4,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});

export default PerfilScreen;
