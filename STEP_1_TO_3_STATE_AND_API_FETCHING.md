# Step 1 to 3: Environment Setup, React Native Architecture, App States & REST API Fetching

---

## 💻 Complete Implemented Code (`App.js`)

```javascript
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // 1. Define App States
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('reactnative');
  const [bookmarks, setBookmarks] = useState([]);

  // 2. Function to fetch news from Dev.to REST API
  const fetchArticles = async (category) => {
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

  // 3. Trigger API fetch whenever selectedCategory changes
  useEffect(() => {
    fetchArticles(selectedCategory);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tech Digest</Text>
        <Text style={styles.headerSubtitle}>
          Category: #{selectedCategory} ({articles.length} posts)
        </Text>
      </View>

      {/* Loading State or Content Preview */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#38bdf8" />
          <Text style={styles.loadingText}>Fetching latest tech news...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.sampleText}>
            Loaded {articles.length} articles successfully!
          </Text>
          {articles.length > 0 && (
            <Text style={styles.firstArticleTitle}>
              Latest: "{articles[0]?.title}"
            </Text>
          )}
        </View>
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#38bdf8',
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sampleText: {
    color: '#4ade80',
    fontSize: 18,
    fontWeight: '600',
  },
  firstArticleTitle: {
    color: '#cbd5e1',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
```

---

## 🔍 6. Line-by-Line Code & Syntax Breakdown

### Imports (Lines 1–3)
* `import React, { useState, useEffect } from 'react'`: Imports the core React library alongside the hooks used for state management (`useState`) and side effects (`useEffect`).
* `import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'`: Imports native UI components. `<View>` acts as a flex container, `<Text>` displays text strings, `<ActivityIndicator>` renders native spinners, and `StyleSheet` defines optimized styles.
* `import { StatusBar } from 'expo-status-bar'`: Controls the top device status bar (time, battery, Wi-Fi indicators). `style="light"` renders white text for dark mode.

### State Declarations (Lines 7–11)
* `const [articles, setArticles] = useState([])`: Initializes an empty array for storing article objects fetched from the API.
* `const [loading, setLoading] = useState(true)`: Controls whether the loading spinner is displayed (`true` by default).
* `const [refreshing, setRefreshing] = useState(false)`: State variable for managing pull-to-refresh list state.
* `const [selectedCategory, setSelectedCategory] = useState('reactnative')`: Stores the active category tag string.
* `const [bookmarks, setBookmarks] = useState([])`: Initializes an array to hold saved offline articles.

### Async API Fetch Function (Lines 14–27)
* `const fetchArticles = async (category) => { ... }`: Defines an asynchronous function using `async/await`.
* `setLoading(true)`: Immediately shows the loading spinner when a fetch starts.
* `await fetch(...)`: Sends an HTTP GET request to Dev.to REST API filtered by the passed tag parameter.
* `const data = await response.json()`: Parses the HTTP response body into a JavaScript array of objects.
* `setArticles(data)`: Updates the `articles` state variable, triggering a UI re-render with the new data.
* `catch (error) { ... }`: Intercepts network or parsing errors and logs them to the console.
* `finally { setLoading(false); }`: Always executes at the end of the request (success or failure) to turn off the loading spinner.

### Lifecycle Effect (Lines 30–32)
* `useEffect(() => { fetchArticles(selectedCategory); }, [selectedCategory]);`: Tells React to execute `fetchArticles()` when the component first mounts, and re-execute it whenever `selectedCategory` state changes.

### JSX View Template (Lines 34–63)
* `<View style={styles.container}>`: Full-screen root container.
* `{loading ? ( <ActivityIndicator ... /> ) : ( ... )}`: Conditional ternary operator. Displays the native loading indicator while `loading === true`, and switches to the main content once `loading === false`.
* `articles[0]?.title`: Uses Optional Chaining (`?.`) to safely access the title of the first article without causing a runtime crash if `articles` is temporarily empty.

