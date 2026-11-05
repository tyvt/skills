# 实名认证跳过证件选择页
苏住房C（zhi2-mobile-shimin）的实名认证入口已改为跳过证件类型选择页，直接进入姓名+证件号码输入页（FormLocal）。

## 变更内容
- `zhi2-mobile-shimin/src/utils/index.js` 中 `shouldSkipIdTypeChoose()` 由 `import.meta.env.PROD` 改为始终 `return true`，注释已同步更新
- `getRealNameEntryUrl()` → `/pages_my/verification/FormLocal`
- `getRealNameEntryRelativeUrl()` → `FormLocal`

## 影响范围
- 个人中心「前往实名」、未实名引导页、人工审核失败页重试等入口均直达姓名+证件号码页
- 旧链接打开 `TypeChoose` / `FormNonLocal` 时，`onLoad` 仍会重定向到 `FormLocal`

## 验证与归属
- 建议在微信开发者工具从「个人中心 → 前往实名」走一遍，确认不再出现「居民身份证 / 非居民身份证」选择页
- 涉及文件：src/utils/index.js、TypeChoose.vue、FormLocal.vue
- 所属项目：苏住房C；来源会话ID：6e25ee6f-ffc6-40be-bf9d-065779c41cdc

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "realname_skip_idtype",
  "source_extraction_id": "08c799b940474028a4a83eb8d3f409d8",
  "version": 1,
  "memory_type": "entities"
}
-->