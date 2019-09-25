const testGet = (req, res) => {
  return res.json({
    resultCode: 200,
    resultData: {
      status: false,
    },
    resultMsg: 'get-测试操作',
  });
};

module.exports = {
  'GET /test/get': testGet,
  'GET /test/get2': testGet,
};
