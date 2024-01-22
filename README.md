# scc-oms-components

基于 Antd4 二次开发的常用组件、工具库，这样做的目的在于：

* 跨项目通用，避免重复开发，提高开发效率；
* 避免同一功能使用不同实现方式带来的 UI 不统一、代码维护性差的问题，保持较高的代码质量。

## 技术栈

* react ^16.9.0
* antd ~4.22.0
* styled-components
* lodash-es

## 开发构建工具

* pnpm
* dumi ^2
* father ^4

## 主要源码结构介绍

`src` 目录结构：

```bash
.
├── components # 组件目录
│   ├── DateTimePicker # 单个组件对应目录
│   │   ├── demo # （固定命名）文档所需组件demo，会在同级的index.md使用
│   │   │   ├── datepicker-secondtimestamp.tsx # 命名随便，建议使用语义化名称
│   │   │   ├── datepicker-string.tsx
│   │   │   ├── datepicker-timestamp.tsx
│   │   │   └── timepicker-string.tsx
│   │   ├── index.md # （固定命名）组件对应文档
│   │   └── index.tsx # （固定命名）组件源码
├── hooks # hooks目录（单个hook结构同上面的组件）
├── index.ts # 入口文件，所有的组件、方法、hooks都从这里导出
└── utils # 公共方法目录（单个方法结构同上面的组件）
```

由于文档本身就可以引用组件，所以在开发组件、hook、方法的时候，就可以完成对应的测试工作。你只需要 `pnpm start` 启动开发服务器，就可以实时查看你写的组件是否符合预期。

## 开发流程

```bash
# 安装依赖
pnpm install

# 开发&文档编写效果查看
pnpm start
```

如果是新的组件开发或者其他配置的修改，建议使用 `feature/xxx` 命名你的分支；如果是修复问题，建议使用 `bugfix/xxx` 命名你的分支。

## 发布流程

开发完成之后，先打一个测试包，在使用的业务系统中先验证一下，如果没问题，再发布正式包。

```bash
# 发布命令待补充

```

## 推荐插件

项目需要使用必要的插件来完成 lint 和格式化工作，强烈建议安装推荐的插件。详见[这里](./.vscode/extensions.json)。

## LICENSE

MIT
