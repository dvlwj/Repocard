const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.deleteController = function deleteController(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Delete Student Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { nama, id } = requestPayloadBody;
  connection.query(
    {
      sql: 'Update data_student set name = ? , active = 2 where id = ?',
      timeout: 30000,
    },
    [nama, id],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal menghapus data siswa';
        response.error(message, res);
      } else {
        console.log('Sukses menghapus data siswa');
        const dataToReturn = {
          message: 'Sukses menghapus data siswa',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Delete Student Controller');
    },
  );
};
