exports.ok = function ok(values, res) {
  const data = {
    data: values,
  };
  res.status(200);
  res.json(data);
  res.end();
};

exports.error = function error(message, res) {
  const data = {
    message,
  };
  res.status(500);
  res.json(data);
  res.end();
};
