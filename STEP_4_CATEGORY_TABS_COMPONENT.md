# Step 4: Component Study Guide — `src/components/CategoryTabs.js`

---

## 📄 Complete Source Code: `src/components/CategoryTabs.js`

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
```

---

## 🔍 Line-by-Line Code Breakdown

### Imports (Lines 1–2)
* `import React from 'react'`: Standard React import required for JSX evaluation.
* `import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'`:
  * `<ScrollView>`: Allows scrolling content left-to-right when `horizontal={true}`.
  * `<TouchableOpacity>`: Native touchable element that dims in opacity (`activeOpacity={0.7}`) when tapped by the user.

### Constant Data Configuration (Lines 4–10)
* `const CATEGORIES = [...]`: Static array of category objects defining the `id` string (passed to Dev.to API) and human-readable `label`.

### Component Props (Line 12)
* `export default function CategoryTabs({ selectedCategory, onSelectCategory })`:
  * `selectedCategory`: String prop passed down from `App.js` parent state.
  * `onSelectCategory`: Callback function prop passed down from `App.js` parent to update state when a tab pill is pressed.

### JSX Render & Mapping (Lines 14–33)
* `<ScrollView horizontal showsHorizontalScrollIndicator={false}>`: Configures horizontal scrolling and hides the default scrollbar indicator overlay.
* `contentContainerStyle={styles.scrollContent}`: Appling `gap: 8` and horizontal padding directly to the inner scroll content container instead of the outer scroll viewport.
* `{CATEGORIES.map((category) => { ... })}`: JavaScript `.map()` iterates over each category object and returns a touchable pill component.
* `const isActive = selectedCategory === category.id`: Boolean check to evaluate if the current pill matches the active category.
* `style={[styles.pill, isActive && styles.activePill]}`: React Native style array syntax. If `isActive === true`, properties inside `styles.activePill` override properties in `styles.pill`.
* `onPress={() => onSelectCategory(category.id)}`: Executes the parent handler function with the clicked category ID.

---

## 🧠 Core Concepts Taught in This File

1. **Unidirectional Data Flow**: Components in React Native receive state (`selectedCategory`) and event handlers (`onSelectCategory`) via **props** from parent to child. Child components call parent callbacks to trigger state updates.
2. **Conditional Array Styling**: React Native style props accept arrays `style={[style1, condition && style2]}`. This allows dynamic visual states (like pill highlight colors) without messy string concatenation.
3. **`ScrollView` Content Container Style**: In React Native, `<ScrollView>` has two style props: `style` (styles the outer clipping viewport) and `contentContainerStyle` (styles the inner scrolling flex container).

---

## 🎯 Interview Q&A for This Component

### Q: What is the difference between `style` and `contentContainerStyle` on a `<ScrollView>`?
**Answer:** `style` applies layout rules (like `flex: 1` or `height`) to the scroll viewport wrapper itself. `contentContainerStyle` applies layout rules (like `padding`, `alignItems`, or `gap`) to the inner content canvas that moves as the user scrolls.

---
