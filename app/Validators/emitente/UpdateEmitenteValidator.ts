import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    nf: schema.string({ trim: true }, [
      rules.minLength(4),
    ]),
    type: schema.string({ trim: true }),
    cover_image: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'png', 'svg', 'ico'],
    }),
  })

  public messages = {
    'nf.required': 'Campo Requerido!',
    'nf.minLength': 'Mínimo 4 carácter!',
    'type.required': 'Campo Requerido!',
  }

}
