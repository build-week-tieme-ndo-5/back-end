
exports.up = function(knex) {
  return knex.schema
    .createTable('staff', tbl => {
        tbl.increments();
        tbl.string('username').notNullable().unique();
        tbl.string('first_name').notNullable();
        tbl.string('last_name').notNullable();
        tbl.string('password').notNullable();
    })

    .createTable('clients', tbl => {
        tbl.increments();
        tbl.string('name').notNullable();
        tbl.string('village').notNullable();
        tbl.float('loan_amount').notNullable();
        tbl.date('loan_start').notNullable();
        tbl.date('loan_due').notNullable();
        tbl.float('last_payment');
        tbl.date('payment_date');
        tbl.integer('harvest_yield');
        tbl.integer('sales_goal');

    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('staff')
    .dropTableIfExists('clients')
};
