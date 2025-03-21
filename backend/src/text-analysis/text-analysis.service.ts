import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TextAnalysisService {
  constructor(private prisma: PrismaService) {}

  async createAnalysis(
    text: string,
    translated: string,
    sentiment: string,
    userId: number,
  ) {
    return this.prisma.textAnalysis.create({
      data: { text, translated, sentiment, userId },
    });
  }

  async getUserAnalyses(userId: number) {
    return this.prisma.textAnalysis.findMany({
      where: { userId },
    });
  }

  async getAllAnalyses() {
    return this.prisma.textAnalysis.findMany();
  }

  async deleteAnalysis(
    id: number,
    userId: number,
    role: string,
  ): Promise<boolean> {
    const analysis = await this.prisma.textAnalysis.findUnique({
      where: { id },
    });

    if (!analysis || (role !== 'ADMIN' && analysis.userId !== userId))
      return false;

    await this.prisma.textAnalysis.delete({ where: { id } });
    return true;
  }
}
