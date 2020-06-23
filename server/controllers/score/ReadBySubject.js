const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.read = function read(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Read nilai Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { idMatpel } = requestPayloadBody;
  connection.query(
    {
      sql: 'SELECT data_student.id, data_student.nama from data_student INNER JOIN data_nilai ON data_student.id=data_nilai.id_siswa where data_nilai.id_mata_pelajaran = ?',
      timeout: 30000,
    },
    [idMatpel],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal mendapatkan daftar nilai';
        response.error(message, res);
      } else {
        console.log('Sukses mendapatkan daftar nilai');
        const dataToReturn = {
          message: 'Sukses mendapatkan daftar nilai',
          data: rows,
        };
        response.okOnly(dataToReturn, res);
      }
      console.log('Selesai Read nilai Controller');
    },
  );
};
