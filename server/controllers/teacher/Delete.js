const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.deleteController = function deleteController(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Delete Guru Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { username } = requestPayloadBody;
  connection.query(
    {
      sql: 'INSERT INTO data_user (username, active) VALUES (?, 2)',
      timeout: 30000,
    },
    [username],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal menghapus data guru';
        response.error(message, res);
      } else {
        console.log('Sukses menghapus data guru');
        const dataToReturn = {
          message: 'Sukses menghapus data guru',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Delete Guru Controller');
    },
  );
};
