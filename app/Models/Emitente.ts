import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Emitente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nf: string

  @column()
  public type: string

  @column()
  public img: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
