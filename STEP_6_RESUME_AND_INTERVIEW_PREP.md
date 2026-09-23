# Step 6: Resume Bullet Points & Master Technical Interview Cheat Sheet

---

## 📝 1. Resume Project Entry (Copy-Paste Ready)

### Option A: Standard Resume / Application Form Format

**Tech Digest – React Native Mobile News Reader** | *React Native, Expo, REST API, AsyncStorage, JavaScript (ES6+)*  
* **Built a cross-platform mobile tech news application** using **React Native** and **Expo**, integrating the Dev.to REST API to deliver real-time developer content.
* **Implemented high-performance list virtualization** using **`<FlatList>`** with native pull-to-refresh (`RefreshControl`) to ensure 60 FPS scrolling and low memory overhead.
* **Engineered offline persistent bookmarking** using **`AsyncStorage`** key-value storage, handling async state initialization and JSON serialization.
* **Designed modular component architecture** (`CategoryTabs`, `ArticleCard`, `Storage Utilities`) following clean code, Flexbox layout principles, and touch accessibility (`hitSlop`).

---

### Option B: Bullet Points for Application Form Fields (Short Format)

* Developed a cross-platform news reader app in **React Native (Expo)** consuming public REST APIs.
* Managed mobile state and side-effects using React Hooks (`useState`, `useEffect`) and async error handling.
* Integrated **`AsyncStorage`** for persistent offline data storage across mobile app restarts.
* Optimized UI rendering with **`<FlatList>`** virtualization, custom dark mode styling, and native deep linking (`Linking`).

---

## 🛠️ 2. Skills to Add to Your Application Form / Resume

**Mobile Development:** React Native, Expo, iOS/Android UI Components  
**Frontend & Languages:** JavaScript (ES6+), React Hooks, JSX, Async/Await  
**Data & Storage:** REST APIs, JSON Parsing, `AsyncStorage` (Key-Value Storage)  
**UI & Layout:** Flexbox, Responsive Mobile Layouts, Custom Component Architecture  

---

## 🎯 3. Master Technical Interview Cheat Sheet (10 Crucial Questions)

### Q1: What is React Native and how does it render UI on mobile devices?
**Answer:** React Native is a mobile framework that executes JavaScript business logic on a background thread using the **Hermes** JavaScript engine. It communicates with the mobile device's **Native UI Thread** to render actual native platform widgets (`android.view.View` on Android and `UIView` on iOS), rather than rendering HTML inside a webview.

### Q2: Explain the React Native Threading model.
**Answer:**
1. **JavaScript Thread:** Executes your React components, state logic, API calls, and business logic.
2. **UI (Main) Thread:** Handles native rendering, user touch gestures, and screen drawing.
3. **Shadow (Yoga Layout) Thread:** Calculates layout dimensions using Flexbox math and translates them into native pixel coordinates.

### Q3: What is the difference between `ScrollView` and `FlatList`?
**Answer:** `ScrollView` renders **all** child components simultaneously into memory at once, which causes heavy memory usage and lag for large datasets. `FlatList` uses **virtualized windowing**: it only renders items currently visible on screen and unmounts off-screen items, maintaining low, constant memory usage regardless of list size.

### Q4: Why is `keyExtractor` mandatory in `FlatList` and why shouldn't you use array index as a key?
**Answer:** `keyExtractor` provides a unique identifier string for each data item. React uses keys to match item identities during re-renders. Using an array index breaks identity when items are added, removed, or re-ordered, causing UI bugs, incorrect state mapping, and broken scroll animations. Always use unique server IDs (e.g. `item.id.toString()`).

### Q5: How does storage work in React Native with `AsyncStorage`?
**Answer:** `AsyncStorage` is an unencrypted, asynchronous, key-value storage system. It stores string data persistently on device disk space (backed by SQLite/RocksDB on Android and native dictionary files on iOS). Objects and arrays must be serialized to JSON strings using `JSON.stringify()` before saving, and parsed back with `JSON.parse()`.

### Q6: Can `AsyncStorage` be used to store auth tokens or secrets?
**Answer:** No. `AsyncStorage` is unencrypted plain-text storage. For sensitive credentials (like JWT tokens or biometrics), apps must use `expo-secure-store` (Keychain on iOS / EncryptedSharedPreferences on Android).

### Q7: What are the main differences between CSS Flexbox on Web vs. React Native Flexbox?
**Answer:**
1. `flexDirection` defaults to **`column`** in React Native (vertical layout), whereas Web CSS defaults to **`row`**.
2. Dimensions are unitless density-independent points (`pt`/`dp`), not pixels (`px`, `em`, `rem`).
3. Properties like `float` or `grid` do not exist in React Native.

### Q8: What does `useEffect` do and why is `finally` critical when fetching API data?
**Answer:** `useEffect` handles side-effects like fetching data from REST APIs. When performing async fetch requests, wrapping logic in `try...catch...finally` ensures that `setLoading(false)` always runs inside `finally`, preventing the user from being stuck on a permanent loading spinner if the network fails.

### Q9: What is `hitSlop` in React Native?
**Answer:** `hitSlop` expands the touchable boundary of an interactive element (`TouchableOpacity`/`Pressable`) without altering its visible visual bounds or CSS layout. It makes small icons (like a 20px bookmark button) easily tappable according to mobile touch target guidelines (44x44 points).

### Q10: How does native linking work in React Native?
**Answer:** The `Linking` module (`Linking.openURL(url)`) interacts with the underlying native OS URL dispatchers. Passing an HTTP/HTTPS URL delegates the request to the mobile OS, which opens the default native web browser (Chrome or Safari).

---

*You are now fully prepared to submit your form and ace technical interview questions on React Native!*
