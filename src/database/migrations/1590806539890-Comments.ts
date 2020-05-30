import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class Comments1590806539890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'user',
            type: 'uuid',
          },
          {
            name: 'post',
            type: 'uuid',
          },
          {
            name: 'create_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        name: 'MyKeyToPosts',
        columnNames: ['post'],
        referencedTableName: 'posts',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        name: 'MyKeyToUsers',
        columnNames: ['user'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'posts',
      new TableForeignKey({
        name: 'MyKeyToUsersInfo',
        columnNames: ['user'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'posts',
      new TableForeignKey({
        name: 'MyKeyToCommentsInfo',
        columnNames: ['comment'],
        referencedTableName: 'comments',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('posts', 'MyKeyToCommentsInfo');
    await queryRunner.dropForeignKey('posts', 'MyKeyToUsersInfo');
    await queryRunner.dropForeignKey('comments', 'MyKeyToUsers');
    await queryRunner.dropForeignKey('comments', 'MyKeyToPosts');
    await queryRunner.dropTable('comments');
  }
}
