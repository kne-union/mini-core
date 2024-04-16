<img title="" src="https://www.kne-union.top/static-data/mini-core/index.jpg" alt="" style="margin: 2em auto;display: block; width: 200px; height: 200px">

***mini-core*** 是一个Taro的高级组件库，它有别于 ***@kne/antd-taro*** 只提供简单的UI交互组件，它旨在解决toB类小程序应用中的复杂场景问题，例如：

1. 主题色问题
2. Layout问题
3. 弹出页面问题
4. 表单问题
5. 列表下拉加载问题
6. 详情页展示问题
7. 筛选项问题
8. 登录用户信息问题
9. 显示项权限问题
10. 枚举值问题
11. 服务器获取数据及接口管理问题
12. 解决了项目中的components开发及调试问题

它按照目前主流的形式解决了以上问题，可以作为一个应用的底层。
它提供了相对较大的组件粒度，也对应用做出了一定程度的规范。使用它能快速构建这一类型的小程序。
它提供了一个components的开发及调试环境和文档编写规范，可以使项目拥有一个良好的组件开发流程和规范，避免和业务混淆在一起

#### 使用脚手架

1. 执行初始化命令

```shell
npx @kne/npm-tools init [project-name]
```

2. 选择 WeChat Miniprogram Project 模板

3. 执行启动命令

```shell
npm run start
```


#### 示例程序的使用

1. 新建components目录
2. 新建文件 项目根目录/temp/config/alias.js 并添加
3. 按照examples规则在doc文件夹下完成对应的示例程序
4. 执行npm run start
5. 在小程序调试工具中打开 项目根目录/example 进行组件示例调试

```js
module.exports = {
    '@components': require.resolve('../../src/components'),
};
```

#### 最佳实践

我们推荐把所有复杂逻辑都封装成组件放在components文件夹里，并且在doc里面完成对应的文档和示例，在pages里面调用时只包含简单的组件组合以及少量参数的传递。不要把业务写在pages里面，因为那通常不可维护。

把组件里面的api调用参数及逻辑全部放在项目的preset.js里面。

在开发阶段，通过mock接口数据来完成components里面具体业务组件的编写，不要硬依赖后端api。

components内的组件命名尽量可以看出派生关系和业务所属。
