module.exports = async (req, res, next) => {
  try {
    if (!req.user || req.user.email !== 'admin')
      throw new Error('You do not have access to view this page yo');

    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
