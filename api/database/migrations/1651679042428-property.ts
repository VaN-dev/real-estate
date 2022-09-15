import {MigrationInterface, QueryRunner} from "typeorm";

export class property1651679042428 implements MigrationInterface {
    name = 'property1651679042428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "realestate"."property" ("id" SERIAL NOT NULL, "uuid" character(36) NOT NULL, "title" character varying(255) NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_49d585224e74686bd60049688ee" UNIQUE ("uuid"), CONSTRAINT "PK_fad6e9fefd9a13e89c1afc8f169" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_49d585224e74686bd60049688e" ON "realestate"."property" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "realestate"."IDX_49d585224e74686bd60049688e"`);
        await queryRunner.query(`DROP TABLE "realestate"."property"`);
    }

}
