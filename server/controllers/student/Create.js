const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.create = function create(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Create Student Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { nama, kelas, password } = requestPayloadBody;
  connection.query(
    {
      sql: 'INSERT INTO data_student (nama, password, kelas, active) VALUES (?, md5(?), ?, 1)',
      timeout: 30000,
    },
    [nama, password, kelas],
    (error, rows) => {
      if (error || rows.length === 0) {
        console.log(error);
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
