import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginUserValidator {
	constructor(protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		email: schema.string({ trim: true }, [
			rules.email(),
			rules.exists({ table: 'users', column: 'email', where: { active: 1 } })
		]),
		password: schema.string({ trim: true }, [
			rules.minLength(6),
		]),
	})

	public messages = {
		'email.required': 'Campo Requerido!',
		'email.email': 'Email inválido!',
		'email.exists': 'Essa conta não existe!',
		'password.required': 'Campo Requerido!',
		'password.minLength': 'Mínimo 6 carácter!',
	}
}