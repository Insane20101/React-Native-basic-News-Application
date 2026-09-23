# Step 4: Component Study Guide — `App.js` (FlatList Integration & State Wiring)

---

## 📄 Complete Source Code: `App.js`

```javascript
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CategoryTabs from './src/components/CategoryTabs';
import ArticleCard from './src/components/ArticleCard';

export default function App() {
  // 1. Define App States
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('reactnative');
  const [bookmarks, setBookmarks] = useState([]);

  // 2. Fetch news from Dev.to API
  const fetchArticles = async (category) => {
    if (category === 'saved') {
      setArticles(bookmarks);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://dev.to/api/articles?tag=${category}&per_page=15`
      );
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Pull-to-Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchArticles(selectedCategory);
    setRefreshing(false);
  };

  // 4. Bookmark Toggle Handler
  const handleToggleBookmark = (article) => {
    const isAlreadyBookmarked = bookmarks.some((item) => item.id === article.id);
    let updatedBookmarks;
    if (isAlreadyBookmarked) {
      updatedBookmarks = bookmarks.filter((item) => item.id !== article.id);
    } else {
      updatedBookmarks = [...bookmarks, article];
    }
    setBookmarks(updatedBookmarks);

    if (selectedCategory === 'saved') {
      setArticles(updatedBookmarks);
    }
  };

  // 5. Trigger API fetch whenever category changes
  useEffect(() => {
    fetchArticles(selectedCategory);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tech Digest ⚡</Text>
        <Text style={styles.headerSubtitle}>
          Curated mobile & web developer articles
        </Text>
      </View>

      {/* Category Filter Pills */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Content Area: Spinner or High-Performance Virtualized FlatList */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#38bdf8" />
          <Text style={styles.loadingText}>Loading articles...</Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isBookmarked = bookmarks.some((b) => b.id === item.id);
            return (
              <ArticleCard
                article={item}
                isBookmarked={isBookmarked}
                onToggleBookmark={handleToggleBookmark}
              />
            );
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#38bdf8"
              colors={['#38bdf8']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No Articles Found</Text>
              <Text style={styles.emptySubtitle}>
                {selectedCategory === 'saved'
                  ? 'You have not saved any bookmarks yet.'
                  : 'Pull down to refresh or try another category.'}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#94a3b8',
    marginTop: 12,
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#64748b',
    fontSize: 14,
    textAlign: 'center',
  },
});
```

---

## 🔍 Line-by-Line Code Breakdown

### Imports (Lines 1–5)
* `import { FlatList, RefreshControl } from 'react-native'`:
  * `<FlatList>`: High-performance list component for virtualizing large lists.
  * `<RefreshControl>`: Native pull-to-refresh component for scroll views and lists.
* `import CategoryTabs from './src/components/CategoryTabs'`: Custom pill navigation bar.
* `import ArticleCard from './src/components/ArticleCard'`: Custom article card renderer.

### Fetch Guard Clause for Saved Tab (Lines 17–21)
* `if (category === 'saved') { setArticles(bookmarks); setLoading(false); return; }`:
  * Guard clause. Prevents making an HTTP API call to Dev.to when the user selects the `'saved'` tab, and instead populates `articles` directly from local state `bookmarks`.

### Bookmark Toggle Logic (Lines 42–54)
* `const isAlreadyBookmarked = bookmarks.some((item) => item.id === article.id)`: Checks if the article already exists in bookmarks array using JavaScript `.some()`.
* Immutable array state update: Filters out the article if it exists (`bookmarks.filter(...)`), or appends it to a new array (`[...bookmarks, article]`).
* Never mutate state arrays directly (`bookmarks.push(article)` is strictly forbidden in React).

### FlatList Implementation (Lines 83–115)
* `data={articles}`: Array source for rendering items.
* `keyExtractor={(item) => item.id.toString()}`: Extracts unique key string for each row item.
* `renderItem={({ item }) => ...}`: Render callback function.
* `refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} ... />}`: Injects native pull-to-refresh spinner at top of list.
* `ListEmptyComponent={<View>...</View>}`: Rendered when `data` array has 0 elements.

---

## 🧠 Core Concepts Taught in This File

1. **Virtualization Windowing**: `<FlatList>` does not render off-screen items. It unmounts items outside the visible viewport window, maintaining low RAM usage.
2. **Immutable State Updates**: React relies on shallow reference equality (`prev !== next`) to detect state changes. Always return a new array instance (`[...prev, newItem]`).
3. **Empty List Fallback**: `ListEmptyComponent` automatically eliminates the need for manual ternary operators like `articles.length === 0 ? <Empty /> : <FlatList />`.

---

## 🎯 Interview Q&A for This Component

### Q: Why is `FlatList` significantly faster than mapping over an array with `<ScrollView>`?
**Answer:** `<ScrollView>` mounts every single child item into native memory simultaneously. If you have 500 items, it creates 500 native views at once, leading to app slowdowns and out-of-memory crashes. `<FlatList>` uses virtualized windowing: it only keeps the currently visible 5–10 items mounted in native memory and unmounts off-screen items as the user scrolls.

---
