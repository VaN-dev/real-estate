import {MigrationInterface, QueryRunner} from "typeorm";

export class addUser1648623447697 implements MigrationInterface {
    name = 'addUser1648623447697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "realestate"."user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" text NOT NULL, "createdate" TIMESTAMP NOT NULL DEFAULT now(), "updateddate" TIMESTAMP NOT NULL DEFAULT now(), "last_login" TIMESTAMP, "hach_refresh_token" character varying, CONSTRAINT "UQ_b67337b7f8aa8406e936c2ff754" UNIQUE ("username"), CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_379734db6c5c7299c67bb60bb0" ON "realestate"."user" ("username") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "realestate"."IDX_379734db6c5c7299c67bb60bb0"`);
        await queryRunner.query(`DROP TABLE "realestate"."user"`);
    }

}
