/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('Users', tbl=>{
    tbl.integer('Birth_Year')
        .unsigned()
        .notNullable()
        .defaultTo(1900); 
    tbl.string('School');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('Users', tbl=>{
    tbl.dropColumn('School');
    tbl.dropColumn('Birth_Year');
    })
};
