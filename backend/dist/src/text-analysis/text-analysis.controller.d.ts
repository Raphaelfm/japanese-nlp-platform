import { TextAnalysisService } from './text-analysis.service';
import { AIService } from '../ai/ai.service';
export declare class TextAnalysisController {
    private readonly textAnalysisService;
    private readonly aiService;
    constructor(textAnalysisService: TextAnalysisService, aiService: AIService);
    analyzeText(data: {
        text: string;
    }): Promise<{
        id: number;
        text: string;
        translated: string | null;
        sentiment: string | null;
        createdAt: Date;
    }>;
    getAll(): Promise<{
        id: number;
        text: string;
        translated: string | null;
        sentiment: string | null;
        createdAt: Date;
    }[]>;
    deleteTranslation(id: string): Promise<{
        message: string;
    }>;
}
