const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.read = function read(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Read subject Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { studentID } = requestPayloadBody;
  connection.query(
    {
      sql: 'SELECT * FROM data_nilai where id_siswa = ?',
      timeout: 30000,
    },
    [studentID],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal mendapatkan daftar subject';
        response.error(message, res);
      } else {
        console.log('Sukses mendapatkan daftar subject');
        const dataToReturn = {
          message: 'Sukses mendapatkan daftar subject',
          data: rows,
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Read subject Controller');
    },
  );
};
