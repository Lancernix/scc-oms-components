/**
 * 递归删除对象中指定的某个key
 * @param _obj 对象
 * @param name key
 * @description 注意：这个方法并不是一个纯函数，会改变入参
 */
export default function removeSomeProperty(_obj: Record<string, unknown>, name: string) {
  Object.keys(_obj).forEach(key => {
    if (key === name) {
      delete _obj[key];
    } else if (typeof _obj[key] === 'object' && _obj[key] !== null) {
      removeSomeProperty(_obj[key] as Record<string, unknown>, name);
    }
  });
}
