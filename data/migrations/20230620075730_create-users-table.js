/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Users', tbl => {
    tbl.increments();  //default olarak id diye isimlendirir. tbl.increments('UsersId')  
    tbl.string('Name', 128)
        .notNullable();
    tbl.string('Surname', 128)
        .notNullable();
    tbl.string('RoleName')
        .notNullable()
        .defaultTo('User');
    tbl.string('Email')
        .notNullable()
        .unique();
  } )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Users')
  
};
