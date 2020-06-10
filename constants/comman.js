const STANDARD = {
    CREATED: 201,
    SUCCESS: 200,
    NOCONTENT: 204,
  };
  
  const ERROR404 = {
    CODE: 404,
    MESSAGE: 'PAGE_NOT_FOUND',
  };
  
  const ERROR403 = {
    CODE: 403,
    MESSAGE: 'FORBIDDEN_ACCESS',
  };
  
  const ERROR401 = {
    CODE: 401,
    MESSAGE: 'UNAUTHORIZED',
  };
  
  const ERROR500 = {
    CODE: 500,
    MESSAGE: 'TRY_AGAIN',
  };
  
  const ERROR422 = 422;
  
  const ERROR409 = {
    CODE: 409,
    MESSAGE: 'DUPLICATE_FOUND',
  };
  
  const ERROR400 = {
    CODE: 400,
    MESSAGE: 'BAD_REQUEST',
  };
  
  module.exports = {
    STANDARD,
    ERROR401,
    ERROR404,
    ERROR422,
    ERROR403,
    ERROR500,
    ERROR409,
    ERROR400,
  };
  