import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Emitente from 'App/Models/Emitente'
import UpdateEmitenteValidator from 'App/Validators/emitente/UpdateEmitenteValidator'

import Application from '@ioc:Adonis/Core/Application'
import Fs from 'fs/promises'

export default class EmitentesController {

  public async index({ auth, session, response, request, view }: HttpContextContract) {
    if (!auth.user?.admin) {
      session.flash({ alertErro: 'Permissão Negada!' })
      return response.redirect().back()
    }
    const activeMenu = request.url()
    return view.render('emitente/index', { activeMenu })
  }

  public async update({ auth, request, params, session, response }: HttpContextContract) {
    if (!auth.user?.admin) {
      session.flash({ alertErro: 'Permissão Negada!' })
      return response.redirect().back()
    }
    await request.validate(UpdateEmitenteValidator)

    try {
      const emitente = await Emitente.findOrFail(params.id)
      const data = request.except(['_csrf'])
      const coverImage = request.file('cover_image')
      if (coverImage) {
        //Remover Pasta da Imagem Anterior
        await Fs.rmdir(Application.publicPath('/uploads/emitente/' + params.id), { recursive: true })
        await coverImage.move(Application.publicPath('/uploads/emitente/' + params.id), {
          name: params.id + '.' + coverImage.subtype,
          overwrite: true
        })
        const img = '/uploads/emitente/' + params.id + '/' + coverImage.fileName
        await emitente.merge({ ...data, img }).save()
      } else {
        await emitente.merge({ ...data }).save()
      }

      session.flash({ alertSuccess: 'Alterado com sucesso!' })
      return response.redirect().back()
    } catch (error) {
      session.flash({ alertErro: 'Erro ao alterar!' })
      return response.redirect().back()
    }

  }

}
