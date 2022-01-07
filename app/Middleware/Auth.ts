import { GuardsList } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'

import View from '@ioc:Adonis/Core/View'
import Emitente from 'App/Models/Emitente'

export default class AuthMiddleware {

  protected redirectTo = '/login'

  protected async authenticate(auth: HttpContextContract['auth'], guards: (keyof GuardsList)[]) {

    let guardLastAttempted: string | undefined

    for (let guard of guards) {
      guardLastAttempted = guard

      if (await auth.use(guard).check()) {

        auth.defaultGuard = guard
        return true
      }
    }

    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      guardLastAttempted,
      this.redirectTo,
    )
  }

  public async handle({ auth }: HttpContextContract, next: () => Promise<void>, customGuards: (keyof GuardsList)[]) {

    //Buscar dados do emitente
    const myEmitente = await Emitente.find(1)

    const lebelMenu = {
      home: 'Home',
      client: myEmitente?.type == 'health' ? 'Paciente' : 'Cliente',
      iconclient: myEmitente?.type == 'health' ? '<i class="icofont-address-book"></i> Paciente' : '<i class="icofont-address-book"></i> Cliente',
      user: 'Colaborador',
      iconUser: '<i class="icofont-ui-user"></i> Colaborador',
      config: 'Configuração',
      iconConfig: '<i class="icofont-gear-alt"></i> Configuração',
      logout: 'Sair',
      iconLogout: '<i class="icofont-exit"></i> Sair',
    }
    View.global('lebelMenu', lebelMenu)

    const guards = customGuards.length ? customGuards : [auth.name]
    await this.authenticate(auth, guards)
    await next()
  }
}
