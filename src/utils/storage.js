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
