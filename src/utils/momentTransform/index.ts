import type { Moment } from 'moment';
import moment from 'moment-timezone';
import getTimeZone from 'utils/getTimeZone';

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
 * @param timeZone 时区，默认为当前所在的时区
 * @param utcSuffix 是否在末尾添加(UTC+08:00)这样的后缀，默认为false
 * @description 如果format已经包含了时区的信息，同时再使用utcSuffix时可能有冲突
 * @returns 日期字符串，如果入参不是moment对象，则返回null
 */
export function momentToString(
  value: Moment,
  format = 'YYYY-MM-DD HH:mm:ss',
  timeZone = getTimeZone(),
  utcSuffix = false,
) {
  if (moment.isMoment(value)) {
    const realFormat = utcSuffix ? `${format}[(UTC]Z[)]` : format;
    // 这里需要clone一个新的moment对象，不然调用tz时会永久修改value这个对象的时区，会造成一些问题
    return value.clone().tz(timeZone).format(realFormat);
  }
  return null;
}

/**
 * moment对象转换成任意类型（字符串/时间戳/秒级时间戳/moment）
 * @param value moment对象
 * @param valueType 要转换成的数据类型
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @param timeZone 时区，默认为当前所在的时区
 * @param utcSuffix 是否在末尾添加(UTC+08:00)这样的后缀，默认为false
 * @returns 期待的类型数据，如果入参不是moment对象，则返回null
 */
export function momentToValue(
  value: Moment,
  valueType: 'string' | 'secondTimestamp' | 'timestamp' | 'moment',
  format = 'YYYY-MM-DD HH:mm:ss',
  timeZone = getTimeZone(),
  utcSuffix = false,
) {
  switch (valueType) {
    case 'string':
      return momentToString(value, format, timeZone, utcSuffix);
    case 'secondTimestamp':
      return momentToSecond(value);
    case 'timestamp':
      return momentToMillisecond(value);
    case 'moment':
      return moment.isMoment(value) ? value : null;
    default:
      return null;
  }
}

/**
 * 日期字符串转moment对象
 * @description 项目中最常用的两种格式：2023-01-01、2023-01-01 01:01:01支持直接解析，其他格式需要传format参数
 * @param value 日期字符串
 * @param format 字符串格式
 * @param timeZone 时区，默认为当前所在的时区
 * @returns moment对象，如果入参是无效日期字符串，则返回null
 */
export function stringToMoment(value: string, format = 'YYYY-MM-DD HH:mm:ss', timeZone = getTimeZone()) {
  if (typeof value === 'undefined') {
    return value;
  }
  const res = moment(value, format).tz(timeZone);
  return res.isValid() ? res : null;
}

/**
 * 秒级时间戳转换成moment对象
 * @param value 秒级时间戳
 * @returns moment对象，如果入参不是一个integer，则返回null
 */
export function secondToMoment(value: number) {
  if (typeof value === 'undefined') {
    return value;
  }
  return Number.isInteger(value) ? moment.unix(value) : null;
}

/**
 * 毫秒级时间戳转换成moment对象
 * @param value 毫秒级时间戳
 * @returns moment对象，如果入参不是一个integer，则返回null
 */
export function millisecondToMoment(value: number) {
  if (typeof value === 'undefined') {
    return value;
  }
  return Number.isInteger(value) ? moment(value) : null;
}

/**
 * 其他类型（字符串/时间戳/秒级时间戳）转换成moment对象
 * @param value 字符串/时间戳/秒级时间戳数据
 * @param valueType 'string' | 'secondTimestamp' | 'timestamp' | 'moment'
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @param timeZone 时区，默认为当前所在的时区
 * @returns moment对象，如果入参不合规，则返回null
 */
export function valueToMoment(
  value: Moment | string | number,
  valueType: 'string' | 'secondTimestamp' | 'timestamp' | 'moment',
  format = 'YYYY-MM-DD HH:mm:ss',
  timeZone = getTimeZone(),
) {
  switch (valueType) {
    case 'string':
      return stringToMoment(value as string, format, timeZone);
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
 * @param timeZone 时区，默认为东八区(Asia/Shanghai)
 * @returns 格式化过的偏移量字符串，如UTC+08:00
 * @description 返回值的形式为UTC±[hh]:[mm]
 */
export function getUtcOffset(timeZone = getTimeZone()) {
  return moment().tz(timeZone).format('UTCZ');
}
