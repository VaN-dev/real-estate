"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteUseCase {
    constructor(logger, propertyRepository) {
        this.logger = logger;
        this.propertyRepository = propertyRepository;
    }
    async execute(uuid) {
        await this.propertyRepository.deleteById(uuid);
        this.logger.log('deletePropertyUseCases execute', `Todo ${uuid} have been deleted`);
    }
}
exports.default = DeleteUseCase;
//# sourceMappingURL=delete.usecase.js.map