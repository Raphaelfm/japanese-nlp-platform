import { PrismaService } from '../../prisma/prisma.service';
export declare class TextAnalysisService {
    private prisma;
    constructor(prisma: PrismaService);
    createAnalysis(text: string, translated: string, sentiment: string): Promise<{
        id: number;
        text: string;
        translated: string | null;
        sentiment: string | null;
        createdAt: Date;
    }>;
    getAllAnalyses(): Promise<{
        id: number;
        text: string;
        translated: string | null;
        sentiment: string | null;
        createdAt: Date;
    }[]>;
    deleteAnalysis(id: number): Promise<boolean>;
}
