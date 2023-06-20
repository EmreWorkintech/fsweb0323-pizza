/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Orders', tbl=>{
    tbl.increments();
    tbl.decimal('Total_Price')
        .unsigned()
        .notNullable();
    tbl.integer('UserId')
        .unsigned()
        .notNullable();
  })
    .createTable('Pizzas', tbl=>{
    tbl.increments();
    tbl.decimal('Price')
        .unsigned()
        .notNullable();
    tbl.string('Name', 128)
        .notNullable()
        .unique();
    tbl.string('Description');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Pizzas')
                    .dropTableIfExists('Orders')
};
