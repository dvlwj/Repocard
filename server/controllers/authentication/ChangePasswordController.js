const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.login = function login(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Login Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { username, password } = requestPayloadBody;
  connection.query(
    {
      sql: 'SELECT * FROM data_user where username = ? and password = md5(?) and active = 1',
      timeout: 30000,
    },
    [username, password],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Failed to process change password request';
        response.error(message, res);
      } else {
        console.log('Login sukses');
        connection.query(
          {
            sql: 'Update data_user set nama = ?, password = md5(?) where id = ?',
            timeout: 30000,
          },
          [username, password],
          (error2, rows2) => {
            if (error2 || rows2.length === 0) {
              const message = 'Failed to process change password request';
              response.error(message, res);
            } else {
              const dataToReturn = {
                username: requestPayloadBody.username,
                password: requestPayloadBody.password,
                level: rows[0].level,
                matpel: rows[0].mat_pel,
              };
              response.ok(dataToReturn, res);
              console.log('Ganti password sukses');
            }
          },
        );
      }
      console.log('Selesai Login Controller');
    },
  );
};
