import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [emoji, setEmoji] = useState('');

  // ตาราง mapping
  const emojiMap = {
    "0": "🙂",
    "1": "😢",
    "2": "😡",
    "3": "😑",
    "4": "😱",
    "5": "😓",
    "6": "🤔",
    "7": "😴",
    "8": "😝",
    "9": "😍",
    "10": "😌",
    "11": "😐",
    "12": "😁",
    "13": "😳",
    "14": "😵",
    "15": "💔",
    "16": "😎",
    "17": "😭",
    "18": "😅",
    "19": "😊",
    "20": "💜",
    "21": "🥺"
  };

  const predictEmoji = async () => {
    try {
      const response = await axios.get('https://api.aiforthai.in.th/emoji', {
        params: { text },
        headers: {
          Apikey: process.env.REACT_APP_EMOJI_API_KEY
        }
      });

      const probabilities = response.data;
      console.log('ผลลัพธ์:', probabilities);

      // หารหัสที่มีค่า probability มากที่สุด
      let maxId = null;
      let maxProb = -1;

      Object.entries(probabilities).forEach(([id, probStr]) => {
        const prob = parseFloat(probStr);
        if (prob > maxProb) {
          maxProb = prob;
          maxId = id;
        }
      });

      // Map เป็น emoji
      const predictedEmoji = emojiMap[maxId] || '❓';

      setEmoji(predictedEmoji);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด: " + err.message);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>AIForThai Emoji Prediction</h1>
      <input
        type="text"
        value={text}
        placeholder="พิมพ์ข้อความ"
        onChange={e => setText(e.target.value)}
        style={{ width: 300 }}
      />
      <button onClick={predictEmoji}>ทำนาย</button>
      {emoji && (
        <h2>ผลลัพธ์: {emoji}</h2>
      )}
    </div>
  );
}

export default App;
