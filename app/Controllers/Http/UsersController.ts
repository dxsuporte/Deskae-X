import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/user/UpdateUserValidator'

import Application from '@ioc:Adonis/Core/Application'
import Fs from 'fs/promises'

export default class UsersController {

  public async index({ auth, view }: HttpContextContract) {

    const user = await User.query()
      .if(auth.user?.id != 1, (root) => {
        root.where('id', '!=', 1)
      })
      .orderBy('username', 'asc')

    return view.render('user/index', { user })
  }

  public async create({ session, response, auth }: HttpContextContract) {
    if (!auth.user?.admin) {
      session.flash({ alertErro: 'Permissão Negada!' })
      return response.redirect().back()
    }
    try {
      await User.create({ username: 'User', email: 'user@user.com', password: 'user@user' })
      session.flash({ alertSuccess: 'Cadastrado com sucesso!' })
      return response.redirect().back()
    } catch (error) {
      session.flash({ alertErro: 'Erro ao cadastrar!' })
      return response.redirect().back()
    }
  }

  public async edit({ auth, session, response, params, view }: HttpContextContract) {
    if (!auth.user?.admin) {
      session.flash({ alertErro: 'Permissão Negada!' })
      return response.redirect().back()
    }
    const user = await User.find(params.id)
    return view.render('user/edit', { user })
  }

  public async update({ request, params, session, response }: HttpContextContract) {
    await request.validate(UpdateUserValidator)
    try {
      const user = await User.findOrFail(params.id)

      const password = request.input('password')
      if (password) {
        var data = request.except(['_csrf'])
      } else {
        var data = request.except(['_csrf', 'password'])
      }

      const coverImage = request.file('cover_image')
      if (coverImage) {
        //Remover Pasta da Imagem Anterior
        await Fs.rmdir(Application.publicPath('/uploads/user/' + params.id), { recursive: true })
        await coverImage.move(Application.publicPath('/uploads/user/' + params.id), {
          name: params.id + '.' + coverImage.subtype,
          overwrite: true
        })
        const img = '/uploads/user/' + params.id + '/' + coverImage.fileName
        await user.merge({ ...data, img }).save()
      } else {
        await user.merge({ ...data }).save()
      }

      session.flash({ alertSuccess: 'Alterado com sucesso!' })
      return response.redirect().back()
    } catch (error) {
      console.log(error)
      session.flash({ alertErro: 'Erro ao alterar!' })
      return response.redirect().back()
    }
  }

  public async delete({ auth, session, response, params }: HttpContextContract) {
    if (!auth.user?.admin) {
      session.flash({ alertErro: 'Permissão Negada!' })
      return response.redirect().back()
    }
    if (params.id == 1 || params.id == auth.user.id) {
      session.flash({ alertErro: 'Este usuário não pode ser excluido no momento!' })
      return response.redirect().back()
    }
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      session.flash({ alertSuccess: 'Excluido com sucesso!' })
      return response.redirect().back()
    } catch (error) {
      session.flash({ alertErro: 'Erro ao excluir ou Registro em uso!' })
      return response.redirect().back()
    }
  }

}
