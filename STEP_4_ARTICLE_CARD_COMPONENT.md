# Step 4: Component Study Guide — `src/components/ArticleCard.js`

---

## 📄 Complete Source Code: `src/components/ArticleCard.js`

```javascript
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
```

---

## 🔍 Line-by-Line Code Breakdown

### Imports (Lines 1–3)
* `import React from 'react'`: Standard React.
* `import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'`:
  * `<Image>`: Renders web or local images.
  * `Linking`: Built-in React Native API to trigger system deep links or web browser URLs.
* `import { Ionicons } from '@expo/vector-icons'`: Expo vector icon library containing popular icon sets (Ionicons, FontAwesome, Feather, MaterialIcons).

### Event Handler & Image Fallbacks (Lines 6–17)
* `const handleOpenArticle = () => { if (article.url) Linking.openURL(article.url); };`: Opens native browser when tapped.
* `coverImage = article.cover_image || article.social_image || 'https://...'`: Logical OR fallback chain. If Dev.to API does not provide a cover image, it tries `social_image`, and finally falls back to a placeholder web URL.

### JSX Card Template (Lines 19–77)
* `<TouchableOpacity style={styles.card} onPress={handleOpenArticle} activeOpacity={0.85}>`: Outer card container. Whole card is pressable.
* `<Image source={{ uri: coverImage }} style={styles.coverImage} resizeMode="cover" />`:
  * `source={{ uri: ... }}`: Passes remote web URL object.
  * `resizeMode="cover"`: Scales the image uniformly so that both dimensions equal or exceed the container width/height.
* `<Text style={styles.title} numberOfLines={2}>`: Restricts title length to a max of 2 lines.
* `<Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={22} color={isBookmarked ? '#38bdf8' : '#94a3b8'} />`: Dynamic icon rendering based on boolean prop `isBookmarked`.
* `hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}`: Expands touch target for small bookmark button.

---

## 🧠 Core Concepts Taught in This File

1. **Native Linking API**: `Linking.openURL(url)` allows a React Native application to interact with external apps or launch device web browsers.
2. **Text Truncation & Layout Stability**: Using `numberOfLines={2}` guarantees card heights remain uniform across articles with short vs extremely long titles.
3. **Touch Accessibility (`hitSlop`)**: Expands hit areas for small touchable buttons without changing CSS layout spacing.
4. **Conditional Vector Icons**: Using `@expo/vector-icons` with ternary statements to toggle filled vs outlined icons (`bookmark` vs `bookmark-outline`).

---

## 🎯 Interview Q&A for This Component

### Q: How does `Linking.openURL` work under the hood in iOS and Android?
**Answer:** On iOS, `Linking.openURL` calls `[UIApplication openURL:]`. On Android, it constructs an `Intent` with `ACTION_VIEW` and passes the URI scheme to the Android OS, which opens the default registered browser application (like Chrome or Safari).

---
