import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'
import Migrator from '@ioc:Adonis/Lucid/Migrator'

import User from 'App/Models/User'

Route.get('/', async ({ view, response }) => {

  const migrator = new Migrator(Database, Application, {
    direction: 'up',
    dryRun: false,
  })

  await migrator.run()

  const user = await User.find(1)

  if (user) {
    return view.render('login')
  } else {
    await User.create({ username: 'root', email: 'root@root.com', password: 'root@123', })
    return response.redirect('/')
  }

})
