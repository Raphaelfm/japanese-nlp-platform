"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const text_analysis_service_1 = require("./text-analysis.service");
describe('TextAnalysisService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [text_analysis_service_1.TextAnalysisService],
        }).compile();
        service = module.get(text_analysis_service_1.TextAnalysisService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=text-analysis.service.spec.js.map