# Step 4: Component Architecture, FlatList Virtualization & Native Linking

---

## 💻 Implemented Files & Code Breakdown

### File 1: `src/components/CategoryTabs.js`

```javascript
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
  container: { marginBottom: 16 },
  scrollContent: { paddingHorizontal: 4, gap: 8 },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  activePill: { backgroundColor: '#38bdf8', borderColor: '#38bdf8' },
  pillText: { color: '#94a3b8', fontSize: 14, fontWeight: '600' },
  activePillText: { color: '#0f172a', fontWeight: 'bold' },
});
```

---

### File 2: `src/components/ArticleCard.js`

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
      <Image source={{ uri: coverImage }} style={styles.coverImage} resizeMode="cover" />

      <View style={styles.cardBody}>
        <View style={styles.tagRow}>
          <Text style={styles.tagBadge}>#{article.tag_list?.[0] || 'tech'}</Text>
          <Text style={styles.readingTime}>⏱️ {article.reading_time_minutes || 3} min read</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>

        <View style={styles.footerRow}>
          <View style={styles.authorContainer}>
            {article.user?.profile_image_90 ? (
              <Image source={{ uri: article.user.profile_image_90 }} style={styles.authorAvatar} />
            ) : (
              <View style={styles.authorAvatarPlaceholder} />
            )}
            <Text style={styles.authorName} numberOfLines={1}>{article.user?.name || 'Anonymous'}</Text>
          </View>

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
  coverImage: { width: '100%', height: 160, backgroundColor: '#0f172a' },
  cardBody: { padding: 16 },
  tagRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  tagBadge: { color: '#38bdf8', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  readingTime: { color: '#94a3b8', fontSize: 12 },
  title: { fontSize: 17, fontWeight: 'bold', color: '#f8fafc', lineHeight: 24, marginBottom: 12 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#334155', paddingTop: 10 },
  authorContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  authorAvatar: { width: 24, height: 24, borderRadius: 12, marginRight: 8 },
  authorAvatarPlaceholder: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#475569', marginRight: 8 },
  authorName: { color: '#cbd5e1', fontSize: 13, fontWeight: '500', flex: 1 },
  bookmarkButton: { padding: 4 },
});
```

---

## 🔍 2. Line-by-Line & Syntax Breakdown

### `CategoryTabs.js`
* `horizontal`: Turns the `<ScrollView>` into a left-to-right horizontal scroll container.
* `showsHorizontalScrollIndicator={false}`: Hides the native horizontal scrollbar overlay for a cleaner app design.
* `style={[styles.pill, isActive && styles.activePill]}`: Combines base styles with conditional active styles using array syntax in React Native.

### `ArticleCard.js`
* `Linking.openURL(article.url)`: Uses React Native's built-in `Linking` module to launch the user's default native browser when an article card is tapped.
* `source={{ uri: coverImage }}`: Remote web images in React Native **must** pass an object with `{ uri: 'http...' }` and explicit `width` and `height` styles, or they will render invisible.
* `numberOfLines={2}`: Truncates text with an ellipsis (`...`) after 2 lines to prevent layout distortion on different device sizes.
* `hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}`: Expands the touchable tap target area by 10 points on all sides without altering the visible UI layout. Essential for accessibility!

---

## 🚀 3. Core Concepts & Senior Architectural Knowledge

### `ScrollView` vs. `FlatList` (The #1 Mobile List Question)

| Feature | `<ScrollView>` | `<FlatList>` |
| :--- | :--- | :--- |
| **Rendering Strategy** | Renders **ALL** items in memory instantly. | **Virtualized Windowing** (only renders visible items). |
| **Memory Footprint** | High (crashes with 1000s of items). | Low & Constant (recycles unmounted item views). |
| **Performance** | Laggy initial render on long lists. | Instant initial render regardless of list length. |
| **Best Used For** | Short forms, static pages, horizontal tabs. | Infinite feeds, news items, chat logs, search results. |

---

### Key Properties of `<FlatList>`

1. **`data`**: The raw JavaScript array to render (e.g. `articles`).
2. **`renderItem`**: Function that returns JSX for a single item: `({ item, index }) => <ArticleCard article={item} />`.
3. **`keyExtractor`**: Function returning a unique string key for each list item: `(item) => item.id.toString()`.  
   *Why it matters:* Prevents React Native from re-rendering the entire list when a single item is inserted or deleted.
4. **`refreshControl`**: Injects native pull-to-refresh behavior using `<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />`.
5. **`ListEmptyComponent`**: Renders custom empty state UI when `data` array length is `0`.

---

## 🎯 4. Top Interview Questions & Detailed Answers

### Q1: Why should you avoid using array index as `keyExtractor` in `FlatList`?
**Answer:** Using `index` as a key breaks item identity when items are added, removed, or sorted. React uses keys to track component instance identity across renders. If you delete item #0, item #1 becomes index #0, causing React Native to misapply internal component state and animations to the wrong item. Always use a unique server ID like `item.id.toString()`.

---

### Q2: What is `hitSlop` in React Native and why is it important for UX?
**Answer:** `hitSlop` increases the touchable boundary of an interactive element (`TouchableOpacity`/`Pressable`) without expanding its actual visual bounds. Apple and Google human interface guidelines recommend minimum touch targets of 44x44 points. `hitSlop` allows small icons (like a 20px bookmark icon) to be easily tapped by finger thumbs without adding awkward extra padding.

---

### Q3: How do remote images (`Image`) differ from local images (`require('./icon.png')`) in React Native?
**Answer:**
* **Local Images (`require(...)`):** Measured and bundled at compile time. React Native automatically knows their width and height.
* **Remote Images (`{ uri: 'https://...' }`):** Loaded asynchronously at runtime. They **require** explicit layout dimensions (`width` and `height` or `flex`) in `StyleSheet`, otherwise React Native defaults their rendered size to 0x0 pixels.

---

*This guide corresponds to Step 4 of the Tech Digest application.*
