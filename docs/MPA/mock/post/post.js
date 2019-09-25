const testPost = (req, res) => {
  return res.json({
    resultCode: 200,
    resultData: {
      status: true,
    },
    resultMsg: 'post-测试操作',
  });
};

module.exports = {
  'POST /test/post': testPost,
};
