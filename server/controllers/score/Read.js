const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.read = function read(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Read nilai Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { idSiswa } = requestPayloadBody;
  connection.query(
    {
      sql: 'SELECT * FROM data_nilai where id_siswa = ?',
      timeout: 30000,
    },
    [idSiswa],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal mendapatkan daftar nilai';
        response.error(message, res);
      } else {
        console.log('Sukses mendapatkan daftar nilai');
        const dataToReturn = {
          message: 'Sukses mendapatkan daftar nilai',
          data: rows,
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Read nilai Controller');
    },
  );
};
