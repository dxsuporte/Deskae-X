import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Chats extends BaseSchema {
  protected tableName = 'chats'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('NO ACTION').onUpdate('NO ACTION')
      table.integer('user_out_id').unsigned().notNullable().references('id').inTable('users').onDelete('NO ACTION').onUpdate('NO ACTION')
      table.text('message').notNullable()
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })

    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
