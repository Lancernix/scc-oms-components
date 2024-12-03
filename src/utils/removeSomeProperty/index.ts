/**
 * 递归删除对象中指定的某个key或者某些key
 * @param _obj 对象
 * @param name key/keys
 * @description 对象中如果包含数组，并且数组的元素也是对象，那么这些对象中的属性也会被删除
 */
export default function removeSomeProperty<T extends Record<string, unknown>>(
  obj: T,
  name: string | string[],
): Partial<T> {
  // 将单个name也转换成数组
  const names = Array.isArray(name) ? name : [name];
  // 创建一个新的对象，用于存储过滤后的结果
  const newObj: Partial<T> = {};

  for (const key in obj) {
    // 如果当前key不在要过滤的name数组中，则保留该属性
    if (!names.includes(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          // 处理数组
          newObj[key] = obj[key].map((item: unknown) =>
            typeof item === 'object' && item !== null
              ? removeSomeProperty(item as Record<string, unknown>, names)
              : item,
          ) as T[Extract<keyof T, string>];
        } else {
          // 处理对象
          newObj[key] = removeSomeProperty(obj[key] as Record<string, unknown>, names) as T[Extract<keyof T, string>];
        }
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}
