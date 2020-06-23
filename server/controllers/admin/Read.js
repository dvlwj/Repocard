const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.read = function read(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Read admin Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  connection.query(
    {
      sql: 'SELECT * FROM data_user where level = 1 and active = 1',
      timeout: 30000,
    },
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal mendapatkan daftar admin';
        response.error(message, res);
      } else {
        console.log('Sukses mendapatkan daftar admin');
        const dataToReturn = {
          message: 'Sukses mendapatkan daftar admin',
          data: rows,
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Read admin Controller');
    },
  );
};
