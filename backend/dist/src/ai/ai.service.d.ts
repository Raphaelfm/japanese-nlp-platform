export declare class AIService {
    private geminiApiKey;
    private geminiUrl;
    detectLanguage(text: string): string;
    translateText(text: string): Promise<string>;
}
