const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.update = function update(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Update subject Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { id, subjectName, value } = requestPayloadBody;
  connection.query(
    {
      sql: 'update data_nilai set nama_mata_pelajara = ?, nilai = ?  where id  = ?',
      timeout: 30000,
    },
    [subjectName, value, id],
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
