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
exports.PropertyPresenter = void 0;
const swagger_1 = require("@nestjs/swagger");
class PropertyPresenter {
    constructor(property) {
        this.uuid = property.uuid;
        this.title = property.title;
        this.price = property.price;
        this.createdAt = property.createdAt;
    }
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], PropertyPresenter.prototype, "uuid", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], PropertyPresenter.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], PropertyPresenter.prototype, "price", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], PropertyPresenter.prototype, "createdAt", void 0);
exports.PropertyPresenter = PropertyPresenter;
//# sourceMappingURL=property.presenter.js.map