### StyleSheet Definitions (Lines 66–117)
* `flex: 1`: Expands the container to take up 100% of the available mobile screen height.
* `backgroundColor: '#0f172a'`: Applied dark slate background color (`#0f172a`).
* `justifyContent: 'center'` & `alignItems: 'center'`: Centers child components horizontally and vertically along the main flex axis.

---

## 📚 1. Core React Native Architecture vs. Web React

### What is React Native?
React Native is an open-source framework developed by Meta (Facebook) that allows developers to build real, native mobile applications for iOS and Android using JavaScript and React.

### Key Architectural Difference: Web React vs. React Native

| Feature | Web React (React-DOM) | React Native |
| :--- | :--- | :--- |
| **Rendering Engine** | Browser DOM (`HTMLDocument`) | Native iOS/Android UI Components |
| **Elements** | `<div>`, `<p>`, `<span>`, `<img>`, `<button>` | `<View>`, `<Text>`, `<Image>`, `<TouchableOpacity>` |
| **Styling** | CSS, SASS, Tailwind, CSS Modules | JavaScript `StyleSheet` objects (Flexbox based) |
| **Layout Direction** | `flexDirection: 'row'` (default) | `flexDirection: 'column'` (default) |
| **JS Engine** | V8 (Chrome), JavaScriptCore (Safari), SpiderMonkey | **Hermes** / JavaScriptCore |

---

### The React Native Threading Model (Advanced Concept)

React Native applications run across **three main threads**:

1. **JavaScript Thread**:
   * Runs the JavaScript bundle (React components, business logic, state updates, API calls).
   * Executes inside the **Hermes** JavaScript engine.
2. **UI (Main/Native) Thread**:
   * Responsible for rendering native Android `android.view.View` and iOS `UIView` widgets.
   * Handles user gestures and screen redraws.
3. **Shadow Thread (Yoga Layout Engine)**:
   * Calculates element positions and Flexbox layouts.
   * Converts Flexbox rules into native layout coordinates before sending them to the UI thread.

> **💡 Senior Interview Tip:**  
> **Question:** *What is the React Native Bridge and JSI?*  
> **Answer:** Historically, the JS Thread and Native Thread communicated by passing asynchronous JSON messages back and forth across an asynchronous **Bridge**. In modern React Native (Fabric architecture), the bridge is replaced by **JSI (JavaScript Interface)**, which allows direct C++ reference calls between JS and Native memory, drastically speeding up performance!

---

## 🎨 2. React Native UI Primitives & Flexbox Layout Engine

### Core Components Used in Step 3

#### 1. `<View>`
* **Description:** The most fundamental UI container. It maps directly to `UIView` on iOS and `android.view.View` on Android.
* **Rule:** `<View>` cannot hold bare string text. You must wrap text in `<Text>`.

#### 2. `<Text>`
* **Description:** Used to display typography. Maps to `UILabel` (iOS) or `TextView` (Android).
* **Rule:** Supports nested styling (e.g., `<Text style={{fontWeight:'bold'}}>Bold <Text style={{color:'red'}}>Red</Text></Text>`).

#### 3. `<ActivityIndicator>`
* **Description:** Renders a native progress spinner (`UIActivityIndicatorView` on iOS and `ProgressBar` on Android).
* **Props:** `size="small" | "large"`, `color="#hex"`.

#### 4. `StyleSheet.create()`
* **Why use `StyleSheet.create()` instead of inline objects `style={{flex: 1}}`?**
  * **Performance Optimization:** `StyleSheet.create()` validates style properties at runtime creation and sends style IDs across the bridge once, rather than re-creating new JavaScript style objects on every single render.

---

### Flexbox Rules in React Native

1. **`flex: 1`**: Instructs a component to expand and fill all available space of its parent container.
2. **`flexDirection` Defaults to `'column'`**: Unlike Web CSS where flex items align side-by-side (`row`), mobile layouts stack vertically (`column`) by default.
3. **No Pixel Units (`px`, `em`, `rem`)**: Dimensions in React Native are unitless density-independent points (`dp` on Android, `pt` on iOS).

