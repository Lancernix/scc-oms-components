---
toc: content
title: 表格按钮
order: 1
---

# 表格按钮

一个带有二次确认的按钮组件，主要用于 Table 组件的操作列（这里固定了 Button 的 `type` 属性，无法修改）。

## 示例

<code src='./demo/example-basic.tsx'></code>
<code src='./demo/example-btn-group.tsx'></code>

## API

这里只列出扩展的属性，组件本身支持透传 Antd Button 的大部分属性，这部分可以参考 Antd 官方文档。

| 属性  | 说明  | 类型  | 默认值 |
|-------|-------|-------|-------|
| `withConfirm` | 是否增加二次确认逻辑 | `boolean` | `false` |
| `popconfirmTitle` | popconfirm 的 title | `PopconfirmProps['title']` | `'确定执行该操作吗？'` |
| `popconfirmOkText` | popconfirm 确认按钮的文本 | `React.ReactNode` | `'确定'` |
| `popconfirmCancelText` | popconfirm 取消按钮的文本 | `React.ReactNode` | `'取消'` |
