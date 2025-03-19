import { Module } from '@nestjs/common';
import { TextAnalysisService } from './text-analysis.service';
import { TextAnalysisController } from './text-analysis.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AIService } from 'src/ai/ai.service';

@Module({
  imports: [],
  providers: [TextAnalysisService, PrismaService, AIService],
  controllers: [TextAnalysisController],
  exports: [TextAnalysisService],
})
export class TextAnalysisModule {}
