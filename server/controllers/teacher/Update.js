const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.update = function update(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Update Guru Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { username, password } = requestPayloadBody;
  connection.query(
    {
      sql: 'INSERT INTO data_user (username, password) VALUES (?, md5(?))',
      timeout: 30000,
    },
    [username, password],
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
