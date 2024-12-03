---
toc: content
title: 表单时间段（dayjs）
order: 5
---

# 表单时间段

:::info{title=组件必要依赖（确保项目中已经安装）}
* `dayjs@^1.11.11`
:::

时间段选择是日常业务中常用的一个组件。和日期时间组件类似，Antd 的时间段组件所需要的是数据类型是 `Dayjs` 数组，不仅需要我们进行额外的数据类型转换，经常还需要将数组的 2 个元素分别赋值给对应的字段（比如 `create_time` 代表一个时间段，在提交时需要拆分成 `create_time_start` 和 `create_time_end` 两个字段），这个转换也是一个重复性工作。

为了解决这个问题，这里利用了 Form 的特性实现了字段自动拆分赋值的逻辑，并且增加了数据类型的转换，大大减少了重复性工作。

:::info{title=TIP}
组件通过 Form 的特性实现了字段拆分与赋值的逻辑，如果同时还想利用 Form 原有的字段校验功能，则必然会多出来一个用不到的字段。如：接口交互的时候，用的是 `create_time_start` 和 `create_time_end` 两个字段， `create_time` 这个字段我们并不关心，但 Form 需要用这个字段进行数据校验，所以最终从 Form 拿到的数据中有 `create_time` 这个不必要的字段。这就需要我们在最终提交数据的时候，去掉这个没用的字段，所以说*凡事都是有代价的*。不过不用担心，这个字段剔除功能我们也提供了相应的方法，你可以使用 `useValidatedFormValues` 来解决这个问题。
:::

## FormDateRangePicker

日期范围选择组件，之前的思路（见下面的 `FormDatePicker` ）是将 RangePicker 对应的 FormItem 也封装进去，但是这样会导致这个组件和其他的表单组件用法差距有点大，在其他组件中使用这个组件的时候，还需要进行特殊处理。所以这里改变了一下思路，只传一个 form 实例进去，FormItem 就不封进去了，这样能够尽量保证和其他表单组件的一致性。不过由于 form 是一个必选的属性，所以只能在 Form 中使用（RangePicker 本身绝大多数情况也是用来表单提交的，所以这里问题也不大），如果有不适用的场景，那使用原生的 RangePicker 就可以了。

:::info{title=TIP}
**组件初始值只能是 `Dayjs` 类型**。这里有两个考虑：
* 初始值支持三种类型：由于时间戳和秒级时间戳都是 number 类型，没有很好的办法来判断组件的 value 应该使用哪种类型来做转换，所以不太行
* 初始值类型和 valueType 保持一致：好处是接口传回来的值不用转换直接用，但是如果初始值是页面设置的话（比如最近 2 天）还需要将 Dayjs 转成字符串，做不到所有情况都不用转换

所以就用 Dayjs 类型吧，有些情况就是需要转换
:::

### 示例

<code src='./demo/formdaterangepicker-basic.tsx'></code>
<code src='./demo/formdaterangepicker-timestamp.tsx'></code>
<code src='./demo/formdaterangepicker-secondtimestamp.tsx'></code>
<code src='./demo/formdaterangepicker-string.tsx'></code>
<code src='./demo/formdaterangepicker-timezone.tsx'></code>

### API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ----- | ------- |
| `fieldValueType` | 组件值的类型 | `'string'` \| `'secondTimestamp'` \| `'timestamp'` \| `'dayjs'` | `'dayjs'` |
| `format` | 日期字符串格式化模版 | `string` | `'YYYY-MM-DD HH:mm:ss'` |
| `form` | Form 实例 | `FormInstance` | - |
| `fields` | 要拆分成的字段名称元组 | `[NamePath, NamePath]` | - |
| `showTime` | 是否增加时间数据展示 | `RangePickerDateProps<Dayjs>['showTime']` | `false` |
| `useStartAndEndOfDay` | 只展示日期时，是否格式化时间为一天的开始和结束（只有在 `showTime` 为 `false` 时生效），如2023-08-01～2023-08-02实际是为2023-08-01 00:00:00～2023-08-02 23:59:59 | `boolean` | `false` |
| `targetTimeZone` | 目标转换时区 | `string` | 当前所在时区 |

## FormTimeRangePicker

时间范围选择组件，和上面的 `FormDateRangePicker` 组件实现思路相同。

### 示例

<code src='./demo/formtimerangepicker-basic.tsx'></code>
<code src='./demo/formtimerangepicker-timestamp.tsx'></code>
<code src='./demo/formtimerangepicker-secondtimestamp.tsx'></code>
<code src='./demo/formtimerangepicker-string.tsx'></code>
<code src='./demo/formtimerangepicker-timezone.tsx'></code>

### API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ----- | ------- |
| `fieldValueType` | 组件值的类型 | `'string'` \| `'secondTimestamp'` \| `'timestamp'` \| `'dayjs'` | `'dayjs'` |
| `format` | 日期字符串格式化模版 | `string` | `'HH:mm:ss'` |
| `form` | Form 实例 | `FormInstance` | - |
| `fields` | 要拆分成的字段名称元组 | `[NamePath, NamePath]` | - |
| `targetTimeZone` | 目标转换时区 | `string` | 当前所在时区 |

