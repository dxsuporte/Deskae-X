import Route from '@ioc:Adonis/Core/Route'

import Database from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'
import Migrator from '@ioc:Adonis/Lucid/Migrator'

import User from 'App/Models/User'
import LoginUserValidator from 'App/Validators/user/LoginUserValidator'
import Fs from 'fs/promises'

/*--------------------------------------------------------------
  # Route
  --------------------------------------------------------------*/
//Default
Route.get('/', async ({ response }) => {
  const migrator = new Migrator(Database, Application, {
    direction: 'up',
    dryRun: false,
  })
  await migrator.run()
  const user = await User.find(1)
  if (user) {
    return response.redirect('/home')
  } else {
    await User.create({ username: 'root', email: 'root@root.com', password: 'root@123', active: true })
    return response.redirect('/')
  }
})

//Login
Route.get('/login', async ({ view }) => {
  return view.render('login')
})

Route.post('/login', async ({ auth, request, response, session }) => {

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
})

//Logout
Route.get('/logout', async ({ auth, response }) => {
  //Remover Pasta temporaria do User
  await Fs.rmdir(Application.tmpPath(auth.user?.id + ''), { recursive: true });
  await auth.use('web').logout()
  response.redirect('/login')
})

/*--------------------------------------------------------------
  # Route Auth
  --------------------------------------------------------------*/

Route.group(() => {

  //Home
  Route.get('/home', async ({ request, view }) => {
    const activeMenu = request.url()
    console.log(activeMenu)
    return view.render('home', {activeMenu})
  })


}).middleware('auth')
