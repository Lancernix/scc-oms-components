---
toc: content
title: 日期与时间（dayjs）
order: 4
---

# 日期与时间

:::info{title=组件必要依赖（确保项目中已经安装）}
* `dayjs@^1.11.11`
:::

Antd4 中使用的是 Moment 来处理日期时间的，这里使用 dayjs 替换了 Moment，目的是降低打包体积。同时为了方便使用，也增加了数据类型转换的功能。

## AntdDatePicker & AntdTimePicker

这两个组件可以看作是 Antd4 原生的组件，只是用 dayjs 替换了 Moment。如果你习惯用原生的，或者说下面封装的组件不满足你的场景，直接使用这个就行。

```ts
// 用法
import { AntdDatePicker, AntdTimePicker } from 'scc-oms-components';
```

## DatePicker

给组件赋值时，不仅支持 `Dayjs` 类型，还支持日期字符串（ `string` ）、毫秒级时间戳（ `timestamp` ）和秒级时间戳（ `secondTimestamp` ）。而从组件取值时，传入你需要的 `valueType` 属性，即可获取对应类型的数据。如果 `valueType` 为 `string` ，那么在国际化的场景中，还可能涉及到时区转换，组件也支持了这个场景。

### 示例

<code src="./demo/datepicker-string.tsx"></code>
<code src="./demo/datepicker-timestamp.tsx"></code>
<code src="./demo/datepicker-secondtimestamp.tsx"></code>
<code src="./demo/datepicker-timezone.tsx"></code>

:::info{title=TIP}
组件展示的日期时间都是在当前所在时区下的，并不会受到 `sourceTimezone` 、 `targetTimezone` 的影响，这两个属性会在传入值、接收值转换的时候起作用。这里有一个注意点：如果你设置了 `sourceTimezone` （比如东京时区，而当前你所在的时区是上海时区），在需要设置初始值的场景下，初始值也得是 `sourceTimezone` 下的时间（也就是你的初始值应该是东京时区下的时间）。这通常是符合业务场景的，API 接口接收和返回的时间一般都是同一个时区下的
:::

### API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | --- | ---- |
| `value` | 组件值 | `string` \| `number` \| `dayjs` | - |
| `valueType` | 从组件获取的值类型 | `'string'` \| `'secondTimestamp'` \| `'timestamp'` \| `'dayjs'` | `'dayjs'` |
| `onChange` | onChange 回调 | `(value: string \| number \| Dayjs, dayjsValue?: Dayjs) => void` | - |
| `format` | 日期字符串格式化模版 | `string` | `'YYYY-MM-DD'` |
| `sourceTimeZone` | value 来源时区 | `string` | 当前时区 |
| `targetTimeZone` | 目标转换时区 | `string` | 当前时区 |
| `useStartOfDay` | 当只有日期展示时，是否将时间默认为一天的开始 00:00:00（只有在 `showTime` 为 `false` 时生效，且此时需要注意你的 `format` 格式） | `boolean` | `false` |
| `useEndOfDay` | 当只有日期展示时，是否将时间默认为一天的结束 23:59:59（只有在 `showTime` 为 `false` 时生效，且此时需要注意你的 `format` 格式） | `boolean` | `false` |

## TimePicker

和上面的 `DatePicker` 类似，也有数据类型转换、根据时区转换等功能。

### 示例

<code src="./demo/timepicker-string.tsx"></code>
<code src="./demo/timepicker-timestamp.tsx"></code>
<code src="./demo/timepicker-secondtimestamp.tsx"></code>
<code src="./demo/timepicker-timezone.tsx"></code>

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | -----| ----- | ---- |
| `value` | 组件值 | `string` \| `number` \| `Dayjs` | - |
| `valueType` | 从组件获取的值类型 | `'string'` \| `'secondTimestamp'` \| `'timestamp'` \| `'dayjs'` | `'dayjs'` |
| `format` | 日期字符串格式化模版 | `string` | `'HH:mm:ss'` |
| `sourceTimeZone` | value 来源时区 | `string` | 当前时区 |
| `targetTimeZone` | 目标转换时区 | `string` | 当前时区 |
