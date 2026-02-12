/**
 * 判断时区字符串是否有效
 * @param timeZone 时区字符串,如 'Asia/Shanghai', 'America/New_York'
 * @returns 是否为有效的时区字符串
 */
export default function isValidTimeZone(timeZone: string): boolean {
  if (!timeZone || typeof timeZone !== 'string') {
    return false;
  }

  try {
    Intl.DateTimeFormat(undefined, { timeZone });
    return true;
  } catch (error) {
    return false;
  }
}
