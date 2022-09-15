"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_model_1 = require("../../../domain/model/property.model");
class CreateUseCase {
    constructor(logger, propertyRepository) {
        this.logger = logger;
        this.propertyRepository = propertyRepository;
    }
    async execute(uuid, title, price) {
        const model = new property_model_1.PropertyModel();
        model.uuid = uuid;
        model.title = title;
        model.price = price;
        const result = await this.propertyRepository.create(model);
        this.logger.log('CreatePropertyUsecases execute', 'New Property have been inserted');
        return result;
    }
}
exports.default = CreateUseCase;
//# sourceMappingURL=create.usecase.js.map