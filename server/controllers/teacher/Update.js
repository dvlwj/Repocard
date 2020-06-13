const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.update = function update(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Update Guru Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { username, password, userID } = requestPayloadBody;
  connection.query(
    {
      sql: 'Update data_user set username = ? , password = md5(?) where id = ?',
      timeout: 30000,
    },
    [username, password, userID],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal mengubah data guru';
        response.error(message, res);
      } else {
        console.log('Sukses mengubah data guru');
        const dataToReturn = {
          message: 'Sukses mengubah data guru',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Update Guru Controller');
    },
  );
};
