---
toc: content
title: 详情弹窗
order: 4
---

# 高度自适应弹窗

使用数组表单项来展示、修改数据是业务中很常见的场景。一般情况下，我们可以使用 Antd 提供的 FormList 来完成。但有一些复杂的场景，使用 FormList 并不能完全满足我们的需求，通常都需要结合 Table 和 Form 来实现具体的需求。Antd 虽然提供了可编辑表格的示例，但是只适用于单个 cell 或者单个 row，还需要用额外的状态来控制当前 cell 或者当前 row 是否可编辑。对于用户来说，频繁点击按钮来切换并不是那么习惯。所以为了方便使用，这里结合 Table 和 Form. List 封装了一个表格表单组件，实现了可编辑表格的功能，同时也能利用 Form 所提供的字段校验功能，较好的满足了我们所遇到的业务场景（Antd Pro 提供了功能更加强大的可编辑表格组件，但有一定的学习成本，所以项目中没有使用。如果有兴趣，可以看一下 Antd Pro 的实现方式）。

:::info{title=TIP}
由于组件利用了 Form. List 提供的能力实现了增、删功能，所以 column 的 `render` 方法用起来会和普通 Table 不一样，这一点可能会有一点理解上的成本，但如果你熟悉 FormList，那也能很快上手。具体来说， `render` 方法中的 `record` 参数，并不代表当前行的数据，如果你想获取当前行的数据，需要通过类似 `form.getFieldValue(['formTable', record.name, 'xxx'])` 这样的方式来获取。更加详细的区别，可以通过下面的组件示例来理解。
:::

## 示例

## API

### FormTable

| 属性  | 说明  | 类型  | 默认值 |
|-------|-------|-------|-------|
| `name` | form 所使用的 name | `string` \| `number` \| `Array<string \| number>` | - |
| `tableColumns` | table 需要的 columns | `Array<FormTableColumnType>` | - |
| `operateBtnsPosition` | 操作按钮（新增、批量删除）的位置 | `'top'` \| `'bottom'` | `'bottom'` |
| `operateBtnsNode` | 操作按钮 | `React.ReactNode` \| `(({ add, remove, move }: FormListOperation) => React.ReactNode)` | - |
| `tableProps` | table 的其他属性 | `Omit<TableProps<FormListFieldData>, 'rowKey' \| 'dataSource' \| 'columns'>` | `{ bordered: true, pagination: false }` |

### FormTableColumnType

这里先给出 `FormTableColumnType` 的完整定义：

```ts
type FormTableColumnType =
  | ({
    editable?: boolean;
    component?: React.ReactNode | ((record: FormListFieldData) => React.ReactNode);
    children?: Array<FormTableColumnType>;
  } & TableColumnType<FormListFieldData>)
  | (({ add, remove, move }: FormListOperation) => TableColumnType<FormListFieldData>);
```

需要注意的是 ` (({ add, remove, move }: FormListOperation) => TableColumnType<FormListFieldData>)` 这个定义，通常是用来设置操作列的，具体用法可参考上面的示例。

:::info{title=TIP}
从上面可以看出 `FormTableColumnType` 扩展自 Antd Table 的 column 属性，所以 column 能用的这里都支持。为了方便，下面只列出了扩展的属性
:::

| 属性  | 说明  | 类型  | 默认值 |
|-------|-------|-------|-------|
| `editable` | 是否可编辑，是则需要增加对应的编辑组件 | `boolean` | `false` |
| `component` | 可编辑列对应的组件， `editable` 为 true 时必须设置 | `React.ReactNode` \| `((record: FormListFieldData) => React.ReactNode)` | - |
