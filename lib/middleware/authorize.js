module.exports = async (req, res, next) => {
  console.log('here', req.user);
  try {
    if (!req.user || req.user.email !== 'admin')
      throw new Error('You do not have access to view this page yo');

    next();
  } catch (e) {
    e.status = 403;
  }
};
