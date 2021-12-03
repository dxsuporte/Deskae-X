import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clients extends BaseSchema {
  protected tableName = 'clients'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nf').notNullable()
      table.string('cpf').notNullable()
      table.string('rg')
      table.string('email').notNullable()
      table.string('celular').notNullable()
      table.string('telefone').nullable()
      table.string('sexo')
      table.date('nascimento').nullable()
      table.string('rua')
      table.string('bairro')
      table.string('cidade')
      table.string('estado')
      table.string('cep')
      table.string('img').defaultTo('/favicon.png')
      table.boolean('active').notNullable().defaultTo(0)
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
