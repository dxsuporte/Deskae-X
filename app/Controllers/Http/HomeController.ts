import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Home from 'App/Models/Home'

export default class HomeController {

  public async index({ auth, view }: HttpContextContract) {
    const home = await Home.query().where({ userId: auth.user?.id }).orderBy('createdAt', 'asc')
    return view.render('home/index', { home })
  }

  public async create({ request, auth, response, session }: HttpContextContract) {
    try {
      const data = request.except(['_csrf'])
      await Home.create({ ...data, userId: auth.user?.id })
      session.flash({ alertSuccess: 'Cadastrado com sucesso!' })
      return response.redirect().back()
    } catch (error) {
      session.flash({ alertErro: 'Erro ao cadastrar!' })
      return response.redirect().back()
    }
  }

  public async delete({ response, session, params }: HttpContextContract) {
    try {
      const home = await Home.findOrFail(params.id)
      await home.delete()
      session.flash({ alertSuccess: 'Excluido com sucesso!' })
      return response.redirect().back()
    } catch (error) {
      session.flash({ alertErro: 'Erro ao excluir ou Registro em uso!' })
      return response.redirect().back()
    }
  }

}
