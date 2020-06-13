const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.update = function update(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Update subject Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { studentID, subjectName, value } = requestPayloadBody;
  connection.query(
    {
      sql: 'INSERT INTO data_nilai (id_siswa, nama_mata_pelajaran, nilai) VALUES (?, ?, ?)',
      timeout: 30000,
    },
    [studentID, subjectName, value],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal mengubah data subject';
        response.error(message, res);
      } else {
        console.log('Sukses mengubah data subject');
        const dataToReturn = {
          message: 'Sukses mengubah data subject',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Update subject Controller');
    },
  );
};
