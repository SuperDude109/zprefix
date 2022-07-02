/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {
      "title":"My first book",
      "content":"This book is a good book perhaps the best",
      "user_id":"1"
    },
    {
      "title":"My second book",
      "content":"This book is a good book perhaps the best",
      "user_id":"2"
    },
    {
      "title":"My third book",
      "content":"This book is a good book perhaps the best",
      "user_id":"1"
    },
  ]);
};
