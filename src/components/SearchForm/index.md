---
toc: content
title: 搜索表单
order: 8
---

# 搜索表单

带有基本样式的筛选项表单，常用于列表页的查询功能。减少了一些样板代码（比如不用写 `Form.Item` 、 `Col` 等基础的组件了），同时也尽可能保留了最大的自由度，你可以通过覆盖或者增加属性设置来满足你使用的场景。

## 示例

<code src='./demo/example-basic.tsx'></code>
<code src='./demo/example-responsive.tsx'></code>
组件默认的响应式配置为：

```ts
const colSpanMap = {
  960: 8, // 屏幕宽度大于960px时，每col占用8个span，即可以排列3个基本筛选项（小于960px时也会使用这个配置）
  1600: 6, // 屏幕宽度大于1600px时，每col占用6个span，即可以排列4个基本筛选项
  2400: 4, // 屏幕宽度大于2400px时，每col占用4个span，即可以排列6个基本筛选项
};
```

:::info{title=TIP}
默认的响应式配置比较符合我们日常用的几个分辨率，720p、1080p、>=2k，通常来说够用了
:::
<code src='./demo/example-extranode.tsx'></code>
<code src='./demo/example-custom.tsx'></code>

## API

### SearchForm

`SearchFormProps` 继承自 `FormProps` ，支持所有 Antd Form 的属性（除去 `onReset` ），为了组件能支持项目快速使用，有一些默认的样式或者属性设置，如果不符合你的使用场景，可以自定义。下面列出了自有的属性。

| 属性  | 说明  | 类型  | 默认值 |
|-------|-------|-------|-------|
| `items` | 表单项数组 | `FieldItem[]` | - |
| `onSearch` | 查询按钮的点击事件 | `(event?: React.MouseEvent<HTMLElement, MouseEvent>) => void` | - |
| `searchBtnProps` | 查询按钮的属性（没有 `onClick` 属性，由 `onSearch` 属性代替） | `Omit<ButtonProps, 'onClick'>` | - |
| `showSearchBtn` | 是否显示查询按钮 | `boolean` | `true` |
| `onReset` | 重置按钮的点击事件 | `(event?: React.MouseEvent<HTMLElement, MouseEvent>) => void` | - |
| `resetBtnProps` | 重置按钮的属性（没有 `onClick` 属性，由 `onReset` 属性代替） | `Omit<ButtonProps, 'onClick'>` | - |
| `showResetBtn` | 是否显示重置按钮 | `boolean` | `true` |
| `wrapperStyle` | 整个组件最外层的样式（ `true` 表示使用默认样式， `false` 表示不使用样式，也可以直接传入自定义样式对象） | `boolean` \| `CSSProperties` | `true` |
| `gutter` | 栅格间隔（用法和 Row 的 `gutter` 属性一样） | `RowProps['gutter']` | `[4, 4]` |
| `responsive` | col 是否支持响应式（ `true` 表示支持且使用默认的 span 设置， `false` 则表示不使用响应式且基础 col 的 span 固定为 6，如果默认的响应式 span 设置不合适，可以直接传入你想要的 span 对象） | `boolean` \| `Record<string, number>` | `true` |
| `collapsed` | 是否支持折叠筛选项（ `true` 表示折叠， `false` 表示不折叠，默认折叠展示一行，可以直接传入数字设置折叠状态下展示几行） | `boolean` \| `number` | `false` |
| `collapseBtnProps` | 折叠按钮的属性 | `ButtonProps` | - |
| `formItemMarginBottom` | 表单项的marginBottom | `string` \| `number` | `'8px'` |
| `extraOperateNode` | 操作col中额外的元素 | `React.ReactNode` | - |

### FieldItem

当前包括 `Input` 、 `Select` 、 `InputNumber` 、 `DatePicker` 、 `TimePicker` 、 `DateRangePicekr` 、 `TimeRangePicekr` 几个预设的表单项，其中，时间日期相关的并不是使用的 Antd 原生的组件，而是组件库中基于 dayjs 二次封装的组件（增加了格式转换，用起来更加方便了）。如果你需要自定义的组件，也支持了这样的操作。

`FieldItem` 是上述多个表单项类型定义组成的联合类型，且都继承自 `FormItemProps` 。

这里先说明一下 `FieldItem` 的通用属性。

| 属性  | 说明  | 类型  | 默认值 |
|-------|-------|-------|-------|
| `type` | 表单项的类型 | `input` \| `select` \| `inputNumber` \| `date` \| `time` \| `dateRange` \| `timeRange` \| `custom` | - |
| `multiCol` | 表单项占用的基础 col 倍数 | `number` | `1` （日期、时间范围组件是 `2` ） |

各个类型的表单项组件的属性都可以通过 `props` 属性设置，比如 `Input` 的 `placeholder` 属性， `Select` 的 `options` 属性等。

下面列一下当前支持的各个表单项组件的类型定义。

```ts
interface InputItem extends FormItemProps {
  type: 'input';
  multiCol?: number;
  props?: InputProps;
}

interface SelectItem extends FormItemProps {
  type: 'select';
  multiCol?: number;
  props: SelectProps;
}

interface InputNumberItem extends FormItemProps {
  type: 'inputNumber';
  multiCol?: number;
  props?: InputNumberProps;
}
interface DateItem extends FormItemProps {
  type: 'date';
  multiCol?: number;
  props?: DatePickerProps;
}
interface TimeItem extends FormItemProps {
  type: 'time';
  multiCol?: number;
  props?: TimePickerProps;
}

interface DateRangeItem extends FormItemProps {
  type: 'dateRange';
  multiCol?: number;
  props: FormDateRangePickerProps;
}

interface TimeRangeItem extends FormItemProps {
  type: 'timeRange';
  multiCol?: number;
  props: FormTimeRangePickerProps;
}

interface CustomItem extends FormItemProps {
  type: 'custom';
  multiCol?: number;
  /** 自定义表单项组件 */
  node: React.ReactNode;
}
```
