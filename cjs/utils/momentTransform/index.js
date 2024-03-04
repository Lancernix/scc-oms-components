"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.millisecondToMoment = millisecondToMoment;
exports.momentToMillisecond = momentToMillisecond;
exports.momentToSecond = momentToSecond;
exports.momentToString = momentToString;
exports.momentToValue = momentToValue;
exports.secondToMoment = secondToMoment;
exports.stringToMoment = stringToMoment;
exports.valueToMoment = valueToMoment;
var _isInteger = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/number/is-integer"));
var _moment = _interopRequireDefault(require("moment"));
/**
 * moment对象转换成秒级时间戳
 * @param params moment对象
 * @returns 秒级时间戳，如果入参不是moment对象，则返回undefined
 */
function momentToSecond(params) {
  return _moment.default.isMoment(params) ? params.unix() : void 0;
}

/**
 * moment对象转换成时间戳
 * @param params moment对象
 * @returns 时间戳，如果入参不是moment对象，则返回undefined
 */
function momentToMillisecond(params) {
  return _moment.default.isMoment(params) ? params.valueOf() : void 0;
}

/**
 * moment对象转换成日期字符串
 * @param params moment对象
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @returns 日期字符串，如果入参不是moment对象，则返回undefined
 */
function momentToString(params) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';
  return _moment.default.isMoment(params) ? params.format(format) : void 0;
}

/**
 * moment对象转换成其他类型（字符串/时间戳/秒级时间戳）
 * @param params moment对象
 * @param valueType 要转换成的数据类型
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @returns 期待的类型数据，如果入参不是moment对象，则返回undefined
 */
function momentToValue(params, valueType) {
  var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'YYYY-MM-DD HH:mm:ss';
  switch (valueType) {
    case 'string':
      return momentToString(params, format);
    case 'secondTimestamp':
      return momentToSecond(params);
    case 'timestamp':
      return momentToMillisecond(params);
    case 'moment':
      return _moment.default.isMoment(params) ? params : void 0;
    default:
      return momentToString(params, format);
  }
}

/**
 * 日期字符串转moment对象
 * @description 项目中最常用的两种格式：2023-01-01、2023-01-01 01:01:01支持直接解析，其他格式需要传format参数
 * @param timeString 日期字符串
 * @param format 字符串格式
 * @returns moment对象，如果入参是无效日期字符串，则返回undefined
 */
function stringToMoment(timeString, format) {
  var realFormat = format !== null && format !== void 0 ? format : 'YYYY-MM-DD HH:mm:ss';
  var res = (0, _moment.default)(timeString, realFormat);
  return res.isValid() ? res : void 0;
}

/**
 * 秒级时间戳转换成moment对象
 * @param params 秒级时间戳（通常为10位整数）
 * @returns moment对象，如果入参不是一个integer，则返回undefined
 */
function secondToMoment(params) {
  return (0, _isInteger.default)(params) ? _moment.default.unix(params) : void 0;
}

/**
 * 时间戳转换成moment对象
 * @param params 时间戳（通常为13位整数）
 * @returns moment对象，如果入参不是一个integer，则返回undefined
 */
function millisecondToMoment(params) {
  return (0, _isInteger.default)(params) ? (0, _moment.default)(params) : void 0;
}

/**
 * 其他类型（字符串/时间戳/秒级时间戳）转换成moment对象
 * @param params 字符串/时间戳/秒级时间戳数据
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @returns moment对象，如果入参不合规，则返回undefined
 */
function valueToMoment(params) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';
  if (typeof params === 'string') {
    return stringToMoment(params, format);
  }
  if (typeof params === 'number') {
    // 这里通过时间戳长度是否超过13位来判断是秒级还是毫秒级
    return params.toString().length < 13 ? secondToMoment(params) : millisecondToMoment(params);
  }
  return _moment.default.isMoment(params) ? params : void 0;
}
var _default = exports.default = {};