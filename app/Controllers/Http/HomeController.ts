import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Home from 'App/Models/Home'

export default class HomeController {

    public async index({ request, auth, view }: HttpContextContract) {
        const activeMenu = request.url()
        const home = await Home.query().where({ userId: auth.user?.id }).orderBy('datetime', 'desc')
        return view.render('home', { activeMenu, home })
    }

    public async create({ request, auth, response, session }: HttpContextContract) {
        try {
            const data = request.except(['_csrf', 'datetime'])
            var datetime = request.input('datetime')
            datetime = datetime.replace(/\T/g, ' ')
            await Home.create({ ...data, datetime, userId: auth.user?.id })
            session.flash({ alertSuccess: 'Cadastrado com sucesso!' })
            return response.redirect().back()
        } catch (error) {
            session.flash({ alertErro: 'Erro ao cadastrar!' })
            return response.redirect().back()
        }
    }

    public async update({ request, response, session, params }: HttpContextContract) {
        try {
            const home = await Home.findOrFail(params.id)
            const data = request.except(['_csrf'])
            await home.merge({ ...data }).save()
            session.flash({ alertSuccess: 'Alterado com sucesso!' })
            return response.redirect().back()
        } catch (error) {
            session.flash({ alertErro: 'Erro ao alterar!' })
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
