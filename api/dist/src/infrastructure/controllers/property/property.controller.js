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
exports.PropertyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const uuid_1 = require("uuid");
const response_decorator_1 = require("../../common/swagger/response.decorator");
const property_presenter_1 = require("./property.presenter");
const list_usecase_1 = require("../../../app/usecases/property/list.usecase");
const read_usecase_1 = require("../../../app/usecases/property/read.usecase");
const create_usecase_1 = require("../../../app/usecases/property/create.usecase");
const update_usecase_1 = require("../../../app/usecases/property/update.usecase");
const property_dto_1 = require("./property.dto");
const delete_usecase_1 = require("../../../app/usecases/property/delete.usecase");
let PropertyController = class PropertyController {
    constructor(listUseCase, readUseCase, createUseCase, updateUseCase, deleteUseCase) {
        this.listUseCase = listUseCase;
        this.readUseCase = readUseCase;
        this.createUseCase = createUseCase;
        this.updateUseCase = updateUseCase;
        this.deleteUseCase = deleteUseCase;
    }
    async list() {
        const properties = await this.listUseCase.execute();
        return properties.map((property) => new property_presenter_1.PropertyPresenter(property));
    }
    async read(uuid) {
        const resource = await this.readUseCase.execute(uuid);
        return new property_presenter_1.PropertyPresenter(resource);
    }
    async create(addPropertyDto) {
        const uuid = uuid_1.v4();
        const { title, price } = addPropertyDto;
        await this.createUseCase.execute(uuid, title, price);
        const resource = await this.readUseCase.execute(uuid);
        return new property_presenter_1.PropertyPresenter(resource);
    }
    async update(uuid, updatePropertyDto) {
        const { title, price } = updatePropertyDto;
        await this.updateUseCase.execute(uuid, title, price);
        return 'success';
    }
    async delete(uuid) {
        await this.deleteUseCase.execute(uuid);
    }
};
__decorate([
    common_1.Get(),
    response_decorator_1.ApiResponseType(property_presenter_1.PropertyPresenter, true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "list", null);
__decorate([
    common_1.Get(':uuid'),
    response_decorator_1.ApiResponseType(property_presenter_1.PropertyPresenter, false),
    __param(0, common_1.Param('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "read", null);
__decorate([
    common_1.Post(),
    response_decorator_1.ApiResponseType(property_presenter_1.PropertyPresenter, true),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [property_dto_1.CreatePropertyDto]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "create", null);
__decorate([
    common_1.Put(':uuid'),
    response_decorator_1.ApiResponseType(property_presenter_1.PropertyPresenter, true),
    __param(0, common_1.Param('uuid')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, property_dto_1.UpdatePropertyDto]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "update", null);
__decorate([
    common_1.Delete(':uuid'),
    response_decorator_1.ApiResponseType(property_presenter_1.PropertyPresenter, true),
    __param(0, common_1.Param('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "delete", null);
PropertyController = __decorate([
    common_1.Controller('properties'),
    swagger_1.ApiTags('Properties'),
    swagger_1.ApiResponse({ status: 500, description: 'Internal error' }),
    swagger_1.ApiExtraModels(property_presenter_1.PropertyPresenter),
    __metadata("design:paramtypes", [list_usecase_1.default,
        read_usecase_1.default,
        create_usecase_1.default,
        update_usecase_1.default,
        delete_usecase_1.default])
], PropertyController);
exports.PropertyController = PropertyController;
//# sourceMappingURL=property.controller.js.map