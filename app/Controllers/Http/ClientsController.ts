import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Client from 'App/Models/Client'

import AddValidator from 'App/Validators/client/AddValidator'
import EditValidator from 'App/Validators/client/EditValidator'

import Application from '@ioc:Adonis/Core/Application'
import Fs from 'fs/promises'

export default class ClientsController {

  public async index({ request, view }: HttpContextContract) {
    const status = request.only(['status'])
    const client = await Client.query()
      .if(status.status, (myStatus) => {
        myStatus.where('active', status.status, 0)
      })
      .orderBy('id', 'desc')
    return view.render('client/index', { client, status: status.status })
  }

  public async add({ view }: HttpContextContract) {
    return view.render('client/add')
  }

  public async create({ session, response, request }: HttpContextContract) {
    await request.validate(AddValidator)
    try {
      const data = request.except(['_csrf'])
      await Client.create({ ...data, active: true })
      session.flash({ alertSuccess: 'Cadastrado com sucesso!' })
      return response.redirect('/client')
    } catch (error) {
      console.log(error)
      session.flash({ alertErro: 'Erro ao cadastrar!' })
      return response.redirect().back()
    }
  }

  public async edit({ params, view }: HttpContextContract) {
    const client = await Client.findOrFail(params.id)
    return view.render('client/edit', { client })
  }

  public async update({ session, response, request, params }: HttpContextContract) {
    await request.validate(EditValidator)
    try {
      const data = request.except(['_csrf'])
      const client = await Client.findOrFail(params.id)
      await client.merge({ ...data }).save()
      session.flash({ alertSuccess: 'Alterado com sucesso!' })
      return response.redirect().back()
    } catch (error) {
      session.flash({ alertErro: 'Erro ao alterar!' })
      return response.redirect().back()
    }
  }

  public async delete({ session, response, params }: HttpContextContract) {
    try {
      //busca o registro no bancco de dados
      const client = await Client.findOrFail(params.id)
      //Remover Pasta da Imagem Anterior
      await Fs.rmdir(Application.publicPath('/uploads/clients/' + params.id), { recursive: true });
      await client.delete()
      session.flash({ alertSuccess: 'Excluido com sucesso!' })
      return response.redirect().back()
    } catch (error) {
      session.flash({ alertErro: 'Erro ao excluir ou Registro em uso!' })
      return response.redirect().back()
    }
  }

}
