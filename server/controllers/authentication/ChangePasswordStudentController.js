const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.login = function login(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Change Password Student Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { username, password } = requestPayloadBody;
  connection.query(
    {
      sql: 'Update data_student set password = md5(?) where nama = ?',
      timeout: 30000,
    },
    [password, username],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Failed to process change password student request';
        response.error(message, res);
      } else {
        const dataToReturn = {
          username: requestPayloadBody.username,
          password: requestPayloadBody.password,
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Change Password Student Controller');
    },
  );
};
