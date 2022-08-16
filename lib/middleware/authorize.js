module.exports = async (req, res, next) => {
  console.log(req.user, 'auth log');
  try {
    if (!req.user || req.user.email !== 'admin@example.com')
      throw new Error('You do not have access to this page');

    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
