const test4 = (req, res) => {
  return res.json({
    resultCode: 200,
    resultData: {
      status: true,
    },
    resultMsg: 'get-测试操作',
  });
};

module.exports = {
  'GET /test/test4': test4,
};
