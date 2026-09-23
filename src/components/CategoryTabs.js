import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const CATEGORIES = [
  { id: 'reactnative', label: 'React Native' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'webdev', label: 'Web Dev' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'saved', label: 'Bookmarks 🔖' },
];

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.pill, isActive && styles.activePill]}
              onPress={() => onSelectCategory(category.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.pillText, isActive && styles.activePillText]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 4,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  activePill: {
    backgroundColor: '#38bdf8',
    borderColor: '#38bdf8',
  },
  pillText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  activePillText: {
    color: '#0f172a',
    fontWeight: 'bold',
  },
});
