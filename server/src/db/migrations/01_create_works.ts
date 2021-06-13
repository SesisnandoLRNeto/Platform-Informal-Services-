// eslint-disable-next-line no-unused-vars
import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('works', (table) => {
    table.increments('id').primary();
    table.string('type_service').notNullable();
    table.decimal('cost').notNullable();

    table.integer('informal_workers_id')
      .notNullable()
      .references('id')
      .inTable('informal_workers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('works');
}
