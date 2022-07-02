/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('first_name', 16);
    table.string('last_name', 16);
    table.string('username', 16);
    table.string('password', 32);
    table.unique('username')
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
