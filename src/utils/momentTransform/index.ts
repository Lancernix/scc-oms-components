import type { Moment } from 'moment';
import moment from 'moment';

/**
 * moment对象转换成秒级时间戳
 * @param params moment对象
 * @returns 秒级时间戳，如果入参不是moment对象，则返回undefined
 */
export function momentToSecond(params: Moment) {
  return moment.isMoment(params) ? params.unix() : void 0;
}

/**
 * moment对象转换成时间戳
 * @param params moment对象
 * @returns 时间戳，如果入参不是moment对象，则返回undefined
 */
export function momentToMillisecond(params: Moment) {
  return moment.isMoment(params) ? params.valueOf() : void 0;
}

/**
 * moment对象转换成日期字符串
 * @param params moment对象
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @returns 日期字符串，如果入参不是moment对象，则返回undefined
 */
export function momentToString(params: Moment, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment.isMoment(params) ? params.format(format) : void 0;
}

/**
 * moment对象转换成其他类型（字符串/时间戳/秒级时间戳）
 * @param params moment对象
 * @param valueType 要转换成的数据类型
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @returns 期待的类型数据，如果入参不是moment对象，则返回undefined
 */
export function momentToValue(
  params: Moment,
  valueType: 'string' | 'secondTimestamp' | 'timestamp' | 'moment',
  format = 'YYYY-MM-DD HH:mm:ss',
) {
  switch (valueType) {
  case 'string':
    return momentToString(params, format);
  case 'secondTimestamp':
    return momentToSecond(params);
  case 'timestamp':
    return momentToMillisecond(params);
  case 'moment':
    return moment.isMoment(params) ? params : void 0;
  default:
    return momentToString(params, format);
  }
}

/**
 * 日期字符串转moment对象
 * @description 项目中最常用的两种格式：2023-01-01、2023-01-01 01:01:01支持直接解析，其他格式需要传format参数
 * @param timeString 日期字符串
 * @param format 字符串格式
 * @returns moment对象，如果入参是无效日期字符串，则返回undefined
 */
export function stringToMoment(timeString: string, format?: string) {
  const realFormat = format ?? 'YYYY-MM-DD HH:mm:ss';
  const res = moment(timeString, realFormat);
  return res.isValid() ? res : void 0;
}

/**
 * 秒级时间戳转换成moment对象
 * @param params 秒级时间戳（通常为10位整数）
 * @returns moment对象，如果入参不是一个integer，则返回undefined
 */
export function secondToMoment(params: number) {
  return Number.isInteger(params) ? moment.unix(params) : void 0;
}

/**
 * 时间戳转换成moment对象
 * @param params 时间戳（通常为13位整数）
 * @returns moment对象，如果入参不是一个integer，则返回undefined
 */
export function millisecondToMoment(params: number) {
  return Number.isInteger(params) ? moment(params) : void 0;
}

/**
 * 其他类型（字符串/时间戳/秒级时间戳）转换成moment对象
 * @param params 字符串/时间戳/秒级时间戳数据
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @returns moment对象，如果入参不合规，则返回undefined
 */
export function valueToMoment(params: Moment | string | number, format = 'YYYY-MM-DD HH:mm:ss') {
  if (typeof params === 'string') {
    return stringToMoment(params as string, format);
  }
  if (typeof params === 'number') {
    // 这里通过时间戳长度是否超过13位来判断是秒级还是毫秒级
    return params.toString().length < 13 ? secondToMoment(params) : millisecondToMoment(params);
  }
  return moment.isMoment(params) ? params : void 0;
}

export default {};
