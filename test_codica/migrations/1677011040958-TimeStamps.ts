import { MigrationInterface, QueryRunner } from "typeorm";

export class TimeStamps1677011040958 implements MigrationInterface {
    name = 'TimeStamps1677011040958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "createdAt"`);
    }

}
