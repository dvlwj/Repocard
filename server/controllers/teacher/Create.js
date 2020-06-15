const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.create = function create(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Create Guru Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { username, password, idMatpel } = requestPayloadBody;
  connection.query(
    {
      sql: 'INSERT INTO data_user (username, password, level, active, mat_pel) VALUES (?, md5(?), 2, 1, ?)',
      timeout: 30000,
    },
    [username, password, idMatpel],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal Menambah Guru Baru';
        response.error(message, res);
      } else {
        console.log('Sukses menambah guru baru');
        const dataToReturn = {
          message: 'Sukses menambah guru',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Create Guru Controller');
    },
  );
};
