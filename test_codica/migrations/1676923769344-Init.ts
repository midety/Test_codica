import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1676923769344 implements MigrationInterface {
    name = 'Init1676923769344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_type_enum" AS ENUM('profitable', 'consumable')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "type" "public"."transactions_type_enum" NOT NULL, "bank_id" uuid NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "banks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "balance" integer NOT NULL, CONSTRAINT "PK_3975b5f684ec241e3901db62d77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions_categories" ("transaction_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_0c98e2d468b4f7f72796725ec32" PRIMARY KEY ("transaction_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1c1b4bd28e12a3e7352d199359" ON "transactions_categories" ("transaction_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_76d1f2f2b12192ba19d75550a8" ON "transactions_categories" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_006f5894681e98d68fa2a829a4d" FOREIGN KEY ("bank_id") REFERENCES "banks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions_categories" ADD CONSTRAINT "FK_1c1b4bd28e12a3e7352d1993593" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "transactions_categories" ADD CONSTRAINT "FK_76d1f2f2b12192ba19d75550a88" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions_categories" DROP CONSTRAINT "FK_76d1f2f2b12192ba19d75550a88"`);
        await queryRunner.query(`ALTER TABLE "transactions_categories" DROP CONSTRAINT "FK_1c1b4bd28e12a3e7352d1993593"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_006f5894681e98d68fa2a829a4d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_76d1f2f2b12192ba19d75550a8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1c1b4bd28e12a3e7352d199359"`);
        await queryRunner.query(`DROP TABLE "transactions_categories"`);
        await queryRunner.query(`DROP TABLE "banks"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_type_enum"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
