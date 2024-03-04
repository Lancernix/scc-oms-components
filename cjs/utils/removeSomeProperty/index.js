"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeSomeProperty;
var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/for-each"));
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/object/keys"));
/**
 * 递归删除对象中指定的某个key
 * @param _obj 对象
 * @param name key
 * @description 注意：这个方法并不是一个纯函数，会改变入参
 */
function removeSomeProperty(_obj, name) {
  var _context;
  (0, _forEach.default)(_context = (0, _keys.default)(_obj)).call(_context, function (key) {
    if (key === name) {
      delete _obj[key];
    } else if ((0, _typeof2.default)(_obj[key]) === 'object' && _obj[key] !== null) {
      removeSomeProperty(_obj[key], name);
    }
  });
}