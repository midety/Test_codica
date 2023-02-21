import { MigrationInterface, QueryRunner } from "typeorm";

export class TimeStampsFix1677012418816 implements MigrationInterface {
    name = 'TimeStampsFix1677012418816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
    }

}
