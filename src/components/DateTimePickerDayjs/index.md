---
toc: content
title: 日期与时间（dayjs）
order: 4
---

# 日期与时间

Antd 中日期、时间相关的组件在进行数据赋值和获取的时候都是 `Moment` 类型，需要我们进行额外的数据类型转换。为了节省自己写这个转换逻辑的时间，在原有的组件上增加了对于数据格式的转换逻辑。其他特性和 Antd 原有组件保持一致。

## DatePicker

给组件赋值时，不仅支持原有的 `Moment` 类型，还支持日期字符串（ `string` ）、毫秒级时间戳（ `timestamp` ）和秒级时间戳（ `secondTimestamp` ）。而从组件取值时，传入你需要的 `valueType` 属性，即可获取对应类型的数据。

### 示例

<code src="./demo/datepicker-string.tsx"></code>
<code src="./demo/datepicker-timestamp.tsx"></code>
<code src="./demo/datepicker-secondtimestamp.tsx"></code>

### API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | --- | ---- |
| `value` | 组件值 | `string` \| `number` \| `Moment` | - |
| `valueType` | 从组件获取的值类型 | `'string'` \| `'secondTimestamp'` \| `'timestamp'` \| `'moment'` | `'string'` |
| `format` | 日期字符串格式化模版 | `string` | `'YYYY-MM-DD HH:mm:ss'` |

## TimePicker

和上面的 `DatePicker` 类似，不过只支持了两种格式：一种是 `Moment` 类型，另一种则是时间字符串（ `string` ）。

### 示例

<code src="./demo/timepicker-string.tsx"></code>

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | -----| ----- | ---- |
| `value` | 组件值 | `string` \| `Moment` | - |
| `valueType` | 从组件获取的值类型 | `'string'` \| `'moment'` | `'string'` |
| `format` | 日期字符串格式化模版 | `string` | `'HH:mm:ss'` |
