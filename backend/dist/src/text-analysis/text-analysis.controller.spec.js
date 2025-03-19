"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const text_analysis_controller_1 = require("./text-analysis.controller");
describe('TextAnalysisController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [text_analysis_controller_1.TextAnalysisController],
        }).compile();
        controller = module.get(text_analysis_controller_1.TextAnalysisController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=text-analysis.controller.spec.js.map