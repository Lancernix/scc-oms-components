# scc-oms-components

基于 Antd4 二次开发的常用组件、工具库，这样做的目的在于：

* 跨项目通用，避免重复开发，提高开发效率；
* 避免同一功能使用不同实现方式带来的 UI 不统一、代码维护性差的问题，保持较高的代码质量。

## 主要依赖

* react ^16.9.0
* antd ~4.22.0
* styled-components
* lodash-es
* moment
* dayjs

> 项目在使用组件库的时候，moment、dayjs 选择其一就可以了。这里使用 dayjs 是替换了 Antd 中日期、时间、日历等组件默认使用的 moment，以降低打包体积。如果你不需要，那就不用安装 dayjs。

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

由于文档本身就可以引用组件，所以在开发组件、hook、方法的时候，就可以完成对应的测试工作。你只需要 `pnpm run start` 启动开发服务器，就可以实时查看你写的组件是否符合预期。

## 开发流程

由于构建文档时的网络限制，组件库需要使用私有源： `https://artifactory.sf-express.com/artifactory/api/npm/npm/` ，但由于另外的一些原因，组件库发包必须发到官方源，这里会有一点变扭，但是暂时没有更好的解决办法。所以有一些注意事项：

* **安装依赖时必须切换切换到上面的私有源**
* **在发包时则需要切换到官方源**

```bash
# 安装依赖
pnpm --registry https://artifactory.sf-express.com/artifactory/api/npm/npm/ install

# 开发&文档编写效果查看
pnpm start
```

如果是新的组件开发或者其他配置的修改，建议使用 `feature/xxx` 命名你的分支；如果是修复问题，建议使用 `bugfix/xxx` 命名你的分支。

## 兼容性

组件库兼容列表如下：

* chrome: 49
* firefox: 64
* safari: 10
* edge: 14
* ios: 10

如果不满足你当前业务系统的要求，可自行进行降级处理。

> 这里只进行了 ES 语法的降级，如果你需要同时进行 ES api 的 polyfill，请在项目中使用 corejs 等相关的库来完成此项流程。

## 发布流程

开发完成之后，先用开发分支打一个测试包，在使用的业务系统中先验证一下。如果没问题，则可以将开发分支合并到 `master` 分支，然后发布正式包。**这一步骤有一个脚本 `release.js` 来协助处理，建议使用脚本**。

举个例子（假设当前线上稳定版本为 **0.1.0**，你现在要新增一个组件）：

1. 流程开始
2. 从 `master` 拉一个新的开发分支 `feature/xxx`，coding
3. 完成之后，在当前开发分支执行 `pnpm run release`，会发布一个对应的测试版本，此时版本号更新为 **0.2.0-beta.0**
4. 功能验证
    - 验证不通过，则在开发分支进行fix，然后发布新的测试版本，版本号更新为 **0.2.0-beta.1**
    - 验证通过，则可以切换到 `master` 分支，并将开发分支合并到 `master` 分支
5. 在 `master` 分支执行 `pnpm run release`，发布正式版本，版本号更新为 **0.2.0**
6. 流程结束

## 推荐插件

项目需要使用必要的插件来完成 lint 和格式化工作，强烈建议安装推荐的插件。详见[这里](./.vscode/extensions.json)。

## 发版流程

待补充

## LICENSE

MIT
