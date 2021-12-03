import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Client extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public nf: string

  @column()
  public cpf: string

  @column()
  public rg: string

  @column()
  public email: string

  @column()
  public celular: string

  @column()
  public telefone: string

  @column()
  public sexo: string

  @column.date()
  public nascimento: DateTime

  @column()
  public rua: string

  @column()
  public bairro: string

  @column()
  public cidade: string

  @column()
  public estado: string

  @column()
  public cep: string

  @column()
  public img: string

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
