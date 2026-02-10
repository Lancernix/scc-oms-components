---
toc: content # 导航在内容区才显示,在左侧导航栏不显示
title: 判断时区是否有效 # 组件的标题,会在菜单侧边栏展示
order: 2
---

# 判断时区字符串是否有效

用来判断一个时区字符串是否为有效的 IANA 时区标识符。

:::info{title=TIP}
时区验证使用的是 JavaScript 内置的 `Intl.DateTimeFormat` 方法,需要注意这个方法的浏览器兼容性,ie 这种比较老的是不支持的,具体可参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#browser_compatibility),如有需要可自行进行 polyfill。
:::

## 函数定义

```ts
/**
 * 判断时区字符串是否有效
 * @param timeZone 时区字符串,如 'Asia/Shanghai', 'America/New_York'
 * @returns 是否为有效的时区字符串
 */
function isValidTimeZone(timeZone: string): boolean
```

## 示例

<code src="./demo/example-basic.tsx"></code>

## 参数说明

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| timeZone | 时区字符串 | string | - |

## 返回值

| 类型 | 说明 |
| --- | --- |
| boolean | 时区字符串是否有效 |

## 使用场景

- 用户输入时区时进行验证
- 在使用时区前确保其有效性
- 配合 `getTimeZone` 使用,验证获取到的时区
