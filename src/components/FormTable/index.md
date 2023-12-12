---
toc: content
title: 表格表单组件
order: 3
---

# 表格表单组件

使用数组表单项来展示、修改数据是业务中很常见的场景。一般情况下，我们可以使用 Antd 提供的 FormList 来完成。但有一些复杂的场景，使用 FormList 并不能完全满足我们的需求，通常都需要结合 Table 和 Form 来实现具体的需求。Antd 虽然提供了可编辑表格的示例，但是只适用于单个 cell 或者单个 row，还需要用额外的状态来控制当前 cell 或者当前 row 是否可编辑。对于用户来说，频繁点击按钮来切换并不是那么习惯。所以为了方便使用，这里结合 Table 和 Form. List 封装了一个表格表单组件，实现了可编辑表格的功能，同时也能利用 Form 所提供的字段校验功能，较好的满足了我们所遇到的业务场景（Antd Pro 提供了功能更加强大的可编辑表格组件，但有一定的学习成本，所以项目中没有使用。如果有兴趣，可以看一下 Antd Pro 的实现方式）。

:::info{title=TIP}
由于组件利用了 Form. List 提供的能力实现了增、删功能，所以 column 的 `render` 方法用起来会和普通 Table 不一样，这一点可能会有一点理解上的成本，但如果你熟悉 FormList，那也能很快上手。具体来说， `render` 方法中的 `record` 参数，并不代表当前行的数据，如果你想获取当前行的数据，需要通过类似 `form.getFieldValue(['formTable', record.name, 'xxx'])` 这样的方式来获取。更加详细的区别，可以通过下面的组件示例来理解。
:::

## 示例

<code src='./demo/example-basic.tsx'></code>
<code src='./demo/example-field-control.tsx'></code>
:::warning{title=record.name}
在通过 `record` 获取 Form 数据、增加或者删除数据的时候，请使用 `record.name` ，不需要使用 `record.key` ，这个只用于组件内部设置 Table 的 rowKey。
:::
<code src='./demo/example-nested-columns.tsx'></code>

## API

### FormTable

| 属性  | 说明  | 类型  | 默认值 |
|-------|-------|-------|-------|
| conte | conte | conte |       |

### FormTableColumnType

| 属性  | 说明  | 类型  | 默认值 |
|-------|-------|-------|-------|
| conte | conte | conte |       |
