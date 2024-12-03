/**
 * 获取当前浏览器所在的时区
 * @returns 时区字符串，如Asia/Shanghai
 */
export default function getTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
