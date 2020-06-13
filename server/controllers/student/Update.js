const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.update = function update(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Update siswa Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { nama, kelas } = requestPayloadBody;
  connection.query(
    {
      sql: 'INSERT INTO data_student (nama, kelas) VALUES (?, ?)',
      timeout: 30000,
    },
    [nama, kelas],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal mengubah data siswa';
        response.error(message, res);
      } else {
        console.log('Sukses mengubah data siswa');
        const dataToReturn = {
          message: 'Sukses mengubah data siswa',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Update siswa Controller');
    },
  );
};
