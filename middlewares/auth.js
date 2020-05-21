const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  console.log('AUTH MIDDLEWARE: ', token);
  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.tokenUser = decoded.tokenUser;
    console.log('decoded: ', decoded);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.log('expired');
      return res.status(401).send({ msg: 'token expired' });
    }
    res.status(401).json({ msg: 'Authorizaton denied' });
  }
};