---

## 🔄 3. State Management & Lifecycle Hooks

### 1. `useState` Hook
`useState` allows components to preserve state across renders.

```javascript
const [articles, setArticles] = useState([]);
```

* **`articles`**: Read-only state variable.
* **`setArticles(newValue)`**: Setter function. Triggers a component re-render when called.
* **State Batching:** React batches multiple state updates together during event handlers to avoid unnecessary UI redraws.

---

### 2. `useEffect` Hook & The Dependency Array

`useEffect` manages side-effects like fetching data from APIs, subscribing to device sensors, or setting up timers.

```javascript
useEffect(() => {
  fetchArticles(selectedCategory);
}, [selectedCategory]);
```

#### The 3 Dependency Behaviors:

1. **Empty Dependency Array `[]`**:
   * Runs **ONCE** when the component mounts (loads for the first time).
   * Equivalent to `componentDidMount` in legacy class components.
2. **With Dependencies `[selectedCategory]`**:
   * Runs on mount **AND** whenever `selectedCategory` changes value.
3. **No Dependency Array at all `useEffect(() => {})`**:
   * Runs after **EVERY SINGLE RENDER**. *(Avoid this for API calls, as it creates infinite loops!)*

---

## 🌐 4. Asynchronous Data Fetching & Network Resilience

### The Async/Await Pattern

```javascript
const fetchArticles = async (category) => {
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
```

### Breakdown of Network Error Handling:

1. **`try` block**: Executes the network request. `await fetch()` pauses execution until the HTTP headers return, then `await response.json()` parses the JSON body.
2. **`catch` block**: Intercepts network disconnects, DNS failures, or invalid JSON responses. Prevents the app from crashing.
3. **`finally` block**: **CRITICAL FOR MOBILE.** Guarantees that `setLoading(false)` executes regardless of whether the API call succeeded or failed. Without `finally`, a failed network call would leave the user trapped on a permanent loading spinner.

---

## 🎯 5. Top Interview Questions & Detailed Answers

### Q1: What happens if an API call is running inside `useEffect` and the user unmounts the component before it completes?
**Answer:** In older React versions, this caused a memory leak warning (*"Can't perform a React state update on an unmounted component"*).  
**Solution:** Use an `AbortController` signal inside `useEffect` to cancel the HTTP request on cleanup:
```javascript
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setArticles(data));

  return () => controller.abort(); // Cleanup function
}, [category]);
```

---

### Q2: How does conditional rendering work in React Native JSX?
**Answer:** Using JavaScript logical operators like the **Ternary Operator (`condition ? <ComponentA /> : <ComponentB />`)** or logical AND (`condition && <ComponentA />`).  
*Gotcha Warning:* In React Native, `0 && <Text>Hi</Text>` will render the raw number `0` to the screen instead of hiding it, and can crash if not wrapped in `<Text>`. Always cast boolean flags explicitly (`Boolean(count) && ...`).

---

### Q3: Why is Expo recommended for fast mobile development over React Native CLI?
**Answer:**
* **Expo:** Provides a managed workflow with pre-compiled native SDKs, zero Xcode/Android Studio configuration required for early development, instant over-the-air updates (OTA), and live preview via the Expo Go app.
* **React Native CLI:** Bare workflow where you manually edit Android Java/Kotlin and iOS Swift/Objective-C native code. Best when building custom native C++ libraries or low-level bluetooth/hardware integrations.

---

### Q4: How do you handle styling for different mobile screen sizes in React Native?
**Answer:**
1. Using **Flexbox** percentage widths and `flex: 1` liquid layouts.
2. Using the `useWindowDimensions()` hook or `Dimensions.get('window')` to compute pixel math dynamically.
3. Using `SafeAreaView` / `useSafeAreaInsets()` from `react-native-safe-area-context` to avoid notch cutouts and bottom home bar indicators.

---

*This guide corresponds to Step 1 to Step 3 of the Tech Digest application.*
