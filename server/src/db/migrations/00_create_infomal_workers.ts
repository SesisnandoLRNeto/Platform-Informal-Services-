// eslint-disable-next-line no-unused-vars
import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('informal_workers', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.string('whatsapp').notNullable();
    table.string('address').notNullable();
    table.string('bio').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('informal_workers');
}
