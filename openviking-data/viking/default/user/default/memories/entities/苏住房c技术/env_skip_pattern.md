# 生产环境按环境变量跳过业务分支模式
某功能后端未就绪时，生产环境跳过中间页直接进目标页，但开发测试环境保留，可用入口URL工厂+页面onLoad重定向双层拦截。

## 适用场景
- 需求形态：后端未就绪（如非居民身份证认证后台不可用），生产跳过「证件类型选择」页直达居民身份证实名认证页，且能低成本恢复。

## 可复用套路
- 环境判定收敛成工具函数：utils/index.js的shouldSkipIdTypeChoose()用import.meta.env.PROD判断，配套getRealNameEntryUrl()/getRealNameEntryRelativeUrl()返回绝对与相对入口地址。
- 所有跳转入口改调这两个工厂（如「我的-实名信息」入口、未实名拦截确认页、审核失败页），漏一处则半跳过。
- 页面自身兜底：TypeChoose.vue的onLoad判断生产就redirectTo到FormLocal，FormNonLocal.vue同样拦掉非居民身份证流程。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话a48c524a诉求生产跳过选择身份认证类型页，结论列出工具函数、三处入口更新、两处onLoad兜底，并以产物内联redirectTo为生效证据。
- 涉及文件：zhi2-mobile-shimin/src/utils/index.js、pages_my/verification/TypeChoose.vue、FormNonLocal.vue、setting/userInfo.vue、UnauthorizedPage.vue、AuthorizedFail.vue。
- 所属项目：苏住房C；代码基线：0801b84；来源会话ID：a48c524a-2cd1-4f84-88a2-2dc51b597b93。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "env_skip_pattern",
  "source_extraction_id": "2a3c186a43ce41b1b1060f5995a31a14",
  "version": 1,
  "memory_type": "entities"
}
-->