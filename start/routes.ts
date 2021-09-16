import Route from '@ioc:Adonis/Core/Route'

//Default
Route.get('/', 'HomeController.index')

//Login
Route.get('/login', 'HomeController.login')
Route.post('/login', 'HomeController.checkLogin')

//Logout
Route.get('/logout', 'HomeController.logout')

/*--------------------------------------------------------------
  # Route Auth
--------------------------------------------------------------*/

Route.group(() => {

  //Home
  Route.get('/home', 'HomeController.home')

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