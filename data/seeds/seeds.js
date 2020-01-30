
exports.seed = function(knex) {

  return knex('staff').truncate()
    .then(() => knex('clients').truncate())

    .then(() => {
      return knex('staff').insert([
        { id: 1, username: 'az', first_name: 'a', last_name: 'z', password: 'tester'},
        { id: 2, username: 'by', first_name: 'b', last_name: 'y', password: 'tester'},
        { id: 3, username: 'cx', first_name: 'c', last_name: 'x', password: 'tester'},
        { id: 4, username: 'dw', first_name: 'd', last_name: 'w', password: 'tester'},
        { id: 5, username: 'ev', first_name: 'd', last_name: 'w', password: 'tester'},
        { id: 6, username: 'yb', first_name: 'yersina', last_name: 'baker', password: '$2a$10$S5NyWlLGnrpxi.DzsihYn.UkqYVXezRNKBv9auX/O6bYNOJrp3Di6'}
      ])
    })

    .then(() => {
      return knex('clients').insert([
        { id: 1, name: 'e', village: 'eville', loan_amount: 12.00, loan_start: '2018-12-12', loan_due: '2020-12-12', last_payment: 6.50, payment_date: '2020-01-01', harvest_yield: 0, sales_goal: 0 },
        { id: 2, name: 'f', village: 'fville', loan_amount: 15.00, loan_start: '2018-12-12', loan_due: '2020-12-12', last_payment: 7.50, payment_date: '2020-01-01', harvest_yield: 0, sales_goal: 0 },
        { id: 3, name: 'g', village: 'gville', loan_amount: 17.00, loan_start: '2018-12-12', loan_due: '2020-12-12', last_payment: 8.50, payment_date: '2020-01-01', harvest_yield: 0, sales_goal: 0 },
        { id: 4, name: 'h', village: 'gville', loan_amount: 19.00, loan_start: '2018-12-12', loan_due: '2020-12-12', last_payment: 9.50, payment_date: '2020-01-01', harvest_yield: 0, sales_goal: 0 },
        { id: 5, name: 'i', village: 'eville', loan_amount: 21.00, loan_start: '2018-12-12', loan_due: '2020-12-12', last_payment: 10.50, payment_date: '2020-01-01', harvest_yield: 0, sales_goal: 0 }
      ])
    })
};
