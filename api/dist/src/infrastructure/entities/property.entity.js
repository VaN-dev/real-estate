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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const typeorm_1 = require("typeorm");
let Property = class Property {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'integer' }),
    __metadata("design:type", Number)
], Property.prototype, "id", void 0);
__decorate([
    typeorm_1.Index({ unique: true }),
    typeorm_1.Column('char', { length: 36, nullable: false, unique: true }),
    __metadata("design:type", String)
], Property.prototype, "uuid", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 255, nullable: false }),
    __metadata("design:type", String)
], Property.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Property.prototype, "price", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at', nullable: false }),
    __metadata("design:type", Date)
], Property.prototype, "createdAt", void 0);
Property = __decorate([
    typeorm_1.Entity()
], Property);
exports.Property = Property;
//# sourceMappingURL=property.entity.js.map