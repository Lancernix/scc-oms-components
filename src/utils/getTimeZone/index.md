---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: 获取当前时区 # 组件的标题，会在菜单侧边栏展示
order: 1
---

# 时区相关的方法

提供了一个方法： `getTimeZone` 用来获取当前浏览器所在的时区信息，会返回一个时区字符串。

:::info{title=TIP}
获取时区使用的是 JavaScript 内置的 `Intl.DateTimeFormat` 方法，需要注意这个方法的浏览器兼容性，ie这种比较老的是不支持的，具体可参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#browser_compatibility)，如有需要可自行进行 polyfill。
:::

## 示例

<code src='./demo/example-basic.tsx'></code>
