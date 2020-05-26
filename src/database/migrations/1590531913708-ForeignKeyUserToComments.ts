import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class ForeignKeyUserToComments1590531913708
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        name: 'UserComment',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('comments', 'user_id');
  }
}
