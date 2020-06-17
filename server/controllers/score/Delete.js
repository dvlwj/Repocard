const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.deleteController = function deleteController(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Delete nilai Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const {
    idSiswa,
    idMataPelajaran,
    kategori,
    nilai,
  } = requestPayloadBody;
  connection.query(
    {
      sql: 'Update data_nilai set id_mata_pelajaran = ?, kategori = ?, nilai = ? where id_siswa = ?',
      timeout: 30000,
    },
    [idMataPelajaran, kategori, nilai, idSiswa],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal menghapus data nilai';
        response.error(message, res);
      } else {
        console.log('Sukses menghapus data nilai');
        const dataToReturn = {
          message: 'Sukses menghapus data nilai',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Delete nilai Controller');
    },
  );
};
