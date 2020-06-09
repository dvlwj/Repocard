const authentication = require('./controllers/authentication/LoginController');

module.exports = function route(app) {
  app.route('/login')
    .post(authentication.login);

  // app.route('/users').get(todoList.users);
};
