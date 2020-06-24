const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.read = function read(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Read nilai Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { idSiswa } = requestPayloadBody;
  connection.query(
    {
      // sql: 'SELECT data_nilai.id_siswa, data_nilai.id_mata_pelajaran, data_nilai.nilai1, data_nilai.nilai2, data_nilai.nilai3, data_nilai.nilai4, data_nilai.nilai5, data_nilai.nilai6, data_nilai.nilai7, data_nilai.nilai8, data_nilai.nilai9, data_nilai.nilai10 from data_nilai INNER JOIN data_student ON data_nilai.id_siswa=data_student.id where data_student.nama = ? and data_student.password = md5 (?) and data_nilai.submitted = 2',
      sql: 'SELECT * from data_nilai where id_siswa = ? and submitted = 2 order by id_mata_pelajaran asc',
      timeout: 30000,
    },
    [idSiswa],
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
