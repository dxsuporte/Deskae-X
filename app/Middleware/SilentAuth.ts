import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'

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

    //Ano Atual & enviar para View
    const date = new Date();
    const myDia = String(new Date().getDate()).padStart(2, '0')
    const myMes = String(new Date().getMonth() + 1).padStart(2, '0')
    const myMesEx = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][date.getMonth()];
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
