"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser1648623447697 = void 0;
class addUser1648623447697 {
    constructor() {
        this.name = 'addUser1648623447697';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "realestate"."user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" text NOT NULL, "createdate" TIMESTAMP NOT NULL DEFAULT now(), "updateddate" TIMESTAMP NOT NULL DEFAULT now(), "last_login" TIMESTAMP, "hach_refresh_token" character varying, CONSTRAINT "UQ_b67337b7f8aa8406e936c2ff754" UNIQUE ("username"), CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_379734db6c5c7299c67bb60bb0" ON "realestate"."user" ("username") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "realestate"."IDX_379734db6c5c7299c67bb60bb0"`);
        await queryRunner.query(`DROP TABLE "realestate"."user"`);
    }
}
exports.addUser1648623447697 = addUser1648623447697;
//# sourceMappingURL=1648623447697-addUser.js.map