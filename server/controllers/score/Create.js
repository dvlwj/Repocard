const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.create = function create(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Create Score Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const {
    idSiswa,
    idMataPelajaran,
    nilai1,
    nilai2,
    nilai3,
    nilai4,
    nilai5,
    nilai6,
    nilai7,
    nilai8,
    nilai9,
    nilai10,
  } = requestPayloadBody;
  connection.query(
    {
      sql: 'INSERT INTO data_nilai (id_siswa, id_mata_pelajaran, nilai1, nilai2, nilai3, nilai4, nilai5, nilai6, nilai7, nilai8, nilai9, nilai10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      timeout: 30000,
    },
    [idSiswa, idMataPelajaran, nilai1, nilai2, nilai3,
      nilai4, nilai5, nilai6, nilai7, nilai8, nilai9, nilai10],
    (error, rows) => {
      if (error || rows.length === 0) {
        console.log(error);
        const message = 'Gagal Menambah nilai Baru';
        response.error(message, res);
      } else {
        console.log('Sukses menambah nilai baru');
        const dataToReturn = {
          message: 'Sukses menambah nilai baru',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Create Score Controller');
    },
  );
};
