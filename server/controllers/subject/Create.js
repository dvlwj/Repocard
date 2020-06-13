const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.create = function create(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Create subject Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { studentID, subjectName, value } = requestPayloadBody;
  connection.query(
    {
      sql: 'INSERT INTO data_nilai (id_siswa, nama_mata_pelajaran, nilai) VALUES (?, ?, ?)',
      timeout: 30000,
    },
    [studentID, subjectName, value],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal Menambah subject Baru';
        response.error(message, res);
      } else {
        console.log('Sukses menambah subject baru');
        const dataToReturn = {
          message: 'Sukses menambah subject baru',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Create subject Controller');
    },
  );
};
