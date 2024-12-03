---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: 属性递归移除 # 组件的标题，会在菜单侧边栏展示
order: 2
---

# 指定属性递归移除

快速删除对象中指定的属性，如果有嵌套的对象或者对象数组，也会检查是否有指定属性，并进行删除。

## 函数定义

```ts
/**
 * 递归删除对象中指定的某个key或者某些key
 * @param obj - 待处理的对象
 * @param name - 指定要删除的属性名，支持传入字符串或数组
 * @returns 返回处理后的对象
 */
function removeSomeProperty<T extends Record<string, unknown>>(obj: T, name: string | string[]): Partial<T>
```

## 示例

比如我们现在有一个对象：

```ts
const obj = {
  a: 1,
  b: [
    { a: 2, d: 3 },
    { e: 4, f: { a: 5 } },
  ],
};
```

调用方法删除其中名为 `a` 的属性（ `(removeSomeProperty(obj, 'a')` ），结果如下：

```ts
const res = {
  b: [{ d: 3 }, { e: 4, f: {} }],
};
```

**方法的第二个参数支持传入字符串或数组，也就是说可以一次删除多个属性**。

比如调用方法删除其中名为 `e` 和 `d` 的属性（ `(removeSomeProperty(obj, ['e', 'd'])` ），结果如下：

```ts
const res = {
  a: 1,
  b: [{ a: 2 }, { f: { a: 5 } }],
};
```
