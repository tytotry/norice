const _ = require('lodash');

const METHODS = ['get', 'post', 'delete', 'put', 'patch'];

const DEFAULT_SUCCESS_CODE = 200;
const DEFAULT_ERROR_CODE = 400;

exports.isCompoundPath = function isCompoundPath(path) {
  const pathKeys = new Set(Object.keys(path));
  const intersection = new Set(METHODS.filter(x => pathKeys.has(x)));
  return intersection.size === pathKeys.size && pathKeys.size !== 0;
};

function getStatusCode(defaultCode, pos) {
  return (status) => {
    if (Array.isArray(status)) {
      return status[pos] || status[0] || defaultCode;
    }
    if (status) {
      return status;
    }
    return defaultCode;
  };
}

exports.getSuccessStatusCode = getStatusCode(DEFAULT_SUCCESS_CODE, 0);
exports.getErrorStatusCode = getStatusCode(DEFAULT_ERROR_CODE, 1);

exports.isHttpURL = function isHttpURL(str) {
  if (typeof str !== 'string') {
    return false;
  }
  return /^https?:\/\//.test(str);
};

exports.isStringOrPlainObj = function isStringOrPlainObj(obj) {
  return _.isString(obj) || _.isPlainObject(obj);
};

exports.isValidatePath = path => path.indexOf('/') === 0;

exports.isValidateHandle = (path, handle) => {
  if (_.isString(handle)) {
    return true;
  }
  if (_.isPlainObject(handle)) {
    return true;
  }
  if (_.isFunction(handle)) {
    return true;
  }
  console.error(`path: ${path} is invalidate handle`);
  return false;
};