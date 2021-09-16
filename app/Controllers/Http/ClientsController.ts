import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientsController {

  public async index({ request, view }: HttpContextContract) {
    const activeMenu = request.url()
    return view.render('client/index', { activeMenu })
  }

  public async create({ }: HttpContextContract) {
  }

  public async store({ }: HttpContextContract) {
  }

  public async show({ }: HttpContextContract) {
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
