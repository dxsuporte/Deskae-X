import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'
import Migrator from '@ioc:Adonis/Lucid/Migrator'
import Fs from 'fs/promises'

import User from 'App/Models/User'
import Emitente from 'App/Models/Emitente'
import LoginUserValidator from 'App/Validators/user/LoginUserValidator'

export default class HomeController {

    public async index({ response }: HttpContextContract) {
        const migrator = new Migrator(Database, Application, {
            direction: 'up',
            dryRun: false,
        })
        await migrator.run()
        const user = await User.find(1)
        if (user) {
            return response.redirect('/home')
        } else {
            await User.createMany([
                {
                    username: 'root', email: 'root@root.com', admin: true, active: true
                },
                {
                    username: 'admin', email: 'admin@admin.com', password: 'admin@admin', admin: true, active: true
                },
            ])
            await Emitente.create({ nf: 'Deskae' })
            return response.redirect('/')
        }
    }

    public async login({ view, response }: HttpContextContract) {
        const migrator = new Migrator(Database, Application, {
            direction: 'up',
            dryRun: false,
        })
        await migrator.run()
        const user = await User.find(1)
        if (user) {
            return view.render('login')
        } else {
            await User.createMany([
                {
                    username: 'root', email: 'root@root.com', admin: true, active: true
                },
                {
                    username: 'admin', email: 'admin@admin.com', password: 'admin@admin', admin: true, active: true
                },
            ])
            await Emitente.create({ nf: 'Deskae' })
            return response.redirect('/')
        }
    }

    public async checkLogin({ auth, request, response, session }: HttpContextContract) {
        await request.validate(LoginUserValidator)
        const data = request.except(['_csrf'])
        const rememberMe = request.input('rememberMe')

        try {
            await auth.use('web').attempt(data.email, data.password, rememberMe)
            //Remover Pasta temporaria do User
            await Fs.rmdir(Application.tmpPath(auth.user?.id + ''), { recursive: true });
            return response.redirect('/home')
        } catch {
            session.flash('alertErro', 'Os dados de acesso estão incorretos!')
            return response.redirect('back')
        }
    }

    public async logout({ auth, response }: HttpContextContract) {
        //Remover Pasta temporaria do User
        await Fs.rmdir(Application.tmpPath(auth.user?.id + ''), { recursive: true });
        await auth.use('web').logout()
        response.redirect('/login')
    }

    public async home({ request, view }: HttpContextContract) {
        const activeMenu = request.url()
        return view.render('home', { activeMenu })
    }

}
