import type { Moment } from 'moment';
/**
 * moment对象转换成秒级时间戳
 * @param params moment对象
 * @returns 秒级时间戳，如果入参不是moment对象，则返回undefined
 */
export declare function momentToSecond(params: Moment): number;
/**
 * moment对象转换成时间戳
 * @param params moment对象
 * @returns 时间戳，如果入参不是moment对象，则返回undefined
 */
export declare function momentToMillisecond(params: Moment): number;
/**
 * moment对象转换成日期字符串
 * @param params moment对象
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @returns 日期字符串，如果入参不是moment对象，则返回undefined
 */
export declare function momentToString(params: Moment, format?: string): string;
/**
 * moment对象转换成其他类型（字符串/时间戳/秒级时间戳）
 * @param params moment对象
 * @param valueType 要转换成的数据类型
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @returns 期待的类型数据，如果入参不是moment对象，则返回undefined
 */
export declare function momentToValue(params: Moment, valueType: 'string' | 'secondTimestamp' | 'timestamp' | 'moment', format?: string): string | number | Moment;
/**
 * 日期字符串转moment对象
 * @description 项目中最常用的两种格式：2023-01-01、2023-01-01 01:01:01支持直接解析，其他格式需要传format参数
 * @param timeString 日期字符串
 * @param format 字符串格式
 * @returns moment对象，如果入参是无效日期字符串，则返回undefined
 */
export declare function stringToMoment(timeString: string, format?: string): Moment;
/**
 * 秒级时间戳转换成moment对象
 * @param params 秒级时间戳（通常为10位整数）
 * @returns moment对象，如果入参不是一个integer，则返回undefined
 */
export declare function secondToMoment(params: number): Moment;
/**
 * 时间戳转换成moment对象
 * @param params 时间戳（通常为13位整数）
 * @returns moment对象，如果入参不是一个integer，则返回undefined
 */
export declare function millisecondToMoment(params: number): Moment;
/**
 * 其他类型（字符串/时间戳/秒级时间戳）转换成moment对象
 * @param params 字符串/时间戳/秒级时间戳数据
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @returns moment对象，如果入参不合规，则返回undefined
 */
export declare function valueToMoment(params: Moment | string | number, format?: string): Moment;
declare const _default: {};
export default _default;
