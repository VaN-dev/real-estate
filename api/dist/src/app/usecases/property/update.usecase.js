"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateUseCase {
    constructor(logger, propertyRepository) {
        this.logger = logger;
        this.propertyRepository = propertyRepository;
    }
    async execute(uuid, title, price) {
        await this.propertyRepository.update(uuid, title, price);
        this.logger.log('updatePropertyUseCases execute', `Property ${uuid} have been updated`);
    }
}
exports.default = UpdateUseCase;
//# sourceMappingURL=update.usecase.js.map