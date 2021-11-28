import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public refs = schema.refs({
    id: this.ctx.params.id
  })

  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.minLength(4),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.refs.id } }),
    ]),
    createdAt: schema.string({ trim: true }),
    password: schema.string.optional({ trim: true }, [
      rules.minLength(6),
    ]),
    cover_image: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'png'],
    }),
    theme: schema.string({ trim: true }),
    primaryColor: schema.string({ trim: true }),
  })

  public messages = {
    'username.required': 'Campo Requerido!',
    'username.minLength': 'Mínimo 4 carácter!',
    'email.required': 'Campo Requerido!',
    'email.email': 'Email inválido!',
    'email.unique': 'O Email já Existe!',
    'createdAt.required': 'Campo Requerido!',
    'password.minLength': 'Mínimo 6 carácter!',
    'theme.required': 'Campo Requerido!',
    'primaryColor.required': 'Campo Requerido!',
  }

}
