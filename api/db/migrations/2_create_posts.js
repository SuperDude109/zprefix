/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
    table.increments('id');//id
    table.string('title', 64);
    table.string('content', 10000);
    table.integer('user_id').unsigned()//can only hold positive numbers
    table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
    table.unique('title')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};
