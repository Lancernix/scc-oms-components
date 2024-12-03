import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import getTimeZone from 'utils/getTimeZone';

dayjs.extend(utc);
dayjs.extend(tz);

/** 当前环境所在时区 */
export const currentTimeZone = getTimeZone();

/**
 * dayjs对象转换成秒级时间戳
 * @param value dayjs对象
 * @returns 秒级时间戳，如果入参不是dayjs对象，则返回null
 */
export function dayjsToSecond(value: Dayjs) {
  return dayjs.isDayjs(value) ? value.unix() : null;
}

/**
 * dayjs对象转换成毫秒级时间戳
 * @param value dayjs对象
 * @returns 毫秒级时间戳，如果入参不是dayjs对象，则返回null
 */
export function dayjsToMillisecond(value: Dayjs) {
  return dayjs.isDayjs(value) ? value.valueOf() : null;
}

/**
 * dayjs对象转换成指定时区的日期字符串
 * @param value dayjs对象
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @param targetTimeZone 目标时区（你想要转换到的时区），默认为当前所在的时区
 * @param utcSuffix 是否在末尾添加(UTC+08:00)这样的后缀，默认为false
 * @description 如果format已经包含了时区的信息，同时再使用utcSuffix时可能有冲突
 * @returns 日期字符串，如果入参不是dayjs对象，则返回null
 */
export function dayjsToString(
  value: Dayjs,
  format = 'YYYY-MM-DD HH:mm:ss',
  targetTimeZone = currentTimeZone,
  utcSuffix = false,
) {
  if (dayjs.isDayjs(value)) {
    const realFormat = utcSuffix ? `${format} [(UTC]Z[)]` : format;
    return value.tz(targetTimeZone).format(realFormat);
  }
  return null;
}

/**
 * dayjs转换成任意类型（字符串/时间戳/秒级时间戳/Dayjs）
 * @param value dayjs对象
 * @param valueType 'string' | 'secondTimestamp' | 'timestamp' | 'dayjs'
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @param targetTimeZone 目标时区（你想要转换到的时区），默认为当前所在的时区
 * @param utcSuffix 是否在末尾添加(UTC+08:00)这样的后缀，默认为false
 * @returns 期待的类型数据，如果入参不是dayjs对象，则返回null（undefined也会返回null）
 */
export function dayjsToValue<T extends 'string' | 'secondTimestamp' | 'timestamp' | 'dayjs'>(
  value: Dayjs,
  valueType: T,
  format = 'YYYY-MM-DD HH:mm:ss',
  targetTimeZone = currentTimeZone,
  utcSuffix = false,
) {
  // value 不是 Dayjs 对象时，直接返回 null
  if (!dayjs.isDayjs(value)) {
    return null as never;
  }
  switch (valueType) {
    case 'string': {
      return dayjsToString(value, format, targetTimeZone, utcSuffix) as T extends 'string' ? string : never;
    }
    case 'secondTimestamp': {
      return dayjsToSecond(value) as T extends 'secondTimestamp' ? number : never;
    }
    case 'timestamp': {
      return dayjsToMillisecond(value) as T extends 'timestamp' ? number : never;
    }
    case 'dayjs': {
      return value as T extends 'dayjs' ? Dayjs : never;
    }
    default:
      return null as never;
  }
}

/**
 * 日期字符串转dayjs对象
 * @description 转换之后是一个当前时区标记的dayjs对象。比如你给定的时区是Asia/Shanghai，而当前所在时区是Asia/Tokyo，那么返回的将是一个标记为Asia/Tokyo的dayjs对象
 * @param timeString 日期时间字符串
 * @param format 字符串格式，默认为YYYY-MM-DD HH:mm:ss
 * @param sourceTimeZone 来源时区（即输入数据对应的时区），默认为当前所在的时区
 * @returns dayjs对象，如果入参是无效日期字符串，则返回null
 */
export function stringToDayjs(timeString: string, format = 'YYYY-MM-DD HH:mm:ss', sourceTimeZone = currentTimeZone) {
  // 先进行一下类型判定，undefined、null都直接返回null
  if (typeof timeString !== 'string') {
    return null;
  }
  let resGivenTz: Dayjs;
  // dayjs.tz与Antd的DatePicker一起使用的时候，在处理格式与format不一致的timeString时会报错
  // 单独使用dayjs.tz时处理format不一致的timeString时没有任何问题（所以应该是Antd的问题），这里的try...catch可以保留dayjs的这个行为且保持代码能正常使用
  try {
    resGivenTz = dayjs.tz(timeString, format, sourceTimeZone);
  } catch (error) {
    resGivenTz = dayjs('Invalid Date');
  }
  if (resGivenTz.isValid()) {
    return resGivenTz.local();
  }
  return null;
}

/**
 * 秒级时间戳转换成dayjs对象
 * @param value 秒级时间戳
 * @returns dayjs对象，如果入参不是一个integer，则返回null
 */
export function secondToDayjs(value: number) {
  return Number.isInteger(value) ? dayjs.unix(value) : null;
}

/**
 * 毫秒级时间戳转换成dayjs对象
 * @param value 毫秒级时间戳
 * @returns dayjs对象，如果入参不是一个integer，则返回null
 */
export function millisecondToDayjs(value: number) {
  return Number.isInteger(value) ? dayjs(value) : null;
}

/**
 * 任意类型（字符串/时间戳/秒级时间戳/Dayjs）转换成dayjs对象
 * @param value 字符串/时间戳/秒级时间戳数据
 * @param valueType 'string' | 'secondTimestamp' | 'timestamp' | 'dayjs'
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @param sourceTimeZone 来源时区（即输入数据对应的时区），默认为当前所在的时区
 * @returns dayjs对象，如果入参不合规，则返回null
 */
export function valueToDayjs(
  value: string | number | Dayjs,
  valueType: 'string' | 'secondTimestamp' | 'timestamp' | 'dayjs',
  format = 'YYYY-MM-DD HH:mm:ss',
  sourceTimeZone = currentTimeZone,
) {
  // 先进行类型判断，undefined、null都不处理直接返回null
  if (!(typeof value === 'string' || typeof value === 'number' || dayjs.isDayjs(value))) {
    return null;
  }
  switch (valueType) {
    case 'string':
      return stringToDayjs(value as string, format, sourceTimeZone);
    case 'secondTimestamp':
      return secondToDayjs(value as number);
    case 'timestamp':
      return millisecondToDayjs(value as number);
    case 'dayjs':
      return dayjs.isDayjs(value) ? value : null;
    default:
      return null;
  }
}

/**
 * 使用dayjs获取指定时区的时间UTC偏移量
 * @param timeZone 时区，默认为当前所在时区
 * @returns 格式化过的偏移量字符串，如UTC+08:00
 * @description 返回值的形式为UTC±[hh]:[mm]
 */
export function getUtcOffset(timeZone = currentTimeZone) {
  // 不同时区下的当前时间
  return dayjs().tz(timeZone).format('UTCZ');
}
