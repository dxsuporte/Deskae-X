import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Emitentes extends BaseSchema {
  protected tableName = 'emitentes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nf').notNullable()
      table.string('type').notNullable().defaultTo('business')
      table.text('img').defaultTo('/favicon.png')
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
