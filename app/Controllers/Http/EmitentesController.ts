import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Emitente from 'App/Models/Emitente'
import UpdateEmitenteValidator from 'App/Validators/emitente/UpdateEmitenteValidator'

export default class EmitentesController {

  public async index({ request, view }: HttpContextContract) {
    const activeMenu = request.url()
    return view.render('emitente/index', { activeMenu })
  }

  public async update({ request, params, session, response }: HttpContextContract) {
    await request.validate(UpdateEmitenteValidator)
    try {
      const data = request.except(['_csrf'])
      const emitente = await Emitente.findOrFail(params.id)
      await emitente.merge({ ...data }).save()
      session.flash({ alertSuccess: 'Alterado com sucesso!' })
      return response.redirect().back()
    } catch (error) {
      session.flash({ alertErro: 'Erro ao alterar!' })
      return response.redirect().back()
    }
  }

}
