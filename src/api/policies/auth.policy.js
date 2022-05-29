const JWTService = require('../services/auth.service');
const { AuthorizationError } = require('../errors');

// usually: "Authorization: Bearer [token]" or "token: [token]"
module.exports = async (_, __, { req }) => {
  let tokenToVerify;

  if (req.header('Authorization')) {
    const parts = req.header('Authorization').split(' ');

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        throw new AuthorizationError({
          message: 'Format for Authorization: Bearer [token]'
        });
      }
    } else {
      throw new AuthorizationError({
        message: 'Format for Authorization: Bearer [token]'
      });
    }
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    throw new AuthorizationError({
      message: 'No Authorization was found'
    });
  }

  return JWTService().verify(tokenToVerify, (err, thisToken) => {
    if (err) {
      throw new AuthorizationError(err);
    }
    req.token = thisToken;
    return thisToken;
  });
};
