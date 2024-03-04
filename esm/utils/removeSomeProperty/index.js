import _typeof from "@babel/runtime-corejs3/helpers/typeof";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js/instance/for-each";
import _Object$keys from "@babel/runtime-corejs3/core-js/object/keys";
/**
 * 递归删除对象中指定的某个key
 * @param _obj 对象
 * @param name key
 * @description 注意：这个方法并不是一个纯函数，会改变入参
 */
export default function removeSomeProperty(_obj, name) {
  var _context;
  _forEachInstanceProperty(_context = _Object$keys(_obj)).call(_context, function (key) {
    if (key === name) {
      delete _obj[key];
    } else if (_typeof(_obj[key]) === 'object' && _obj[key] !== null) {
      removeSomeProperty(_obj[key], name);
    }
  });
}