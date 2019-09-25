const login = (req, res) => {
  const sex = req.body.sex;

  const remarksMap = {
    0: '男性用户登录成功',
    1: '女性用户登录成功',
    2: '中性或者未知性别用户登录成功',
  };

  return res.json({
    resultCode: 200,
    resultData: {
      avatar: "@image('200x200','red','#fff','avatar')",
      date: '@date()',
      loginTime: 1543541314705,
      maxage: 18000000,
      token:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwianRpIjoiMiIsImlhdCI6MTU0MzU0MTMxNH0.UO2N5qqocSRwx_Qio0uWzzJz_oiQJtJy8tr3HBVr4XY',
      userId: '@id()',
      userName: '@cname()',
      'sex|1': [0, 1, 2],
      userType: 0,
      ip: '@ip()',
      email: '@email()',
      description: '@paragraph()',
      remarks: '中性或者未知性别用户登录',
    },
    resultMsg: remarksMap[sex],
  });
};

module.exports = {
  'POST /oauth/login': login,
};
