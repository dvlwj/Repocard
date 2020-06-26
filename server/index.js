
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const port = process.env.PORT || 8081;
const app = express();
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    return callback(null, true);
  },
}),);

routes(app);

app.listen(port, () => {
  console.log(`RESTful API started. API Service is live on: ${port}`);
});
