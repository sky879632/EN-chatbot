import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]); // 每個訊息包含 text, sender, image
  const [input, setInput] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [currentNode, setCurrentNode] = useState('start');
  const [isRecording, setIsRecording] = useState(false); // 是否正在錄音
  const [transcript, setTranscript] = useState(''); // 語音轉錄結果

  // 對話模組（包含圖片）
  const dialogues = {
    order: {
      start: {
        keywords: ["order", "food", "drink"],
        responses: [
          { text: "Welcome to my cafe! What would you like to order? (Try 'coffee' or 'tea')", image: "/images/cafe.jpg" },
          { text: "Hey there! Hungry or thirsty? What do you want? (Try 'coffee' or 'tea')", image: "/images/cafe.jpg" }
        ],
        next: ["coffee", "tea"]
      },
      coffee: {
        keywords: ["coffee"],
        responses: [
          { text: "Great! Hot or iced coffee? (Say 'hot' or 'iced')", image: "/images/coffee_cup.jpg" },
          { text: "Cool, coffee it is! How do you want it—hot or iced? (Say 'hot' or 'iced')", image: "/images/coffee_cup.jpg" }
        ],
        next: ["hot", "iced"]
      },
      tea: {
        keywords: ["tea"],
        responses: [
          { text: "Nice choice! Green tea or black tea? (Say 'green' or 'black')", image: "/images/tea.jpg" },
          { text: "Tea, huh? Do you prefer green or black? (Say 'green' or 'black')", image: "/images/tea.jpg" }
        ],
        next: ["green", "black"]
      },
      hot: {
        keywords: ["hot"],
        responses: [
          { text: "One hot coffee coming up! Anything else? (Try 'yes' or 'no')", image: "/images/hot_coffee.jpg" },
          { text: "Hot coffee, nice! Want anything else? (Try 'yes' or 'no')", image: "/images/hot_coffee.jpg" }
        ],
        next: ["yes", "no"]
      },
      iced: {
        keywords: ["iced"],
        responses: [
          { text: "One iced coffee for you! Anything else? (Try 'yes' or 'no')", image: "/images/iced_coffee.jpg" },
          { text: "Iced coffee—perfect! More to order? (Try 'yes' or 'no')", image: "/images/iced_coffee.jpg" }
        ],
        next: ["yes", "no"]
      },
      green: {
        keywords: ["green"],
        responses: [
          { text: "Green tea it is! Anything else? (Try 'yes' or 'no')", image: "/images/green_tea.jpg" },
          { text: "Green tea’s on the way! Want more? (Try 'yes' or 'no')", image: "/images/green_tea.jpg" }
        ],
        next: ["yes", "no"]
      },
      black: {
        keywords: ["black"],
        responses: [
          { text: "Black tea coming up! Anything else? (Try 'yes' or 'no')", image: "/images/black_tea.jpg" },
          { text: "Black tea, got it! Anything more? (Try 'yes' or 'no')", image: "/images/black_tea.jpg" }
        ],
        next: ["yes", "no"]
      },
      yes: {
        keywords: ["yes"],
        responses: [
          { text: "Sure, what else would you like? (Try 'coffee' or 'tea')", image: "/images/cafe.jpg" },
          { text: "Okay, what’s next on your list? (Try 'coffee' or 'tea')", image: "/images/cafe.jpg" }
        ],
        next: ["coffee", "tea"]
      },
      no: {
        keywords: ["no"],
        responses: [
          { text: "Thanks for ordering! Enjoy your meal!" },
          { text: "All done? Enjoy your order!" }
        ]
      },
      default: {
        responses: [
          { text: "Sorry, I didn’t catch that. Try saying 'coffee' or 'tea'." },
          { text: "Oops, what was that? Say 'coffee' or 'tea' to order!" }
        ]
      }
    },
    greeting: {
      start: {
        keywords: ["hi", "hello", "hey"],
        responses: [
          { text: "Hi there! How’s your day going? (Try 'good' or 'bad')", image: "/images/smile.jpg" },
          { text: "Hello! Nice to see you! How are you? (Try 'good' or 'bad')", image: "/images/smile.jpg" }
        ],
        next: ["good", "bad"]
      },
      good: {
        keywords: ["good", "great"],
        responses: [
          { text: "Awesome! What’s making it good? (Try 'weather' or 'movie')", image: "/images/sun.jpg" },
          { text: "Glad to hear that! Why’s your day so great? (Try 'weather' or 'movie')", image: "/images/sun.jpg" }
        ],
        next: ["weather", "movie"]
      },
      // 其他節點略
      default: {
        responses: [
          { text: "Hmm, not sure what you mean. Try 'good' or 'movie'." },
          { text: "Oops, I didn’t get that! Say 'good' or 'movie'." }
        ]
      }
    },
    direction: {
      start: {
        keywords: ["where", "go", "direction"],
        responses: [
          { text: "Sure, I can help! Where do you want to go? (Try 'station' or 'park')", image: "/images/map.jpg" },
          { text: "Need directions? Where are you heading? (Try 'station' or 'park')", image: "/images/map.jpg" }
        ],
        next: ["station", "park"]
      },
      station: {
        keywords: ["station", "train"],
        responses: [
          { text: "To the train station? Go straight and turn left. (Say 'thanks' or 'more')", image: "/images/station.jpg" },
          { text: "Train station? Head straight, then left. (Say 'thanks' or 'more')", image: "/images/station.jpg" }
        ],
        next: ["thanks", "more"]
      },
      park: {
        keywords: ["park"],
        responses: [
          { text: "The park? Turn right and walk two blocks. (Say 'thanks' or 'more')", image: "/images/park.jpg" },
          { text: "Park’s close! Right turn, then two blocks. (Say 'thanks' or 'more')", image: "/images/park.jpg" }
        ],
        next: ["thanks", "more"]
      },
      // 其他節點略
      default: {
        responses: [
          { text: "Sorry, where did you say? Try 'station' or 'park'." },
          { text: "Didn’t catch that! Say 'station' or 'park'." }
        ]
      }
    }
  };

  const cleanInput = (text) => {
    return text
      .toLowerCase()
      .replace(/[.,!?]/g, '')
      .split(' ')
      .filter(word => word.length > 0);
  };

  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // 語音朗讀功能
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // 設定為英語
    window.speechSynthesis.speak(utterance);
  };

  // 語音識別功能
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.lang = 'en-US'; // 設定為英語
    recognition.interimResults = false; // 只返回最終結果
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setInput(result); // 將語音轉錄填入輸入框
      setIsRecording(false);
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      setTranscript('Sorry, I couldn’t understand. Try again!');
    };
    recognition.onend = () => {
      setIsRecording(false);
    };
  }

  const startRecording = () => {
    if (recognition && !isRecording) {
      setIsRecording(true);
      setTranscript('');
      recognition.start();
    }
  };

  const stopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
    }
  };

  const handleModuleChange = (e) => {
    const module = e.target.value;
    setSelectedModule(module);
    setCurrentNode('start');
    setMessages([]);
    if (module) {
      const response = getRandomResponse(dialogues[module].start.responses);
      const botMessage = { text: response.text, sender: 'bot', image: response.image };
      setMessages([botMessage]);
      speak(response.text); // 朗讀歡迎訊息
    }
  };

  const handleSend = () => {
    if (input.trim() === '' || !selectedModule) return;
    const userMessage = { text: input, sender: 'user' }; // 用戶訊息無圖片
    setMessages([...messages, userMessage]);

    const currentDialogue = dialogues[selectedModule];
    const currentStep = currentDialogue[currentNode];
    const words = cleanInput(input);
    let botResponse = getRandomResponse(currentDialogue.default.responses);
    let nextNode = currentNode;

    if (currentStep.next) {
      for (const nextKey of currentStep.next) {
        if (currentDialogue[nextKey].keywords.some(keyword => 
          words.some(word => word.includes(keyword))
        )) {
          botResponse = getRandomResponse(currentDialogue[nextKey].responses);
          nextNode = nextKey;
          break;
        }
      }
    }

    const botMessage = { text: botResponse.text, sender: 'bot', image: botResponse.image };
    setMessages(prev => [...prev, botMessage]);
    speak(botResponse.text); // 朗讀機器人回應
    setCurrentNode(nextNode);
    setInput('');
    setTranscript(''); // 清空語音轉錄
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-container">
      <div className="module-selector">
        <select value={selectedModule} onChange={handleModuleChange} className="dropdown">
          <option value="">Select a module</option>
          <option value="order">Ordering (點餐)</option>
          <option value="greeting">Greeting (日常打招呼)</option>
          <option value="direction">Asking Directions (問路)</option>
        </select>
      </div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="avatar">
              {msg.sender === 'user' ? (
                <div className="user-avatar">You</div>
              ) : (
                <div className="bot-avatar">Bot</div>
              )}
            </div>
            <div className="message-content">
              <div className="text">{msg.text}</div>
              {msg.image && <img src={msg.image} alt="Context" className="message-image" />}
            </div>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type or speak a message..."
          className="chat-input"
          disabled={!selectedModule || isRecording}
        />
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className="record-button"
          disabled={!selectedModule}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <button onClick={handleSend} className="send-button" disabled={!selectedModule || isRecording}>
          Send
        </button>
      </div>
      {transcript && <div className="transcript">Transcript: {transcript}</div>}
    </div>
  );
}

export default App;