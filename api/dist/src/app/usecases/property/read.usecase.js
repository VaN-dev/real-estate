"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReadUseCase {
    constructor(propertyRepository) {
        this.propertyRepository = propertyRepository;
    }
    async execute(uuid) {
        return await this.propertyRepository.findById(uuid);
    }
}
exports.default = ReadUseCase;
//# sourceMappingURL=read.usecase.js.map