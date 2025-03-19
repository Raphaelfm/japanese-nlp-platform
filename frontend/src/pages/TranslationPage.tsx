import { useState } from 'react';
import axios from 'axios';

export default function TranslationPage() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);
  const [animatedText, setAnimatedText] = useState('');

  const handleTranslate = async () => {
    setLoading(true);
    setSentiment('');
    setAnimatedText('');

    try {
      const response = await axios.post(
        'http://localhost:3001/text-analysis',
        { text },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      setLoading(false);
      animateText(response.data.translated);
      setSentiment(response.data.sentiment);
    } catch (error) {
      setLoading(false);
      console.error('Translation failed', error);
    }
  };

  const animateText = (fullText: string) => {
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedText(() => fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 50);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-5xl flex flex-col">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Translate & Analyze</h2>
        
        <textarea
          className="w-full p-3 sm:p-4 text-base sm:text-lg rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 h-[15vh] sm:h-[20vh]"
          placeholder="Enter text to translate..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button
          onClick={handleTranslate}
          className="mt-4 w-full px-5 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md text-base sm:text-lg font-semibold transition-all"
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>

        <div className="mt-4 sm:mt-6 text-base sm:text-lg w-full text-center">
          <p><strong>Translation:</strong> {animatedText}</p>
          <p><strong>Sentiment:</strong> {sentiment}</p>
        </div>
      </div>
    </div>
  );
}
