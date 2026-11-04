# 分包easycom组件vendor.js路径多算一层
苏住房C 小程序 easycom 编译进分包的 uni-icons 产物相对 require 引用 common/vendor.js 层数多算，需构建后补丁脚本自动修复。

## 问题现象与根因
- 页面报 Error: module 'pages_main/common/vendor.js' is not defined, require args 为 '../../../../../common/vendor.js'
- 根因：uni-icons 被 easycom 编译进分包后产物仍相对引用 common/vendor.js，从分包 node-modules 往上算层数落到分包内错误路径，而 vendor.js 实际在主包

## 解决方案
- 新增 scripts/relocate-uni-icons.mjs，扫描分包 uni-icons 产物，把 vendor.js 相对引用改为主包正确层数（本次 ../../../../../ → ../../../../../../）
- 在 vite.config.ts closeBundle 钩子自动执行该脚本，每次构建自动打补丁
- 脚本先对当前 dist 跑一次修掉 pages_main/pages_owner/pages_owner_extra 三处
- 同类套路参照 relocate-datetime-picker.mjs、relocate-z-paging.mjs，新增第三方组件打进分包照抄
- 改完必须停 dev server 重新 npm run dev，微信开发者工具点编译/重新载入，热更新看不到效果

## 验证与归属
- 验证：会话 829a9465 用户贴出 uni-icons module not defined 报错；已修复三处分包；验证证据：src=苏住房C/058.md
- 涉及文件：scripts/relocate-uni-icons.mjs、vite.config.ts、scripts/relocate-datetime-picker.mjs、scripts/relocate-z-paging.mjs
- 所属项目：苏住房C；来源会话ID：829a9465-5450-4144-a178-49e21c221320；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "uni_icons_vendor_path",
  "source_extraction_id": "6d2d014529be465fbbb01ab3f8d573a9",
  "version": 2,
  "memory_type": "entities"
}
-->