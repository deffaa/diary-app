import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native';
import DiaryCard from '../components/DiaryCard';

const diaryEntries = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    imageSource: { uri: 'https://picsum.photos/seed/happy/80' },
    moodType: 'happy', 
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    imageSource: { uri: 'https://picsum.photos/seed/focus/80' },
    moodType: 'focus',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    imageSource: { uri: 'https://picsum.photos/seed/calm/80' },
    moodType: 'calm',
  },
  {
    id: 4,
    title: 'Makan Malam Spesial',
    date: '2025-10-03',
    preview: 'Mencoba resep baru untuk makan malam. Rasanya ternyata sangat enak!',
    imageSource: { uri: 'https://picsum.photos/seed/excited/80' },
    moodType: 'excited',
  },
  {
    id: 5,
    title: 'Hujan Deras',
    date: '2025-10-02',
    preview: 'Kehujanan saat pulang. Sekarang istirahat sambil minum teh hangat.',
    imageSource: require('../../assets/moods/sad_mood.png'), 
    moodType: 'sad',
  },
];

export default function DiaryListScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Buku Harian</Text>
        <Image 
          source={{ uri: 'https://staticg.sportskeeda.com/editor/2023/02/a4ef1-16773936363178-1920.jpg' }} 
          style={styles.avatar}
        />
      </View>
      
      {diaryEntries.map((entry) => (
        <DiaryCard
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          imageSource={entry.imageSource} 
          moodType={entry.moodType}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25, 
  }
});