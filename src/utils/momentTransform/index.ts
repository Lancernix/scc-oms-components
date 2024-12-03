import type { Moment } from 'moment';
import moment from 'moment-timezone';
import getTimeZone from 'utils/getTimeZone';

/** 当前环境所在时区 */
const currentTimeZone = getTimeZone();

/**
 * moment对象转换成秒级时间戳
 * @param value moment对象
 * @returns 秒级时间戳，如果入参不是moment对象，则返回null
 */
export function momentToSecond(value: Moment) {
  return moment.isMoment(value) ? value.unix() : null;
}

/**
 * moment对象转换成毫秒级时间戳
 * @param value moment对象
 * @returns 毫秒级时间戳，如果入参不是moment对象，则返回null
 */
export function momentToMillisecond(value: Moment) {
  return moment.isMoment(value) ? value.valueOf() : null;
}

/**
 * moment对象转换成日期字符串
 * @param value moment对象
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @param targetTimeZone 目标时区（即结果对应的时区），默认为当前所在的时区
 * @param utcSuffix 是否在末尾添加(UTC+08:00)这样的后缀，默认为false
 * @description 如果format已经包含了时区的信息，同时再使用utcSuffix时可能有冲突
 * @returns 日期字符串，如果入参不是moment对象，则返回null
 */
export function momentToString(
  value: Moment,
  format = 'YYYY-MM-DD HH:mm:ss',
  targetTimeZone = currentTimeZone,
  utcSuffix = false,
) {
  if (moment.isMoment(value)) {
    // 传入的value可能是普通的moment对象（没有时区信息以及时区相关的方法），这里需要先转换一下，否则后面在调用tz()可能会报错
    const valueWithTimezone = moment.tz(value, currentTimeZone);
    const realFormat = utcSuffix ? `${format} [(UTC]Z[)]` : format;
    return valueWithTimezone.tz(targetTimeZone).format(realFormat);
  }
  return null;
}

/**
 * moment对象转换成任意类型（字符串/时间戳/秒级时间戳/moment）
 * @param value moment对象
 * @param valueType 要转换成的数据类型
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @param targetTimeZone 目标时区（即结果对应的时区），默认为当前所在的时区
 * @param utcSuffix 是否在末尾添加(UTC+08:00)这样的后缀，默认为false
 * @returns 期待的类型数据，如果入参不是moment对象，则返回null
 */
export function momentToValue<T extends 'string' | 'secondTimestamp' | 'timestamp' | 'moment'>(
  value: Moment,
  valueType: T,
  format = 'YYYY-MM-DD HH:mm:ss',
  targetTimeZone = currentTimeZone,
  utcSuffix = false,
) {
  if (!moment.isMoment(value)) {
    return null as never;
  }
  switch (valueType) {
    case 'string':
      return momentToString(value, format, targetTimeZone, utcSuffix) as T extends 'string' ? string : never;
    case 'secondTimestamp':
      return momentToSecond(value) as T extends 'secondTimestamp' ? number : never;
    case 'timestamp':
      return momentToMillisecond(value) as T extends 'timestamp' ? number : never;
    case 'moment':
      return value as T extends 'dayjs' ? Moment : never;
    default:
      return null as never;
  }
}

/**
 * 日期字符串转moment对象
 * @description 转换之后是一个当前时区标记的moment对象。比如你给定的时区是Asia/Shanghai，而当前所在时区是Asia/Tokyo，那么返回的将是一个标记为Asia/Tokyo的moment对象
 * @param value 日期字符串
 * @param format 字符串格式，默认为YYYY-MM-DD HH:mm:ss
 * @param sourceTimeZone 来源时区（即输入数据对应的时区），默认为当前所在的时区
 * @returns moment对象，如果入参是无效日期字符串，则返回null
 */
export function stringToMoment(value: string, format = 'YYYY-MM-DD HH:mm:ss', sourceTimeZone = currentTimeZone) {
  // 先进行一下类型判定，undefined、null都直接返回null
  if (typeof value !== 'string') {
    return null;
  }
  const resGivenTz = moment.tz(value, format, sourceTimeZone);
  if (resGivenTz.isValid()) {
    return resGivenTz.local();
  }
  return null;
}

/**
 * 秒级时间戳转换成moment对象
 * @param value 秒级时间戳
 * @returns moment对象，如果入参不是一个integer，则返回null
 */
export function secondToMoment(value: number) {
  return Number.isInteger(value) ? moment.unix(value) : null;
}

/**
 * 毫秒级时间戳转换成moment对象
 * @param value 毫秒级时间戳
 * @returns moment对象，如果入参不是一个integer，则返回null
 */
export function millisecondToMoment(value: number) {
  return Number.isInteger(value) ? moment(value) : null;
}

/**
 * 其他类型（字符串/时间戳/秒级时间戳）转换成moment对象
 * @param value 字符串/时间戳/秒级时间戳数据
 * @param valueType 'string' | 'secondTimestamp' | 'timestamp' | 'moment'
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @param sourceTimeZone 来源时区（即输入数据的对应的时区），默认为当前所在的时区
 * @returns moment对象，如果入参不合规，则返回null
 */
export function valueToMoment(
  value: Moment | string | number,
  valueType: 'string' | 'secondTimestamp' | 'timestamp' | 'moment',
  format = 'YYYY-MM-DD HH:mm:ss',
  sourceTimeZone = currentTimeZone,
) {
  // 先进行类型判断，undefined、null都不处理直接返回null
  if (!(typeof value === 'string' || typeof value === 'number' || moment.isMoment(value))) {
    return null;
  }
  switch (valueType) {
    case 'string':
      return stringToMoment(value as string, format, sourceTimeZone);
    case 'secondTimestamp':
      return secondToMoment(value as number);
    case 'timestamp':
      return millisecondToMoment(value as number);
    case 'moment':
      return moment.isMoment(value) ? value : null;
    default:
      return null;
  }
}

/**
 * 使用moment获取指定时区的时间UTC偏移量
 * @param timeZone 时区，默认为当前所在时区
 * @returns 格式化过的偏移量字符串，如UTC+08:00
 * @description 返回值的形式为UTC±[hh]:[mm]
 */
export function getUtcOffset(timeZone = currentTimeZone) {
  return moment().tz(timeZone).format('UTCZ');
}
