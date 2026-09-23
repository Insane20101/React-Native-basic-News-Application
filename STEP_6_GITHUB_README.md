# Step 6: Documentation Study Guide — `README.md`

---

## 📄 Complete Source Code: `README.md`

```markdown
# ⚡ Tech Digest – React Native Mobile News Reader

[![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK_52-000000?logo=expo&logoColor=white)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, high-performance cross-platform mobile news reader built with **React Native** and **Expo**. **Tech Digest** fetches live developer articles from the **Dev.to REST API**, features category filtering, pull-to-refresh feeds, native link opening, and offline persistent bookmarking using **`AsyncStorage`**.

---

## ✨ Features

* **⚡ Live REST API Feed:** Fetches real-time developer articles and metadata across multiple categories (`React Native`, `JavaScript`, `Web Dev`, `AI & ML`).
* **📱 High-Performance List Virtualization:** Implements native `<FlatList>` windowing for smooth scrolling and low memory overhead.
* **🔖 Persistent Offline Bookmarking:** Save articles to device disk storage using `@react-native-async-storage/async-storage`.
* **🔄 Pull-to-Refresh:** Integrated native `<RefreshControl>` spinner for instant feed updates.
* **🌐 Native Deep Linking:** Tap any card to launch full articles directly in the device's native browser (`Linking` API).
* **🎨 Modern Dark Theme:** Crafted with custom typography, status bar integration, and touch feedback (`TouchableOpacity`).

---

## 🛠️ Tech Stack & Dependencies

| Technology | Purpose |
| :--- | :--- |
| **React Native** | Core Cross-Platform Mobile UI Framework |
| **Expo Workflow** | Managed Build & Development Toolchain |
| **`@react-native-async-storage/async-storage`** | Persistent Key-Value Device Disk Storage |
| **`@expo/vector-icons`** | Cross-Platform Ionicons Vector Icons |
| **Dev.to REST API** | Public Developer Content Provider |

---

## 🏗️ Project Architecture

```text
tech-digest/
├── src/
│   ├── components/
│   │   ├── CategoryTabs.js   # Horizontal scrollable category pill selector
│   │   └── ArticleCard.js    # Article list item with cover image & bookmark button
│   └── utils/
│       └── storage.js        # AsyncStorage load and save helper functions
├── App.js                    # Root application component & state management
├── app.json                  # Expo SDK configuration
├── package.json              # Project dependencies
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** (v18 or higher)
* **npm** or **yarn**
* **Expo Go App** installed on iOS / Android device (optional)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/tech-digest.git
   cd tech-digest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on Device / Web:**
   * Scan the terminal **QR Code** using the **Expo Go** app on iOS or Android.
   * Or press `w` in terminal to run directly in your web browser.

---

## 📄 License
This project is open-source under the MIT License.
```

---

## 🔍 Line-by-Line & Documentation Concepts Breakdown

### Badges & Header Section
* Shields.io Badges (`img.shields.io`): Adds visual credibility to GitHub repositories. Displays framework versions, SDKs, and license status.

### Architecture Diagram Text Tree
* Presenting folder structure using clean ASCII directory trees helps technical interviewers review code layout at a glance.

### Setup Instructions
* Providing exact steps (`git clone`, `npm install`, `npx expo start`) ensures anyone reviewing your GitHub repo can run the app locally without friction.

---

## 🧠 Core Concepts Taught in Documentation

1. **GitHub Repository Presentation**: Recruiters and hiring managers spend less than 30 seconds viewing a GitHub project. Clear badges, explicit tech stack lists, and feature summaries immediately validate your claim of React Native experience.
2. **Open Source Standard**: Including quick-start instructions and licensing demonstrates professional engineering maturity.

---
