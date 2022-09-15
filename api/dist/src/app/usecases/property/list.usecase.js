"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListUseCase {
    constructor(propertyRepository) {
        this.propertyRepository = propertyRepository;
    }
    async execute() {
        return await this.propertyRepository.findAll();
    }
}
exports.default = ListUseCase;
//# sourceMappingURL=list.usecase.js.map