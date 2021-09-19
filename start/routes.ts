import Route from '@ioc:Adonis/Core/Route'

//Default
Route.get('/', 'IndexController.index')

//Login
Route.get('/login', 'IndexController.login')
Route.post('/login', 'IndexController.checkLogin')

//Logout
Route.get('/logout', 'IndexController.logout')

/*--------------------------------------------------------------
  # Route Auth
--------------------------------------------------------------*/

Route.group(() => {

  //Home
  Route.get('/home', 'HomeController.index')
  Route.post('/home/add', 'HomeController.create')
  Route.post('/home/:id/update', 'HomeController.update')
  Route.get('/home/:id/delete', 'HomeController.delete')

  //Client
  Route.get('/client', 'ClientsController.index')
  Route.get('/client/add', 'ClientsController.create')
  Route.get('/client/:id/edit', 'ClientsController.edit')
  Route.post('/client/:id/edit', 'ClientsController.update')
  Route.get('/client/:id/delete', 'ClientsController.delete')

  //User
  Route.get('/user', 'UsersController.index')
  Route.get('/user/add', 'UsersController.create')
  Route.get('/user/:id/edit', 'UsersController.edit')
  Route.post('/user/:id/edit', 'UsersController.update')
  Route.get('/user/:id/delete', 'UsersController.delete')

  //Emitente
  Route.get('/emitente', 'EmitentesController.index')
  Route.post('/emitente/:id/edit', 'EmitentesController.update')

}).middleware('auth')