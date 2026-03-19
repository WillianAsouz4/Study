import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GlicoPointsScreen({ route }: { route: any }) {
  const { glicoPoints = 0 } = route?.params || {};
  const maxPoints = 100;
  const progress = Math.min(glicoPoints / maxPoints, 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GlicoPoints</Text>
      <Text style={styles.points}>{glicoPoints} / {maxPoints} pontos</Text>
      <View style={[styles.progressBar, { backgroundColor: '#eee', borderRadius: 10 }]}> 
        <View style={{ width: `${progress * 100}%`, height: 20, backgroundColor: '#ffb300', borderRadius: 10 }} />
      </View>
      <Text style={styles.desc}>Ganhe GlicoPoints completando desafios diários!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f8fb' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#007AFF', marginBottom: 16 },
  points: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  progressBar: { width: 250, height: 20, marginBottom: 16, overflow: 'hidden' },
  desc: { fontSize: 16, color: '#555', textAlign: 'center', marginTop: 12 },
});
