const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.create = function create(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Create Student Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { name, kelas } = requestPayloadBody;
  connection.query(
    {
      sql: 'INSERT INTO data_student (name, kelas) VALUES (?, ?, 1)',
      timeout: 30000,
    },
    [name, kelas],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal Menambah Siswa Baru';
        response.error(message, res);
      } else {
        console.log('Sukses menambah siswa baru');
        const dataToReturn = {
          message: 'Sukses menambah siswa baru',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Create Student Controller');
    },
  );
};
