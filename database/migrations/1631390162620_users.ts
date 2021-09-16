import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable().defaultTo('$bcrypt$v=98$r=10$/WGMuvYImhbFAkYSNSJAGQ$MJzoilyJENVljSYjh3cys67n+Z+FlL4')
      table.string('remember_me_token').nullable()
      table.integer('theme').notNullable().defaultTo(0)
      table.string('color', 255).notNullable().defaultTo('#32CA42')
      table.boolean('admin').notNullable().defaultTo(0)
      table.boolean('active').notNullable().defaultTo(0)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
