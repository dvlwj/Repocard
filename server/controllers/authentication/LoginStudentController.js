const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.login = function login(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Login Controller Siswa, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { username, password } = requestPayloadBody;
  connection.query(
    {
      sql: 'SELECT * FROM data_student where nama = ? and password = md5(?) and active = 1',
      timeout: 30000,
    },
    [username, password],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Failed to process login request';
        response.error(message, res);
      } else {
        console.log('Login sukses');
        const dataToReturn = {
          username: requestPayloadBody.username,
          password: requestPayloadBody.password,
          kelas: rows[0].kelas,
          id: rows[0].id,
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Login Controller');
    },
  );
};
