const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.read = function read(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Read Guru Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  connection.query(
    {
      sql: 'SELECT * FROM data_user where level = 2 and active = 1',
      timeout: 30000,
    },
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal mendapatkan daftar guru';
        response.error(message, res);
      } else {
        console.log('Sukses mendapatkan daftar guru');
        const dataToReturn = {
          message: 'Sukses mendapatkan daftar guru',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Read Guru Controller');
    },
  );
};
