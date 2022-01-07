import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'
import Migrator from '@ioc:Adonis/Lucid/Migrator'

import View from '@ioc:Adonis/Core/View'
import Emitente from 'App/Models/Emitente'
import User from 'App/Models/User'

/**
 * Silent auth middleware can be used as a global middleware to silent check
 * if the user is logged-in or not.
 *
 * The request continues as usual, even when the user is not logged-in.
 */
export default class SilentAuthMiddleware {
  /**
   * Handle request
   */
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {

    /*---------------------------------------------------
    # Configuração Geral
    ---------------------------------------------------*/

    //Criar Migrator Banco de dados
    const migrator = new Migrator(Database, Application, {
      direction: 'up',
      dryRun: false,
    })
    await migrator.run()

    //Buscar emitente e verifica se exite
    const emitente = await Emitente.find(1)
    //Se não existir Cria Emitente, Permision and Users
    if (!emitente) {
      await Emitente.create({ nf: 'Deskae' })
      await User.createMany([
        { username: 'root', email: 'root@root.com', admin: true, active: true },
        { username: 'admin', email: 'admin@admin.com', password: 'admin@123', admin: true, active: true },
      ])
    }

    //Buscar dados do emitente
    const myEmitente = await Emitente.find(1)
    View.global('myEmitente', myEmitente)

    //Ano Atual & enviar para View
    const date = new Date();
    const myDia = String(new Date().getDate()).padStart(2, '0')
    const myMes = String(new Date().getMonth() + 1).padStart(2, '0')
    const myMesEx = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][date.getMonth()]
    const myAno = new Date().getFullYear()
    const myData = myDia + '/' + myMes + '/' + myAno

    View.global('myDia', myDia)
    View.global('myMes', myMes)
    View.global('myMesEx', myMesEx)
    View.global('myAno', myAno)
    View.global('myData', myData)

    /**
     * Check if user is logged-in or not. If yes, then `ctx.auth.user` will be
     * set to the instance of the currently logged in user.
     */
    await auth.check()
    await next()
  }
}
