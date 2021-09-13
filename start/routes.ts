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

  //Emitente
  Route.get('/emitente', 'EmitentesController.index')
  Route.post('/emitente/:id/edit', 'EmitentesController.update')

}).middleware('auth')