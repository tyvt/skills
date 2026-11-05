# uni-icons 分包路径修复
苏住房C 小程序修复 uni-icons 因分包路径解析导致 vendor.js 引用错误的问题，新增构建补丁脚本。

## 问题原因
- uni-icons 通过 easycom 打入分包后，JS 仍写 require("./../../../../common/vendor.js")
- 从分包内往上 6 层落到分包 common/vendor.js，而实际在主包 common/vendor.js，导致报错
- 涉及分包：pages_main、pages_owner、pages_owner_extra

## 修复方案
- 新增 scripts/relocate-uni-icons.mjs 扫描所有分包 uni-icons，将 vendor.js 引用改为主包正确相对路径
- vite.config.ts 在 closeBundle 钩子自动执行该脚本
- 已对当前 dist 执行补丁，3 个分包均已修复

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：scripts/relocate-uni-icons.mjs、vite.config.ts、各分包内 uni-icons
- 来源会话ID：829a9465-5450-4144-a178-49e21c221320
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "uni_icons_relocate",
  "source_extraction_id": "87e33cf0079f4bbcb47a8d1b6a3d7a99",
  "version": 1,
  "memory_type": "entities"
}
-->