import { useEffect, useState } from 'react';

/** 获取当前可用高度 */
function getCurAvailableHeight(offsetTop: number, offsetButtom: number, minHeight: number) {
  const availableHeight = window.innerHeight - offsetTop - offsetButtom;
  return availableHeight < minHeight ? minHeight : availableHeight;
}

/**
 * 根据当前视窗高度获取适合的高度
 * @param offsetTop 偏移顶部的距离
 * @param offsetButtom 偏移底部的距离
 * @param minHeight 最低高度，如果可用高度少于最低高度，则使用最低高度
 * @returns 自适应高度
 */
export default function useAdaptiveHeight(offsetTop: number, offsetButtom: number, minHeight = 0) {
  const initRes = getCurAvailableHeight(offsetTop, offsetButtom, minHeight);
  const [height, setHeight] = useState(initRes);

  const handleResize = () => {
    const res = getCurAvailableHeight(offsetTop, offsetButtom, minHeight);
    setHeight(res);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return height;
}
