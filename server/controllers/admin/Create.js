const response = require('../../shared/utils/response');
const connection = require('../../shared/databases/connection');

exports.create = function create(req, res) {
  const requestPayloadBody = req.body;
  console.log(`Mulai Create admin Controller, payload : ${JSON.stringify(requestPayloadBody)}`);
  const { username, password } = requestPayloadBody;
  connection.query(
    {
      sql: 'INSERT INTO data_user (username, password, level, active) VALUES (?, md5(?), 1, 1)',
      timeout: 30000,
    },
    [username, password],
    (error, rows) => {
      if (error || rows.length === 0) {
        const message = 'Gagal Menambah admin Baru';
        response.error(message, res);
      } else {
        console.log('Sukses menambah admin baru');
        const dataToReturn = {
          message: 'Sukses menambah admin',
        };
        response.ok(dataToReturn, res);
      }
      console.log('Selesai Create admin Controller');
    },
  );
};
