/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      first_name: "Anthony",
      last_name: "Fine",
      username: "superdude109",
      password:"password"
    },
    {
      first_name: "robert",
      last_name: "jenkins",
      username: "lameboy",
      password:"password"
    }
  ]);
};
