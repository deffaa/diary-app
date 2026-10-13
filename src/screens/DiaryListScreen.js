import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import { COLORS, SPACE, TYPO, BREAKPOINTS, RADIUS } from '../styles/tokens';

// Data dengan penambahan moodType
const DATA = [
  {
    id: 1, title: 'Pagi yang Tenang', date: '2025-10-06',
    preview: 'Bangun lebih pagi...', body: 'Catatan lengkap tentang pagi yang tenang. Udara sejuk dan menyenangkan.',
    moodUri: 'https://picsum.photos/seed/happy/200', heroUri: 'https://picsum.photos/seed/happyhero/800/450',
    moodType: 'Happy' 
  },
  {
    id: 2, title: 'Produktif di Kampus', date: '2025-10-05',
    preview: 'Menyelesaikan modul...', body: 'Kemajuan proyek hari ini sangat pesat. Banyak modul selesai.',
    moodUri: 'https://picsum.photos/seed/focus/200', heroUri: 'https://picsum.photos/seed/focushero/800/450',
    moodType: 'Focus'
  },
  {
    id: 3, title: 'Senja di Taman', date: '2025-10-04',
    preview: 'Membaca buku...', body: 'Refleksi singkat di sore hari. Warna langit senja sangat menginspirasi.',
    moodUri: 'https://picsum.photos/seed/calm/200', heroUri: 'https://picsum.photos/seed/calmhero/800/450',
    moodType: 'Calm'
  },
  {
    id: 4, title: 'Makan Malam Spesial', date: '2025-10-03',
    preview: 'Mencoba resep baru...', body: 'Mencoba resep masakan baru untuk makan malam. Rasanya sangat lezat!',
    moodUri: 'https://picsum.photos/seed/excited/200', heroUri: 'https://picsum.photos/seed/excitedhero/800/450',
    moodType: 'Excited'
  },
  {
    id: 5, title: 'Hujan Deras', date: '2025-10-02',
    preview: 'Kehujanan saat pulang...', body: 'Terjebak hujan saat perjalanan pulang. Beristirahat sambil minum teh hangat.',
    moodUri: 'https://picsum.photos/seed/sad/200', heroUri: 'https://picsum.photos/seed/sadhero/800/450',
    moodType: 'Sad'
  },
];

// Komponen Skeleton Loader
const SkeletonCard = ({ twoCols }) => (
  <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonAvatar} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonDate} />
        <View style={styles.skeletonPreview} />
      </View>
    </View>
  </View>
);

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [selected, setSelected] = useState(null);
  
  // State untuk efek loading selama 2 detik
  const [isLoading, setIsLoading] = useState(true);
  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        moodType={item.moodType} 
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)} 
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      {isLoading ? (
        // Tampilan saat loading (menampilkan 4 kotak dummy skeleton)
        <FlatList
          key={keyForCols}
          data={['1', '2', '3', '4']} 
          numColumns={twoCols ? 2 : 1}
          keyExtractor={(item) => item}
          renderItem={() => <SkeletonCard twoCols={twoCols} />}
          columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
          contentContainerStyle={{ padding: SPACE.l, gap: SPACE.m, paddingTop: SPACE.m }}
        />
      ) : (
        // Tampilan data asli
        <FlatList
          key={keyForCols}
          data={DATA}
          numColumns={twoCols ? 2 : 1}
          keyExtractor={(it) => String(it.id)}
          renderItem={renderItem}
          columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
          contentContainerStyle={{ padding: SPACE.l, gap: SPACE.m, paddingTop: SPACE.m }}
          // Tampilan Empty State jika isi array DATA kosong
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyTitle}>Buku Harian Kosong</Text>
              <Text style={styles.emptySubtitle}>
                Kamu belum menulis apa-apa. Yuk, catat keseharian dan mood kamu hari ini!
              </Text>
            </View>
          }
        />
      )}

      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: { fontSize: TYPO.h1, fontWeight: '700', paddingHorizontal: SPACE.l, paddingTop: SPACE.l, color: COLORS.text },
  itemWrap: { flex: 1 }, itemWrap2: { flex: 1 / 2 },
  
  // Styling Empty State
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 80, paddingHorizontal: 40 },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: COLORS.muted, textAlign: 'center', lineHeight: 22 },


  skeletonContainer: { flexDirection: 'row', gap: SPACE.m, padding: SPACE.m, borderWidth: 1, borderColor: '#f3f4f6', borderRadius: RADIUS.card, backgroundColor: '#f9fafb' },
  skeletonAvatar: { width: 64, height: 64, borderRadius: RADIUS.avatar, backgroundColor: '#e5e7eb' },
  skeletonContent: { flex: 1, justifyContent: 'center' },
  skeletonTitle: { width: '70%', height: 16, backgroundColor: '#e5e7eb', borderRadius: 4, marginBottom: 8 },
  skeletonDate: { width: '40%', height: 12, backgroundColor: '#e5e7eb', borderRadius: 4, marginBottom: 12 },
  skeletonPreview: { width: '100%', height: 14, backgroundColor: '#e5e7eb', borderRadius: 4 },
});