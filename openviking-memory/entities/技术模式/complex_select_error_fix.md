# 小区搜索页报错修复与基础库固定
泰兴小程序小区搜索页控制台报错已修复，并固定微信基础库版本。

## 改动要点
- `ZsPicker` 加固：空选项列表不再打开弹层，补充选中与变更时的边界保护。
- `complex-select` 调整：街道/社区筛选在无下级数据时禁用。
- `manifest.json` 微信基础库版本固定为 `3.7.12`。

## 验证与归属
- `npm run build:mp-weixin` 已通过；建议在微信开发者工具将调试基础库设为 3.7.12 复验。
- 涉及文件：`manifest.js`、`complex-select/index.vue`、`ZsPicker.vue`、`add.vue` 等。
- 来源会话ID：00ee464f-6344-4eec-b1c8-cf79bb259d7b；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_select_error_fix",
  "source_extraction_id": "51cb70092e4e466f85cae7370abe915c",
  "version": 1,
  "memory_type": "entities"
}
-->