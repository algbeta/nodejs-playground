const handleSuccess = (res, status, data) => {
  res.writeHead(status || 200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const handleError = (res, status, message) => {
  res.writeHead(status || 500, { "Content-Type": "application/json" });
  res.end(JSON.stringify(message));
};

const wrapResp = (fn, res, status) => {
  try {
    const data = fn();
    handleSuccess(res, status, data);
  } catch (err) {
    handleError(res, 500, err);
  }
};

module.exports = {
  wrapResp,
  handleError,
  handleSuccess,
};
