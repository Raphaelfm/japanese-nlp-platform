"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(3001);
    console.log('Backend rodando na porta 3001');
}
bootstrap().catch((error) => {
    console.error('Error during bootstrap:', error);
});
//# sourceMappingURL=main.js.map