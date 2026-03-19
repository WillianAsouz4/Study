import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAlimento } from '../../context/AlimentoContext';

export default function EscanearFakeScreen() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const { adicionarAlimento } = useAlimento();

  const alimentosFake = [
    { nome: 'Banana', quantidade: '1 unidade', carboidratos: '27' },
    { nome: 'Maçã', quantidade: '1 unidade', carboidratos: '15' },
  ];

  const pickImage = async () => {
    setResult(null);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!res.canceled && res.assets && res.assets[0].uri) {
      setImage(res.assets[0].uri);
      // Adiciona alimentos fake
      alimentosFake.forEach(alimento => adicionarAlimento(alimento));
      setResult('Alimentos identificados: Banana, Maçã (adicionados à sua alimentação)');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadText}>{image ? 'Escolher outra imagem' : 'Selecionar imagem da galeria'}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.preview} />}
      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Alimentos identificados:</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f8fb', padding: 16 },
  uploadButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 10, marginBottom: 16 },
  uploadText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  preview: { width: 250, height: 250, borderRadius: 12, marginBottom: 16, resizeMode: 'cover' },
  resultBox: { backgroundColor: '#fff', borderRadius: 10, padding: 16, marginTop: 16, width: '100%' },
  resultTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  resultText: { fontSize: 15, color: '#333' },
});
