import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/user/UpdateUserValidator'

export default class UsersController {

    public async index({ request, auth, view }: HttpContextContract) {

        const activeMenu = request.url()

        const user = await User.query()
            .if(auth.user?.id != 1, (root) => {
                root.where('id', '!=', 1)
            })
            .orderBy('username', 'asc')

        return view.render('user/index', { activeMenu, user })
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

    public async edit({ params, view }: HttpContextContract) {
        const activeMenu = '/user'
        const user = await User.find(params.id)
        return view.render('user/edit', { activeMenu, user })
    }

    public async update({ request, params, session, response }: HttpContextContract) {
        await request.validate(UpdateUserValidator)
        try {
            const password = request.input('password')
            if (password) {
                var data = request.except(['_csrf'])
            } else {
                var data = request.except(['_csrf', 'password'])
            }
            const user = await User.findOrFail(params.id)
            await user.merge({ ...data }).save()
            session.flash({ alertSuccess: 'Alterado com sucesso!' })
            return response.redirect().back()
        } catch (error) {
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
