const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.update = function update(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Update nilai Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const {
    idSiswa,
    idMataPelajaran,
  } = requestPayloadBody;
  connection.query(
    {
      sql: 'Update data_nilai set submitted = 2 where id_siswa = ? and id_mata_pelajaran = ?',
      timeout: 30000,
    },
    [idSiswa, idMataPelajaran],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal mengubah data nilai';
        response.error(message, res);
      } else {
        console.log('Sukses mengubah data nilai');
        const dataToReturn = {
          message: 'Sukses mengubah data nilai',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Update nilai Controller');
    },
  );
};
