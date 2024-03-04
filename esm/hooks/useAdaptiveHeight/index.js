import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import { useEffect, useState } from 'react';

/** 获取当前可用高度 */
function getCurAvailableHeight(offsetTop, offsetButtom, minHeight) {
  var availableHeight = window.innerHeight - offsetTop - offsetButtom;
  return availableHeight < minHeight ? minHeight : availableHeight;
}

/**
 * 根据当前视窗高度获取适合的高度
 * @param offsetTop 偏移顶部的距离
 * @param offsetButtom 偏移底部的距离
 * @param minHeight 最低高度，如果可用高度少于最低高度，则使用最低高度
 * @returns 自适应高度
 */
export default function useAdaptiveHeight(offsetTop, offsetButtom) {
  var minHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var initRes = getCurAvailableHeight(offsetTop, offsetButtom, minHeight);
  var _useState = useState(initRes),
    _useState2 = _slicedToArray(_useState, 2),
    height = _useState2[0],
    setHeight = _useState2[1];
  var handleResize = function handleResize() {
    var res = getCurAvailableHeight(offsetTop, offsetButtom, minHeight);
    setHeight(res);
  };
  useEffect(function () {
    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return height;
}