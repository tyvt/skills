# 主包上传体积超限修复
苏住房C小程序构建失败因主包上传预估体积超限，误加图片到主包白名单导致。

## 问题诊断
- 主包上传预估2095.4KB超出限制2048KB约47KB
- `images/empty.png`(19KB)与`images/bg_szf.png`(28KB)被误加回`mainStaticPaths.js`
- `prune-main-static.mjs`构建时保留它们在主包

## 已做修复
- 从`mainStaticPaths.js`移除上述两项
- 将`bg_szf.png`迁至`pages_vote/static/images/`
- 在`utils/index.js`的`SUBPACKAGE_STATIC_IMAGES`注册`bg_szf.png`
- 删除`src/static/images/`下对应主包副本

## 构建结果
- 重新构建通过，主包上传预估降至合规

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：60972d80-2ade-40e7-a35c-5daa665ecffd

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "main_static_paths_fix",
  "source_extraction_id": "9b70ab6d8b214640a33a8865f462425d",
  "version": 1,
  "memory_type": "entities"
}
-->