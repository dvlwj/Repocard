const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.deleteController = function deleteController(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Delete subject Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { studentID, subjectName } = requestPayloadBody;
  connection.query(
    {
      sql: 'DELETE FROM data_nilai where id_siswa = ? and nama_mata_pelajaran = ?',
      timeout: 30000,
    },
    [studentID, subjectName],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal menghapus data subject';
        response.error(message, res);
      } else {
        console.log('Sukses menghapus data subject');
        const dataToReturn = {
          message: 'Sukses menghapus data subject',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Delete subject Controller');
    },
  );
};
