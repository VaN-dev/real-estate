"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.property1651679042428 = void 0;
class property1651679042428 {
    constructor() {
        this.name = 'property1651679042428';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "realestate"."property" ("id" SERIAL NOT NULL, "uuid" character(36) NOT NULL, "title" character varying(255) NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_49d585224e74686bd60049688ee" UNIQUE ("uuid"), CONSTRAINT "PK_fad6e9fefd9a13e89c1afc8f169" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_49d585224e74686bd60049688e" ON "realestate"."property" ("uuid") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "realestate"."IDX_49d585224e74686bd60049688e"`);
        await queryRunner.query(`DROP TABLE "realestate"."property"`);
    }
}
exports.property1651679042428 = property1651679042428;
//# sourceMappingURL=1651679042428-property.js.map