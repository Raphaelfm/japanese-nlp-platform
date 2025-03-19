import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TextAnalysisService {
  constructor(private prisma: PrismaService) {}

  async createAnalysis(text: string, translated: string, sentiment: string) {
    return this.prisma.textAnalysis.create({
      data: { text, translated, sentiment },
    });
  }

  async getAllAnalyses() {
    return this.prisma.textAnalysis.findMany();
  }

  async deleteAnalysis(id: number): Promise<boolean> {
    const analysis = await this.prisma.textAnalysis.findUnique({
      where: { id },
    });
    if (!analysis) return false;

    await this.prisma.textAnalysis.delete({ where: { id } });
    return true;
  }
}
