import _regeneratorRuntime from "@babel/runtime-corejs3/helpers/regeneratorRuntime";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js/instance/for-each";
import _Promise from "@babel/runtime-corejs3/core-js/promise";
import { cloneDeep } from 'lodash-es';
import { useCallback } from 'react';
import removeSomeProperty from "../../utils/removeSomeProperty";

/**
 * 返回了一个方法，这个方法会获取form校验成功之后的表单数据，同时支持配置过滤不需要的字段，还增加了校验失败自动滚动到失败表单项的处理
 * @param form form实例
 * @description 主要有两个应用场景：需要过滤某些不需要提交的数据；在有滚动条的表单校验失败之后给用户一个友好的提示
 */
export default function useValidatedFormValues(form) {
  /**
   * 获取form校验成功之后的表单数据，支持配置过滤不需要的字段，同时增加了校验失败自动滚动到失败表单项的处理
   * @param form formInstance
   * @param filterFields 需要跳过的字段数组，如[{name: 'xxx', deep: true}]，如果deep为true则会递归过滤
   */
  var getValidatedValues = useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(filterFields) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", form.validateFields().then(function (values) {
              if (filterFields !== null && filterFields !== void 0 && filterFields.length) {
                var newValues = cloneDeep(values);
                _forEachInstanceProperty(filterFields).call(filterFields, function (field) {
                  if (field.deep) {
                    // 深度过滤
                    removeSomeProperty(newValues, field.name);
                  } else {
                    // 只过滤第一层
                    if (newValues[field.name]) {
                      delete newValues[field.name];
                    }
                  }
                });
                return _Promise.resolve(newValues);
              }
              return _Promise.resolve(values);
            }).catch(function (info) {
              form.scrollToField(info.errorFields[0].name, {
                behavior: 'smooth',
                block: 'center'
              });
              return _Promise.reject(info);
            }));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [form]);
  return getValidatedValues;
}