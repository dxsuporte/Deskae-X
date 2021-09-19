import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Homes extends BaseSchema {
  protected tableName = 'homes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('NO ACTION').onUpdate('NO ACTION')
      table.string('title').notNullable()
      table.dateTime('datetime').notNullable
      table.boolean('completed').defaultTo(0)
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
