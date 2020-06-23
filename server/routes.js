const authentication = require('./controllers/authentication/LoginController');
const createTeacher = require('./controllers/teacher/Create');
const deleteTeacher = require('./controllers/teacher/Delete');
const readTeacher = require('./controllers/teacher/Read');
const updateTeacher = require('./controllers/teacher/Update');
const createAdmin = require('./controllers/admin/Create');
const deleteAdmin = require('./controllers/admin/Delete');
const readAdmin = require('./controllers/admin/Read');
const updateAdmin = require('./controllers/admin/Update');
const createStudent = require('./controllers/student/Create');
const deleteStudent = require('./controllers/student/Delete');
const readStudent = require('./controllers/student/Read');
const updateStudent = require('./controllers/student/Update');
const createScore = require('./controllers/score/Create');
const deleteScore = require('./controllers/score/Delete');
const readScore = require('./controllers/score/Read');
const updateScore = require('./controllers/score/Update');
const authenticationStudent = require('./controllers/authentication/LoginStudentController');
const changePassword = require('./controllers/authentication/ChangePasswordController');
const changePasswordStudent = require('./controllers/authentication/ChangePasswordStudentController');

module.exports = function route(app) {
  app.route('/login')
    .post(authentication.login);
  app.route('/login/siswa')
    .post(authenticationStudent.login);
  app.route('/changePassword')
    .post(changePassword.login);
  app.route('/changePassword/student')
    .post(changePasswordStudent.login);
  app.route('/guru/create')
    .post(createTeacher.create);
  app.route('/guru/delete')
    .post(deleteTeacher.deleteController);
  app.route('/guru/read')
    .get(readTeacher.read);
  app.route('/guru/update')
    .post(updateTeacher.update);
  app.route('/admin/create')
    .post(createAdmin.create);
  app.route('/admin/delete')
    .post(deleteAdmin.deleteController);
  app.route('/admin/read')
    .get(readAdmin.read);
  app.route('/admin/update')
    .post(updateAdmin.update);
  app.route('/murid/create')
    .post(createStudent.create);
  app.route('/murid/delete')
    .post(deleteStudent.deleteController);
  app.route('/murid/read')
    .get(readStudent.read);
  app.route('/murid/update')
    .post(updateStudent.update);
  app.route('/nilai/create')
    .post(createScore.create);
  app.route('/nilai/delete')
    .post(deleteScore.deleteController);
  app.route('/nilai/read')
    .get(readScore.read);
  app.route('/nilai/update')
    .post(updateScore.update);
  // app.route('/users').get(todoList.users);
};
