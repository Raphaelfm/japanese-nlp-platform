"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAnalysisController = void 0;
const common_1 = require("@nestjs/common");
const text_analysis_service_1 = require("./text-analysis.service");
const ai_service_1 = require("../ai/ai.service");
const passport_1 = require("@nestjs/passport");
let TextAnalysisController = class TextAnalysisController {
    textAnalysisService;
    aiService;
    constructor(textAnalysisService, aiService) {
        this.textAnalysisService = textAnalysisService;
        this.aiService = aiService;
    }
    async analyzeText(data) {
        const translated = await this.aiService.translateText(data.text);
        return this.textAnalysisService.createAnalysis(data.text, translated.split('#')[0], translated.split('#')[1]);
    }
    async getAll() {
        return this.textAnalysisService.getAllAnalyses();
    }
    async deleteTranslation(id) {
        const deleted = await this.textAnalysisService.deleteAnalysis(Number(id));
        if (!deleted) {
            throw new common_1.HttpException('Translation not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { message: 'Translation deleted successfully' };
    }
};
exports.TextAnalysisController = TextAnalysisController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TextAnalysisController.prototype, "analyzeText", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TextAnalysisController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TextAnalysisController.prototype, "deleteTranslation", null);
exports.TextAnalysisController = TextAnalysisController = __decorate([
    (0, common_1.Controller)('text-analysis'),
    __metadata("design:paramtypes", [text_analysis_service_1.TextAnalysisService,
        ai_service_1.AIService])
], TextAnalysisController);
//# sourceMappingURL=text-analysis.controller.js.map