import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAlimento } from '../../context/AlimentoContext';
import { useGlicemia } from '../../context/GlicemiaContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { alimentos } = useAlimento();
  const { glicemias } = useGlicemia();
  const [desafios, setDesafios] = useState({
    refeicoes: 0,
    banana: false,
    maca: false,
    chatbot: false,
  });

  useEffect(() => {
    // Conta refeições
    setDesafios((prev) => ({
      ...prev,
      refeicoes: alimentos.length,
      banana: alimentos.some((a: any) => a.nome.toLowerCase().includes('banana')),
      maca: alimentos.some((a: any) => a.nome.toLowerCase().includes('maçã') || a.nome.toLowerCase().includes('maca')),
    }));
  }, [alimentos]);

  const handleChatbot = () => {
    setDesafios((prev) => ({ ...prev, chatbot: true }));
    (navigation as any).navigate('tabsescondidas/chatbot');
  };

  // Cálculo da média das últimas medições (pré e pós)
  const todas = glicemias.flatMap((g: any) => [parseFloat(g.pre), parseFloat(g.pos)]).filter((v: any) => !isNaN(v));
  const mediaGlicemia = todas.length > 0 ? (todas.reduce((a: number, b: number) => a + b, 0) / todas.length).toFixed(0) : '--';

  // Cálculo da hemoglobina glicada (fórmula comum: (média glicemia + 46.7) / 28.7)
  const hemoglobinaGlicada = todas.length > 0 ? ((parseFloat(mediaGlicemia) + 46.7) / 28.7).toFixed(1) : '--';

  // GlicoPoints: 1 ponto por desafio diário completo
  const glicoPoints = [desafios.refeicoes >= 3, desafios.banana, desafios.maca, desafios.chatbot].filter(Boolean).length * 10;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.logo}>GlicoGuide</Text>
          </View>
          <View style={styles.icons}>
            <Ionicons name="notifications-outline" size={24} color="white" />
            <Ionicons name="settings-outline" size={24} color="white" style={{ marginLeft: 12 }} />
          </View>
        </View>
        <Text style={styles.greeting}>Olá, Miguel!</Text>
        <Text style={styles.subtitle}>Como você está hoje?</Text>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBoxMinimal}>
            <Text style={styles.summaryLabelMinimal}>GlicoPoints</Text>
            <TouchableOpacity onPress={() => (navigation as any).navigate('tabsescondidas/glicopoints', { glicoPoints })}>
              <Text style={styles.summaryValueMinimal}>{glicoPoints}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.summaryBoxMinimal}>
            <Text style={styles.summaryLabelMinimal}>Glicemia média</Text>
            <Text style={styles.summaryValueMinimal}>{mediaGlicemia} <Text style={styles.unitMinimal}>mg/dL</Text></Text>
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBoxMinimal}>
            <Text style={styles.summaryLabelMinimal}>Hemoglobina glicada</Text>
            <Text style={styles.summaryValueMinimal}>{hemoglobinaGlicada} <Text style={styles.unitMinimal}>%</Text></Text>
          </View>
          <View style={styles.summaryBoxMinimal}>
            <Text style={styles.summaryLabelMinimal}>Desafios</Text>
            <Text style={styles.summaryValueMinimal}>2/3</Text>
          </View>
        </View>
      </View>

      {/* Desafios Diários */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Desafios Diários</Text>
        <Challenge label="Registrar 3 refeições" progress={`${Math.min(desafios.refeicoes, 3)}/3`} completo={desafios.refeicoes >= 3} />
        <Challenge label="Comer banana" progress={desafios.banana ? '1/1' : '0/1'} completo={desafios.banana} />
        <Challenge label="Comer maçã" progress={desafios.maca ? '1/1' : '0/1'} completo={desafios.maca} />
        <Challenge label="Conversar com o chatbot" progress={desafios.chatbot ? '1/1' : '0/1'} completo={desafios.chatbot} />
      </View>

      {/* Notificações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificações</Text>
        <View style={styles.actionsRow}>
          <ActionButton icon="bell" label="Lembretes" onPress={() => (navigation as any).navigate('tabsescondidas/notificacoes')} />
        </View>
      </View>

      {/* Ações Rápidas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          <ActionButton icon="plus" label="Registrar" onPress={() => (navigation as any).navigate('tabsescondidas/registrar')} />
          <ActionButton icon="user" label="Alimentos" onPress={() => (navigation as any).navigate('tabsescondidas/alimentos')} />
          <ActionButton icon="camera" label="Escanear" onPress={() => (navigation as any).navigate('tabsescondidas/escanear')} />
          <ActionButton icon="message-circle" label="Chat" onPress={handleChatbot} />
        </ScrollView>
      </View>

      {/* Glicemia de Hoje */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Glicemia de Hoje</Text>
        <Measurement time="07:30" label="Café da manhã" value="120" />
        <Measurement time="12:15" label="Almoço" value="135" />
        <Measurement time="15:45" label="Lanche" value="110" />
      </View>

      {/* Sugestões de Alimentos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sugestões de Alimentos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FoodCard name="Maçã" carbs="15g de carboidratos" emoji="🍎" />
          <FoodCard name="Abacate" carbs="2g de carboidratos" emoji="🥑" />
          <FoodCard name="Banana" carbs="27g de carboidratos" emoji="🍌" />
        </ScrollView>
      </View>

      {/* Hipoglicemia */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hipoglicemia</Text>
        <View style={styles.actionsRow}>
          <ActionButton icon="alert-triangle" label="Registrar Hipo" onPress={() => (navigation as any).navigate('tabsescondidas/hipoglicemia')} />
        </View>
      </View>
    </ScrollView>
  );
}

function ActionButton({ icon, label, onPress }: { icon: any, label: string, onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Feather name={icon as any} size={24} color="#007AFF" />
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function Measurement({ time, label, value }: { time: string, label: string, value: string }) {
  return (
    <View style={styles.measurementBox}>
      <Text style={styles.measurementLabel}>{label}</Text>
      <Text style={styles.measurementTime}>Hoje, {time}</Text>
      <Text style={styles.measurementValue}>{value}</Text>
    </View>
  );
}

function Challenge({ label, progress, completo }: { label: string, progress: string, completo: boolean }) {
  return (
    <View style={[styles.challengeBox, completo && { backgroundColor: '#d4f7c5' }]}> 
      <Text>{completo ? '✅' : '⬜'} {label}</Text>
      <Text style={{ fontWeight: 'bold' }}>{progress}</Text>
    </View>
  );
}

function FoodCard({ emoji, name, carbs }: { emoji: string, name: string, carbs: string }) {
  return (
    <View style={styles.foodCard}>
      <Text style={{ fontSize: 30 }}>{emoji}</Text>
      <Text style={{ fontWeight: 'bold' }}>{name}</Text>
      <Text>{carbs}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f8fb' },
  header: { backgroundColor: '#3cb4ff', padding: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  icons: { flexDirection: 'row' },
  greeting: { color: 'white', fontSize: 18, marginTop: 12 },
  subtitle: { color: 'white', fontSize: 14, marginBottom: 12 },
  summaryContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryBoxMinimal: { backgroundColor: '#fff', borderRadius: 12, padding: 12, flex: 1, alignItems: 'center', marginHorizontal: 4, elevation: 2 },
  summaryLabelMinimal: { fontSize: 13, color: '#888', marginBottom: 2 },
  summaryValueMinimal: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  unitMinimal: { fontSize: 11 },
  statusGood: { color: 'green', fontWeight: 'bold', fontSize: 12 },
  statusBad: { color: 'red', fontWeight: 'bold', fontSize: 12 },
  statusHint: { fontSize: 12 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionButton: { alignItems: 'center', padding: 10 },
  actionLabel: { fontSize: 12, marginTop: 4 },
  measurementBox: { backgroundColor: 'white', padding: 12, borderRadius: 10, marginVertical: 4 },
  measurementLabel: { fontWeight: 'bold' },
  measurementTime: { color: '#888' },
  measurementValue: { fontSize: 20, fontWeight: 'bold', color: '#007AFF' },
  challengeBox: { backgroundColor: 'white', padding: 12, borderRadius: 10, marginVertical: 4, flexDirection: 'row', justifyContent: 'space-between' },
  foodCard: { backgroundColor: '#d8efff', borderRadius: 12, padding: 12, marginRight: 10, width: 100, alignItems: 'center' },
});
