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
exports.DatabasePropertyRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const property_entity_1 = require("../entities/property.entity");
const property_model_1 = require("../../domain/model/property.model");
let DatabasePropertyRepository = class DatabasePropertyRepository {
    constructor(propertyEntityRepository) {
        this.propertyEntityRepository = propertyEntityRepository;
    }
    async update(uuid, title, price) {
        await this.propertyEntityRepository.update({
            uuid,
        }, {
            title,
            price,
        });
    }
    async create(property) {
        const propertyEntity = this.toEntity(property);
        const result = await this.propertyEntityRepository.insert(propertyEntity);
        return this.toDomainModel(result.generatedMaps[0]);
    }
    async findAll() {
        const propertiesEntity = await this.propertyEntityRepository.find();
        return propertiesEntity.map((propertyEntity) => this.toDomainModel(propertyEntity));
    }
    async findById(uuid) {
        const propertyEntity = await this.propertyEntityRepository.findOneOrFail({ uuid });
        return this.toDomainModel(propertyEntity);
    }
    async deleteById(uuid) {
        await this.propertyEntityRepository.delete({ uuid });
    }
    toDomainModel(propertyEntity) {
        const property = new property_model_1.PropertyModel();
        property.id = propertyEntity.id;
        property.uuid = propertyEntity.uuid;
        property.title = propertyEntity.title;
        property.price = propertyEntity.price;
        property.createdAt = propertyEntity.createdAt;
        return property;
    }
    toEntity(property) {
        const propertyEntity = new property_entity_1.Property();
        propertyEntity.id = property.id;
        propertyEntity.uuid = property.uuid;
        propertyEntity.title = property.title;
        propertyEntity.price = property.price;
        propertyEntity.createdAt = property.createdAt;
        return propertyEntity;
    }
};
DatabasePropertyRepository = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(property_entity_1.Property)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DatabasePropertyRepository);
exports.DatabasePropertyRepository = DatabasePropertyRepository;
//# sourceMappingURL=property.repository.js.map