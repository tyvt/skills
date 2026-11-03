# uni-app 条件编译同名 import 触发 ESLint 重复声明
苏住房C小程序提交时 pre-commit 的 ESLint 报重复定义，根因是 uni-app 条件编译块里同名 import 被静态分析误判，需抽单一实例模块按平台赋值。

## 现象与根因
- 提交时 pre-commit ESLint 报重复定义，报错文件 echarts-uniapp.vue，但代码在微信开发者工具能正常编译运行
- 组件用 #ifdef MP / #ifndef MP 条件编译，两分支各写一句 import echarts，运行时只留一支；ESLint 不识别条件编译指令，把两份声明当同作用域重复声明
- ESLint 纯静态分析看不到 uni-app 编译期裁剪，条件编译块出现同名 import/const/let 必误报

## 解决方案
- 把平台相关依赖下沉到独立实例模块（如 echarts-instance.js），模块内只写一次 let echarts，内部条件编译按平台赋值并默认导出
- 组件侧统一 import echarts from './echarts-instance.js'，不再出现条件编译包裹的声明
- 所有「两端/多端实现不同」依赖（echarts、原生桥接、SDK）都走此模式；遇 pre-commit 被拦且报错指向条件编译文件时优先重构，不加 eslint-disable 掩盖

## 验证与归属
- 会话 da028f64：从泰兴小程序迁移阳光物业/共有资金功能后 pre-commit ESLint 报错，根因 echarts-uniapp.vue 两处 echarts 声明被判重复；新增 echarts-instance.js 单一声明后通过
- 涉及文件：echarts-uniapp.vue、echarts-instance.js、pages.json；代码基线 77666f8

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "uniapp_conditional_import",
  "source_extraction_id": "81652a109a2b411098a21d593e97f48f",
  "version": 1,
  "memory_type": "entities"
}
-->