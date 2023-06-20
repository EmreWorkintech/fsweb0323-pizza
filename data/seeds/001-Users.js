/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Users').truncate()   //del sadece datayı siler, truncate data + metadata'yı siler.
  await knex('Users').insert([
    {id: 1, Name: 'Emre', Surname: 'Şahiner', RoleName: 'Admin', Email: 'emre@wit.com.tr'},
    {id: 2, Name: 'Erdem', Surname: 'Günay', RoleName: 'Admin', Email: 'erdem@wit.com.tr'},
    {id: 3, Name: 'Halil', Surname: 'Dervişoğlu', RoleName: 'User', Email: 'halil@wit.com.tr'}
  ]);
};
