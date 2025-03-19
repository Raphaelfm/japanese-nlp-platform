import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { TextAnalysisModule } from './text-analysis/text-analysis.module';
import { AIService } from './ai/ai.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TextAnalysisModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AIService],
  exports: [PrismaService, AIService],
})
export class AppModule {}