## ~~FormDatePicker（已废弃）~~

:::warning{title=TIP}
不再推荐使用，建议使用上面的 `FormDateRangePicker` ，功能还是正常的，但是不再会有更新和优化了
:::

### 示例

<code src='./demo/formdatepicker-basic.tsx'></code>
<code src='./demo/formdatepicker-with-hook.tsx'></code>
<code src='./demo/formdatepicker-initialvalue.tsx'></code>
<code src='./demo/formdatepicker-timezone.tsx'></code>

### API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ----- | ------- |
| `initialValue` | 组件初始值 | `[string, string]` \| `[number, number]` \| `[Dayjs, Dayjs]` | `[undefined, undefined]` |
| `valueType` | 组件值的类型 | `'string'` \| `'secondTimestamp'` \| `'timestamp'` \| `'dayjs'` | `'string'` |
| `format` | 日期字符串格式化模版 | `string` | `'YYYY-MM-DD HH:mm:ss'` |
| `form` | Form 实例 | `FormInstance` | - |
| `fields` | 要拆分成的字段名称元组 | `[string, string]` | - |
| `label` | 组件对应的 label | `FormItemProps['label']` | - |
| `name` | 组件在 Form 中的 name（虽然有默认值，但推荐自己设置） | `FormItemProps['name']` | `${fields[0]}__${fields[1]}` |
| `showTime` | 是否增加时间数据展示 | `RangePickerDateProps<Dayjs>['showTime']` | `false` |
| `allowClear` | 是否允许清空 | `boolean` | `true` |
| `useStartAndEndOfDay` | 只展示日期时，是否格式化时间为一天的开始和结束（只有在 `showTime` 为 `false` 时生效），如2023-08-01～2023-08-02实际是为2023-08-01 00:00:00～2023-08-02 23:59:59 | `boolean` | `false` |
| `rules` | FormItem 的校验规则 | `FormItemProps['rules']` | - |
| `formItemLayout` | FormItem 的样式 | `{ labelCol: FormItemProps['labelCol']; wrapperCol: FormItemProps['wrapperCol'] }` | `{ labelCol: {xs: { span: 24 }, sm: { span: 4 }}, wrapperCol: {xs: {span: 24 }, sm: { span: 20 }}}` |
| `otherRangePickerProps` | Antd RangePicker 的其他属性 | `Omit<RangePickerProps, 'empty' \| 'defaultValue' \| 'onChange' \| 'format' \| 'showTime' \| 'allowClear'>` | - |
| `otherFormItemProps` | Antd FormItem 的其他属性 | `Omit<FormItemProps, 'labelCol' \| 'wrapperCol' \| 'label' \| 'initialValue' \| 'name' \| 'rules'>` | - |

## ~~FormTimePicker（已废弃）~~

:::warning{title=TIP}
不再推荐使用，建议使用上面的 `FormTimeRangePicker` ，功能还是正常的，但是不再会有更新和优化了
:::

和上面的 `FormDatePicker` 类似，不过只支持了两种格式：一种是 `Dayjs` 类型，另一种则是时间字符串（ `string` ）。

### API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ----- |
| `initialValue` | 组件初始值 | `[string, string]` \| `[number, number]` \| `[Dayjs, Dayjs]` | `[undefined, undefined]` |
| `valueType` | 组件值的类型 | `'string'` \| `'secondTimestamp'` \| `'timestamp'` \| `'dayjs'` | `'string'` |
| `format` | 日期字符串格式化模版 | `string` | `'YYYY-MM-DD HH:mm:ss'` |
| `form` | Form 实例 | `FormInstance` | - |
| `fields` | 要拆分成的字段名称元组 | `[string, string]` | - |
| `label` | 组件对应的 label | `FormItemProps['label']` | - |
| `name` | 组件在 Form 中的 name（虽然有默认值，但推荐自己设置） | `FormItemProps['name']` | `${fields[0]}__${fields[1]}` |
| `allowClear` | 是否允许清空 | `boolean` | `true` |
| `rules` | FormItem 的校验规则 | `FormItemProps['rules']` | - |
| `formItemLayout` | FormItem 的样式 | `{ labelCol: FormItemProps['labelCol']; wrapperCol: FormItemProps['wrapperCol'] }` | `{ labelCol: {xs: { span: 24 }, sm: { span: 4 }}, wrapperCol: {xs: {span: 24 }, sm: { span: 20 }}}` |
| `otherRangePickerProps` | Antd RangePicker 的其他属性 | `Omit<RangePickerProps, 'empty' \| 'value' \| 'defaultValue' \| 'onChange' \| 'format' \| 'showTime' \| 'allowClear'>` | - |
| `otherFormItemProps` | Antd FormItem 的其他属性 | `Omit<FormItemProps, 'labelCol' \| 'wrapperCol' \| 'label' \| 'initialValue' \| 'name' \| 'rules'>` | - |
