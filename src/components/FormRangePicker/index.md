---
toc: content
title: 表单时间段（moment）
order: 3
---

# 表单时间段

:::info{title=组件必要依赖（确保项目中已经安装）}
* `moment@^2.29.4`
* `moment-timezone^0.5.45`
:::

时间段选择是日常业务中常用的一个组件。和日期时间组件类似，Antd 的时间段组件所需要的是数据类型是 `Moment` 数组，不仅需要我们进行额外的数据类型转换，经常还需要将数组的 2 个元素分别赋值给对应的字段（比如 `create_time` 代表一个时间段，在提交时需要拆分成 `create_time_start` 和 `create_time_end` 两个字段），这个转换也是一个重复性工作。

为了解决这个问题，这里利用了 Form 的特性实现了字段自动拆分赋值的逻辑，并且增加了数据类型的转换，大大减少了重复性工作。

:::info{title=TIP}
组件通过 Form 的特性实现了字段拆分与赋值的逻辑，如果同时还想利用 Form 原有的字段校验功能，则必然会多出来一个用不到的字段。如：接口交互的时候，用的是 `create_time_start` 和 `create_time_end` 两个字段， `create_time` 这个字段我们并不关心，但 Form 需要用这个字段进行数据校验，所以最终从 Form 拿到的数据中有 `create_time` 这个不必要的字段。这就需要我们在最终提交数据的时候，去掉这个没用的字段，所以说*凡事都是有代价的*。不过不用担心，这个字段剔除功能我们也提供了相应的方法，你可以使用 `useValidatedFormValues` 来配合使用。
:::

## FormDatePicker

日期范围选择组件，如上面所说：不再需要手动进行数据类型转换和字段赋值，组件已经替你做了。其他参数的用法和 [DateTimePicker](/components/date-time-picker) 基本相同。

### 示例

<code src='./demo/formdatepicker-basic.tsx'></code>
<code src='./demo/formdatepicker-with-hook.tsx'></code>
<code src='./demo/formdatepicker-initialvalue.tsx'></code>
<code src='./demo/formdatepicker-timezone.tsx'></code>

### API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ----- | ------- |
| `initialValue` | 组件初始值 | `[string, string]` \| `[number, number]` \| `[Moment, Moment]` | `[undefined, undefined]` |
| `valueType` | 组件值的类型 | `'string'` \| `'secondTimestamp'` \| `'timestamp'` \| `'moment'` | `'string'` |
| `format` | 日期字符串格式化模版 | `string` | `'YYYY-MM-DD HH:mm:ss'` |
| `form` | Form 实例 | `FormInstance` | - |
| `fields` | 要拆分成的字段名称元组 | `[string, string]` | - |
| `label` | 组件对应的 label | `FormItemProps['label']` | - |
| `name` | 组件在 Form 中的 name（虽然有默认值，但推荐自己设置） | `FormItemProps['name']` | `${fields[0]}__${fields[1]}` |
| `showTime` | 是否增加时间数据展示 | `boolean` | `false` |
| `allowClear` | 是否允许清空 | `boolean` | `true` |
| `useStartAndEndOfDay` | 只展示日期时，是否格式化时间为一天的开始和结束（只有在 `showTime` 为 `false` 时生效），如2023-08-01～2023-08-02实际是为2023-08-01 00:00:00～2023-08-02 23:59:59 | `boolean` | `false` |
| `rules` | FormItem 的校验规则 | `FormItemProps['rules']` | - |
| `formItemLayout` | FormItem 的样式 | `{ labelCol: FormItemProps['labelCol']; wrapperCol: FormItemProps['wrapperCol'] }` | `{ labelCol: {xs: { span: 24 }, sm: { span: 4 }}, wrapperCol: {xs: {span: 24 }, sm: { span: 20 }}}` |
| `otherRangePickerProps` | Antd RangePicker 的其他属性 | `Omit<RangePickerProps, 'empty' \| 'defaultValue' \| 'onChange' \| 'format' \| 'showTime' \| 'allowClear'>` | - |
| `otherFormItemProps` | Antd FormItem 的其他属性 | `Omit<FormItemProps, 'labelCol' \| 'wrapperCol' \| 'label' \| 'initialValue' \| 'name' \| 'rules'>` | - |

## TimePicker

和上面的 `DatePicker` 类似，不过只支持了两种格式：一种是 `Moment` 类型，另一种则是时间字符串（ `string` ）。

### 示例

### API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ----- |
| `initialValue` | 组件初始值 | `[string, string]` \| `[number, number]` \| `[Moment, Moment]` | `[undefined, undefined]` |
| `valueType` | 组件值的类型 | `'string'` \| `'secondTimestamp'` \| `'timestamp'` \| `'moment'` | `'string'` |
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
