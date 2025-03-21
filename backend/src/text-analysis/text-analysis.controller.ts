import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TextAnalysisService } from './text-analysis.service';
import { AIService } from '../ai/ai.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/roles.guard';

@Controller('text-analysis')
export class TextAnalysisController {
  constructor(
    private readonly textAnalysisService: TextAnalysisService,
    private readonly aiService: AIService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async analyzeText(
    @Body() data: { text: string },
    @Request() req: { user: { userId: number } },
  ) {
    const translated = await this.aiService.translateText(data.text);
    return this.textAnalysisService.createAnalysis(
      data.text,
      translated.split('#')[0],
      translated.split('#')[1],
      req.user.userId,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserTranslations(@Request() req: { user: { userId: number } }) {
    return this.textAnalysisService.getUserAnalyses(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get('all')
  async getAllTranslations() {
    return this.textAnalysisService.getAllAnalyses();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteTranslation(
    @Param('id') id: string,
    @Request() req: { user: { userId: number; role: string } },
  ) {
    const deleted = await this.textAnalysisService.deleteAnalysis(
      Number(id),
      req.user.userId,
      req.user.role,
    );
    if (!deleted) {
      throw new HttpException('Translation not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Translation deleted successfully' };
  }
}
