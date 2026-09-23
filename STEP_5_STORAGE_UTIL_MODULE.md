# Step 5: Storage Utility Module Study Guide — `src/utils/storage.js`

---

## 📄 Complete Source Code: `src/utils/storage.js`

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_STORAGE_KEY = '@tech_digest_bookmarks';

/**
 * Load saved bookmarks array from device AsyncStorage
 * @returns {Promise<Array>} List of saved article objects
 */
export const loadBookmarks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading bookmarks from AsyncStorage:', error);
    return [];
  }
};

/**
 * Save updated bookmarks array to device AsyncStorage
 * @param {Array} bookmarks List of article objects to save
 */
export const saveBookmarks = async (bookmarks) => {
  try {
    const jsonValue = JSON.stringify(bookmarks);
    await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving bookmarks to AsyncStorage:', error);
  }
};
```

---

## 🔍 Line-by-Line Code Breakdown

### Imports & Key Namespacing (Lines 1–3)
* `import AsyncStorage from '@react-native-async-storage/async-storage'`: Imports the official community persistent storage library.
* `const BOOKMARKS_STORAGE_KEY = '@tech_digest_bookmarks'`: Standard practice in React Native. Prefixing keys with `@appname_keyname` prevents key collisions with other libraries or modules sharing `AsyncStorage`.

### `loadBookmarks()` Function (Lines 9–18)
* `export const loadBookmarks = async () => { ... }`: Asynchronous helper function returning a Promise that resolves to an array.
* `await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY)`: Fetches raw string value associated with the key from native device disk storage (SQLite/SharedPreferences/NSUserDefaults).
* `return jsonValue != null ? JSON.parse(jsonValue) : []`: Checks if a value exists. If yes, parses the JSON string back into a JavaScript array; if null (first app launch), returns an empty array `[]`.
* `catch (error) { ... return []; }`: Guarantees the caller receives a valid array even if storage reading fails.

### `saveBookmarks()` Function (Lines 24–31)
* `export const saveBookmarks = async (bookmarks) => { ... }`: Asynchronous function accepting the array to persist.
* `const jsonValue = JSON.stringify(bookmarks)`: `AsyncStorage` **ONLY** accepts string values. Complex objects and arrays must be serialized to JSON strings first using `JSON.stringify()`.
* `await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, jsonValue)`: Writes the stringified value to persistent device storage.

---

## 🧠 Core Concepts Taught in This File

1. **`AsyncStorage` Data Types**: `AsyncStorage` is an unencrypted, asynchronous, key-value storage system. It can **ONLY store key-value pairs where both key and value are strings**.
2. **Native Platform Backends**:
   * **Android**: Backed by `RocksDB` or `SQLite`.
   * **iOS**: Backed by serialized dictionary files or `NSUserDefaults`.
3. **Namespacing Keys**: Best practice convention `@app_name:key_name` prevents namespace pollution.

---

## 🎯 Interview Q&A for This Component

### Q1: Can you store sensitive user authentication tokens or passwords in `AsyncStorage`?
**Answer:** **NO!** `AsyncStorage` is **unencrypted** plain-text storage on disk. Anyone with root access to the device or backup file access can read data stored in `AsyncStorage`. For sensitive data (like JWT tokens, passwords, or biometrics), you must use **`expo-secure-store`** (which uses Keychain on iOS and EncryptedSharedPreferences/Keystore on Android).

---

### Q2: What are the storage size limits of `AsyncStorage`?
**Answer:** On iOS, there is no hard limit (subject to device disk space). On Android, `AsyncStorage` historically defaults to a 6MB limit per database file unless configured otherwise in `MainApplication.java` or `app.json`.

---
