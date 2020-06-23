const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.read = function read(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Read Student Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  // const { username, password } = requestPayloadBody;
  connection.query(
    {
      sql: 'SELECT * FROM data_student where active = 1',
      timeout: 30000,
    },
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal mendapatkan daftar siswa';
        response.error(message, res);
      } else {
        console.log('Sukses mendapatkan daftar siswa');
        const dataToReturn = {
          message: 'Sukses mendapatkan daftar siswa',
          data: rows,
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Read Student Controller');
    },
  );
};
