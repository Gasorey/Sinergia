import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class Keys1590812300765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }
}
