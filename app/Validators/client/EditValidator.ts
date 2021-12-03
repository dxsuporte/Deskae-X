import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public refs = schema.refs({
    id: this.ctx.params.id
  })

  public schema = schema.create({
    nf: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.unique({ table: 'clients', column: 'nf', whereNot: { id: this.refs.id } }),
    ]),
    cpf: schema.string({ trim: true }, [
      rules.minLength(11),
      rules.unique({ table: 'clients', column: 'cpf', whereNot: { id: this.refs.id } }),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'clients', column: 'email', whereNot: { id: this.refs.id } }),
    ]),
    celular: schema.string({ trim: true }, [
      rules.minLength(11),
    ]),
  })

  public messages = {
    'nf.required': 'O Campo é Requerido!',
    'nf.minLength': 'Mínimo 3 carácter!',
    'nf.unique': 'Já Existe!',
    'cpf.required': 'O Campo é Requerido!',
    'cpf.minLength': 'Mínimo 11 carácter!',
    'cpf.unique': 'Já Existe!',
    'email.required': 'O Campo é Requerido!',
    'email.email': 'Email invalido',
    'email.unique': 'O E-mail Já Existe!',
    'celular.required': 'O Campo é Requerido!',
    'celular.minLength': 'Mínimo 11 carácter!',
  }

}
