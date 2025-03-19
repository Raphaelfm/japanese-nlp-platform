"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AIService = class AIService {
    geminiApiKey = process.env.GEMINI_API_KEY;
    geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.geminiApiKey}`;
    detectLanguage(text) {
        const japaneseRegex = /[\u3040-\u30FF\u31F0-\u31FF\u4E00-\u9FAF]/;
        return japaneseRegex.test(text) ? 'japanese' : 'english';
    }
    async translateText(text) {
        const language = this.detectLanguage(text);
        let prompt;
        if (language === 'japanese') {
            prompt = `Você é um tradutor de textos de japonês para inglês. Traduza apenas o que for enviado em japonês e não escreva mais nada além disso, 
      coloque o sentimento marcado com # também, por exemplo Hello World #Neutro, os sentimentos devem ser em inglês, Neutral, Positive ou Negative, apenas(em inglês). Traduza: ${text}`;
        }
        else {
            prompt = `Você é um tradutor de inglês/português para japonês da forma mais educada. Traduza apenas o que for enviado em japonês e não escreva mais nada além disso, 
      coloque o sentimento marcado com # também, por exemplo Hello World #Neutro, os sentimentos devem ser em inglês, Neutral, Positive ou Negative, apenas(em inglês). Traduza: ${text}`;
        }
        const response = await axios_1.default.post(this.geminiUrl, {
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
        });
        return (response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            'Erro na tradução');
    }
};
exports.AIService = AIService;
exports.AIService = AIService = __decorate([
    (0, common_1.Injectable)()
], AIService);
//# sourceMappingURL=ai.service.js.map