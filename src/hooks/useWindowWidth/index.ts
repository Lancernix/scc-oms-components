import { useEffect, useState } from 'react';

/**
 * 获取当前视窗宽度
 * @description 用于在js中获取当前视窗宽度，做些媒体查询的逻辑
 * @returns 视窗宽度
 */
export default function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}
