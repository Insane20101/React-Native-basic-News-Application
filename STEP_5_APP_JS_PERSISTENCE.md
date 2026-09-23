# Step 5: Modified App Study Guide — `App.js` (Persistent State Integration)

---

## 📄 Complete Updated Source Code: `App.js`

```javascript
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CategoryTabs from './src/components/CategoryTabs';
import ArticleCard from './src/components/ArticleCard';
import { loadBookmarks, saveBookmarks } from './src/utils/storage';

export default function App() {
  // 1. App States
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('reactnative');
  const [bookmarks, setBookmarks] = useState([]);

  // 2. Initial Mount: Load Bookmarks from AsyncStorage
  useEffect(() => {
    const initStorage = async () => {
      const savedBookmarks = await loadBookmarks();
      setBookmarks(savedBookmarks);
    };
    initStorage();
  }, []);

  // 3. Fetch news from Dev.to API
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

  // 4. Pull-to-Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchArticles(selectedCategory);
    setRefreshing(false);
  };

  // 5. Bookmark Toggle Handler with Persistent AsyncStorage Saving
  const handleToggleBookmark = async (article) => {
    const isAlreadyBookmarked = bookmarks.some((item) => item.id === article.id);
    let updatedBookmarks;

    if (isAlreadyBookmarked) {
      updatedBookmarks = bookmarks.filter((item) => item.id !== article.id);
    } else {
      updatedBookmarks = [...bookmarks, article];
    }

    // Update React State
    setBookmarks(updatedBookmarks);

    // Save to Device Storage asynchronously
    await saveBookmarks(updatedBookmarks);

    // If currently on "Saved" tab, update displayed articles immediately
    if (selectedCategory === 'saved') {
      setArticles(updatedBookmarks);
    }
  };

  // 6. Trigger API fetch whenever category changes or bookmarks state syncs
  useEffect(() => {
    fetchArticles(selectedCategory);
  }, [selectedCategory, bookmarks]);

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

      {/* Content Area */}
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

### Storage Imports (Line 6)
* `import { loadBookmarks, saveBookmarks } from './src/utils/storage'`: Imports custom async storage helper functions.

### Initializing Mount Effect (Lines 16–22)
* `useEffect(() => { const initStorage = async () => { ... }; initStorage(); }, [])`:  
  * Runs **once** when the app launches (`[]` empty dependency array).
  * Reads persisted bookmarks from disk (`await loadBookmarks()`) and sets `bookmarks` state. This guarantees bookmarks persist across app restarts!

### Async Persistence in Bookmark Toggle Handler (Lines 53–71)
* `setBookmarks(updatedBookmarks)`: Updates React state immediately for instant UI feedback (optimistic UI update).
* `await saveBookmarks(updatedBookmarks)`: Persists the updated bookmark list asynchronously to native disk storage.

### Dependency Array Expansion (Lines 74–76)
* `useEffect(() => { fetchArticles(selectedCategory); }, [selectedCategory, bookmarks]);`:
  * Ensures that when `bookmarks` change or when `selectedCategory` switches, `fetchArticles` re-runs to sync displayed UI articles.

---

## 🧠 Core Concepts Taught in This File

1. **Async Storage Initialization Pattern**: Reading disk storage is asynchronous. Wrapping storage initialization inside an `async` function inside `useEffect(() => {}, [])` is the standard React Native lifecycle pattern.
2. **Optimistic State Updates**: Updating React state *before* or *parallel to* persisting to disk ensures the UI feels instant and lag-free to the mobile user.

---

## 🎯 Interview Q&A for This Component

### Q: Why can't you pass an `async` function directly to `useEffect` like `useEffect(async () => {}, [])`?
**Answer:** `useEffect` expects its callback function to return either `undefined` or a **cleanup function** (to cancel timers/subscriptions). An `async` function implicitly returns a **Promise**, which violates React's effect contract and breaks component lifecycle cleanup. To use async logic inside `useEffect`, you must define an internal async function and invoke it: `useEffect(() => { const fetchData = async () => { ... }; fetchData(); }, [])`.

---
