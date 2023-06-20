/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Pizzas').truncate();
  await knex('Orders').truncate();
  
  await knex('Orders').insert([
    {id: 1, Total_Price: 101.50, UserId: 1},
    {id: 2, Total_Price: 101.00, UserId: 3},
    {id: 3, Total_Price: 99.50, UserId: 2},
    {id: 4, Total_Price: 301.50, UserId: 2},
    {id: 5, Total_Price: 5.50, UserId: 1},
  ]);
  await knex('Pizzas').insert([
    {id: 1, Price: 89.50, Name: 'Metadata Pizza', Description: 'Harika hamuru ile sıcacık bir lezzet'},
    {id: 2, Price: 59.50, Name: 'Margarita Pizza', Description: 'Tarife gerek yok'},
    {id: 3, Price: 79.00, Name: 'React In The House Pizza', Description: 'Import Sucuk from Cumhuriyet...'},
  ]);
};
