import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Application from '@ioc:Adonis/Core/Application'
import Fs from 'fs/promises'

import LoginUserValidator from 'App/Validators/user/LoginUserValidator'

export default class HomeController {

  public async index({ response }: HttpContextContract) {
    return response.redirect('/home')
  }

  public async login({ auth, response, view }: HttpContextContract) {
    if (auth.user) {
      return response.redirect('/home')
    } else {
      return view.render('login')
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
}
