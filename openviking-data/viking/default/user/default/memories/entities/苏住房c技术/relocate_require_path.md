# 分包体积优化脚本未改 require 路径
苏住房C 构建脚本把 z-paging 复制进分包后未重写 require 路径，致分包启动报 module not defined。

## 问题现象
- 为压主包体积用脚本把 z-paging 从主包 relocate 到各分包（pages_transaction、pages_main、pages_owner_extra）
- 构建产物跑通，真机/开发者工具一进分包页面就崩：Error: module 'pages_transaction/common/vendor.js' is not defined, require args is '../../../../common/vendor.js'

## 根因
- uni-app 编译产物里每个分包页面模块用相对路径 require 主包 common/vendor.js，相对层级按源码树原始位置生成
- 脚本只做文件拷贝，被搬过去的 .js 仍保留原层级 ../../../../，在分包解析成不存在的 foo/common/vendor.js

## 解决方案
- relocate 脚本必须两步：拷贝 + 重写依赖路径，遍历目标分包内该组件全部 .js，把 common/vendor.js 的 require 路径按新深度改成真正指向主包
- 脚本要支持对「已构建产物」二次执行修补（主包那份已删除时也要能跑，否则只能整包重建）
- 修完在开发者工具重新编译，必要时先清缓存

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 498170bd 用户贴完整运行时错误栈（VM57 WASubContext, lib 3.7.12），结论定位为 relocate-z-paging.mjs 拷贝后未更新 require 路径，已改造脚本支持拷贝后动态修正+对已构建产物重新修补，dist 下三个分包均已修正
- 涉及文件：scripts/relocate-z-paging.mjs、scripts/relocate-datetime-picker.mjs、scripts/validate-dist.mjs、package.json
- 所属项目：苏住房C；来源会话ID：498170bd-f084-43ab-8e01-034612613ebd；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "relocate_require_path",
  "source_extraction_id": "d03b04d8de7b4dfa8319ee812c43be64",
  "version": 1,
  "memory_type": "entities"
}
-->