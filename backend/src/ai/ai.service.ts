import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GeminiResponse } from 'src/interfaces/igemini-response';

@Injectable()
export class AIService {
  private geminiApiKey = process.env.GEMINI_API_KEY;
  private geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.geminiApiKey}`;

  detectLanguage(text: string): string {
    const japaneseRegex = /[\u3040-\u30FF\u31F0-\u31FF\u4E00-\u9FAF]/;
    return japaneseRegex.test(text) ? 'japanese' : 'english';
  }

  async translateText(text: string): Promise<string> {
    const language = this.detectLanguage(text);
    let prompt: string;

    if (language === 'japanese') {
      prompt = `Você é um tradutor de textos de japonês para inglês. Traduza apenas o que for enviado em japonês e não escreva mais nada além disso, 
      coloque o sentimento marcado com # também, por exemplo Hello World #Neutro, os sentimentos devem ser em inglês, Neutral, Positive ou Negative, apenas(em inglês). Traduza: ${text}`;
    } else {
      prompt = `Você é um tradutor de inglês/português para japonês da forma mais educada. Traduza apenas o que for enviado em japonês e não escreva mais nada além disso, 
      coloque o sentimento marcado com # também, por exemplo Hello World #Neutro, os sentimentos devem ser em inglês, Neutral, Positive ou Negative, apenas(em inglês). Traduza: ${text}`;
    }

    const response = await axios.post<GeminiResponse>(this.geminiUrl, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Erro na tradução'
    );
  }
}
