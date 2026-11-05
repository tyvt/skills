# 生产环境跳过证件类型选择模式
苏住房C因非居民身份证后台管理系统不可用，生产环境跳过证件类型选择页，直接进入居民身份证实名认证流程。

## 实现方式
- `utils/index.js` 新增 `shouldSkipIdTypeChoose()`：生产环境(`import.meta.env.PROD`)返回 `true`
- `getRealNameEntryUrl()` / `getRealNameEntryRelativeUrl()`：生产返回 `FormLocal`，开发/测试返回 `TypeChoose`
- 入口跳转更新：`userInfo.vue`、`UnauthorizedPage.vue`、`AuthorizedFail.vue` 均按环境走对应入口

## 背景原因
- 非居民身份证后台管理系统不能正常使用，故生产环境强制走居民身份证实名流程

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`utils/index.js`、`userInfo.vue`、`UnauthorizedPage.vue`、`AuthorizedFail.vue`
- 来源会话ID：a48c524a-2cd1-4f84-88a2-2dc51b597b93；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "prod_skip_idtype",
  "source_extraction_id": "6528a1185c544a1ba7b847924dbc2b47",
  "version": 1,
  "memory_type": "entities"
}
-->