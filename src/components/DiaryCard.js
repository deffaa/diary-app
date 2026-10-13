import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

// Fungsi untuk menentukan warna berdasarkan jenis mood
const getMoodColor = (mood) => {
  switch (mood?.toLowerCase()) {
    case 'happy': return '#f59e0b'; // Kuning (Amber)
    case 'sad': return '#64748b'; // Abu-abu (Slate)
    case 'focus': return '#3b82f6'; // Biru
    case 'calm': return '#10b981'; // Hijau (Emerald)
    case 'excited': return '#ef4444'; // Merah
    default: return COLORS.muted;
  }
};

export default function DiaryCard({
  title, date, preview, moodUri, moodType, onPress, variant = 'list'
}) {
  const moodColor = getMoodColor(moodType);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        variant === 'grid' && styles.cardGrid,
        { opacity: pressed ? 0.85 : 1 }
      ]}
      accessible
      accessibilityLabel={`Entri ${title} tanggal ${date}`}
    >
      <Image source={{ uri: moodUri }} style={styles.mood} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        
        {/* Fitur Tambahan 1: Badge Mood */}
        {moodType && (
          <View style={[styles.badge, { borderColor: moodColor }]}>
            <Text style={[styles.badgeText, { color: moodColor }]}>
              {moodType.toUpperCase()}
            </Text>
          </View>
        )}

        <Text style={styles.preview} numberOfLines={2} ellipsizeMode="tail">
          {preview}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', gap: SPACE.m, padding: SPACE.m,
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.card, backgroundColor: COLORS.surface,
  },
  cardGrid: { flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  mood: { width: 64, height: 64, borderRadius: RADIUS.avatar, backgroundColor: '#eef2ff' },
  content: { flex: 1 },
  title: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: 4 },
  preview: { fontSize: TYPO.body, color: COLORS.text, marginTop: SPACE.s },
  // Styling untuk Badge
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginBottom: 4,
  },
  badgeText: { fontSize: 10, fontWeight: '700' }
});