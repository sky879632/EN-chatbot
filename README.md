# English Practice Chatbot

![Chatbot Demo](https://example.com/chatbot-demo.gif)

**English Practice Chatbot** 是一個簡單的網頁應用，旨在幫助英語學習者練習日常口說對話。透過模擬真實場景（如點餐、打招呼和問路），用戶可以在無壓力的環境中建立英語口說習慣。這個專案是我的 Side Project，目的是展示我在產品設計和執行力上的能力，作為轉職成為產品經理（PM）的一部分。

## 專案背景

許多非英語母語者希望提升口說能力，但缺乏低壓力的練習環境。根據我對朋友的訪談，許多人害怕在真實對話中犯錯，因此我設計了這個 Chatbot，讓用戶可以透過模擬對話場景練習英語，同時加入圖片和語音功能，增強學習效果。

## 功能介紹

- **對話模組**  
  用戶可以從下拉選單中選擇三個模組：
  - 「Ordering（點餐）」  
  - 「Greeting（日常打招呼）」  
  - 「Asking Directions（問路）」  

- **對話樹與隨機回應**  
  每個模組都有預設的對話樹，Chatbot 會根據用戶輸入回應，並隨機挑選回應，減少制式感，提升互動性。

- **圖片情境**  
  在對話中顯示相關圖片（如咖啡杯、公園），幫助用戶將詞彙與視覺聯繫，提升記憶效果。

- **語音功能**  
  - **文字轉語音（TTS）**：Chatbot 會朗讀其回應，讓用戶聽到正確發音。  
  - **語音轉文字（STT）**：用戶可以透過錄音按鈕用語音輸入，模擬真實對話。

- **技術堆疊**  
  使用 React、JavaScript 和 CSS 開發，部署在 GitHub Pages。

## 設計思路

### 用戶洞察
- **問題**：英語學習者缺乏口說練習機會，尤其害怕在真實對話中犯錯。  
- **解決方案**：提供一個無壓力的 Chatbot 環境，讓用戶模擬日常對話，並透過圖片和語音功能提升學習體驗。

### 產品設計
- **MVP 策略**：選擇三個常見場景（點餐、打招呼、問路）作為最小可行產品（MVP），驗證用戶接受度。  
- **功能優先級**：先實現核心對話功能，再加入圖片和語音，提升互動性。  
- **未來計畫**：擴展更多模組（如購物、旅行）、加入語法檢查和進階語音功能（如發音評估）。

### 技術實現
- **前端**：使用 React 管理狀態和 UI，Speech Synthesis API 實現 TTS，Speech Recognition API 實現 STT。  
- **設計考量**：保持介面簡潔，聚焦於對話和圖片展示，確保語音功能易於使用。

## 安裝與使用

### 線上 Demo
- [GitHub Pages 連結](https://yourusername.github.io/english-practice-chatbot/)

### 本地運行
1. 克隆專案：
   ```bash
   git clone https://github.com/yourusername/english-practice-chatbot.git
