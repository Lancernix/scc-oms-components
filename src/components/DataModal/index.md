---
toc: content
title: 数据弹窗
order: 6
---

# 数据弹窗

弹窗在日常业务中是很常见的数据展示形式，比如一条数据的详情展示、新数据的创建等。但单次数据的规模大小、不同设备分辨率不同，会对系统的 UI 产生一些不好的影响（如弹窗内容过多，但没有设置内容区域滚动，导致弹窗超出当前窗口高度，出现了全局滚动条等）。针对业务中弹窗的使用场景，这个组件提供了比较统一的交互逻辑和 UI 展现，同时也封装了一些重复性的逻辑，帮大家省出一点点的时间。

:::info{title=TIP}
除去 `width` 、 `footer` 两个属性由其他的自定义属性替代，Antd Modal 的其他所有属性都是支持的，最大限度保持原生组件的属性透传。
:::

## 示例

<code src='./demo/example-basic.tsx'></code>
<code src='./demo/example-nofooter.tsx'></code>
<code src='./demo/example-noscroll.tsx'></code>
<code src='./demo/example-extra-footer.tsx'></code>
<code src='./demo/example-custom-footer.tsx'></code>

## API

这里同样只列出扩展的属性，透传的属性请参考 Antd Modal 的文档。

| 属性  | 说明  | 类型  | 默认值 |
|-------|-------|-------|-------|
| `type` | 弹窗状态（这个属性可以帮你设置弹窗的 title，如果你不需要直接设置 `title` 属性覆盖即可） | `'view'` \| `'edit'` \| `'create'` \| `'copy'` | - |
| `size` | 弹窗的大小，替代了 width 属性（尺寸设置: xl-1360px \| l-1120px \| m-880px \| s-640px \| xs-400px） | `'xl'` \| `'l'` \| `'m'` \| `'s'` \| `'xs'` | `'m'` |
| `onReset` | 重置按钮的回调 | `(e?: React.MouseEvent<HTMLElement, MouseEvent>) => void` | - |
| `resetText` | 重置按钮的展示文本（ `view` 状态下没有重置按钮） | `React.ReactNode` | `'重置'` |
| `contentScrollY` | 内容区域是否竖向滚动 | `boolean` | `true` |
| `showFooter` | 是否展示弹窗底部区域 | `boolean` | `true` |
| `extraFooter` | 底部额外的内容（只有在 `showFooter` 为 true 时才有效） | `React.ReactNode` | - |
| `customFooter` | 自定义底部内容，如果想覆盖默认的footer，则可以使用这个属性（同样只有在 `showFooter` 为 true 时才有效） | `React.ReactNode` | - |
