exports.up = (knex) => knex.schema.createTable('products', (table) => {
    table.increments('id')
    table.text('title')
    table.text('description')
    table.text('category').notNullable()
    table.integer('price')
    table.text('picture').nullable()
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('products')
