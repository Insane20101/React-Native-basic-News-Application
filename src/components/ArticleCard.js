import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ArticleCard({ article, isBookmarked, onToggleBookmark }) {
  const handleOpenArticle = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  const coverImage =
    article.cover_image ||
    article.social_image ||
    'https://picsum.photos/400/200';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleOpenArticle}
      activeOpacity={0.85}
    >
      {/* Article Cover Image */}
      <Image
        source={{ uri: coverImage }}
        style={styles.coverImage}
        resizeMode="cover"
      />

      <View style={styles.cardBody}>
        {/* Tag & Reading Time Row */}
        <View style={styles.tagRow}>
          <Text style={styles.tagBadge}>
            #{article.tag_list?.[0] || 'tech'}
          </Text>
          <Text style={styles.readingTime}>
            ⏱️ {article.reading_time_minutes || 3} min read
          </Text>
        </View>

        {/* Article Title */}
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>

        {/* Footer Row: Author Info & Bookmark Icon */}
        <View style={styles.footerRow}>
          <View style={styles.authorContainer}>
            {article.user?.profile_image_90 ? (
              <Image
                source={{ uri: article.user.profile_image_90 }}
                style={styles.authorAvatar}
              />
            ) : (
              <View style={styles.authorAvatarPlaceholder} />
            )}
            <Text style={styles.authorName} numberOfLines={1}>
              {article.user?.name || 'Anonymous'}
            </Text>
          </View>

          {/* Bookmark Button */}
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => onToggleBookmark(article)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={isBookmarked ? '#38bdf8' : '#94a3b8'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  coverImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#0f172a',
  },
  cardBody: {
    padding: 16,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagBadge: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  readingTime: {
    color: '#94a3b8',
    fontSize: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#f8fafc',
    lineHeight: 24,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 10,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorAvatarPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#475569',
    marginRight: 8,
  },
  authorName: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  bookmarkButton: {
    padding: 4,
  },
});
