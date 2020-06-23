const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.deleteController = function deleteController(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Delete admin Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { username } = requestPayloadBody;
  connection.query(
    {
      sql: 'Update data_user set active = 2 where username = ?',
      timeout: 30000,
    },
    [username],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal menghapus data admin';
        response.error(message, res);
      } else {
        console.log('Sukses menghapus data admin');
        const dataToReturn = {
          message: 'Sukses menghapus data admin',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Delete admin Controller');
    },
  );
};
