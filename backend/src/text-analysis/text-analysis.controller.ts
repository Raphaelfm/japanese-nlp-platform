import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TextAnalysisService } from './text-analysis.service';
import { AIService } from '../ai/ai.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('text-analysis')
export class TextAnalysisController {
  constructor(
    private readonly textAnalysisService: TextAnalysisService,
    private readonly aiService: AIService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async analyzeText(@Body() data: { text: string }) {
    const translated = await this.aiService.translateText(data.text);
    return this.textAnalysisService.createAnalysis(
      data.text,
      translated.split('#')[0],
      translated.split('#')[1],
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll() {
    return this.textAnalysisService.getAllAnalyses();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteTranslation(@Param('id') id: string) {
    const deleted = await this.textAnalysisService.deleteAnalysis(Number(id));
    if (!deleted) {
      throw new HttpException('Translation not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Translation deleted successfully' };
  }
}
