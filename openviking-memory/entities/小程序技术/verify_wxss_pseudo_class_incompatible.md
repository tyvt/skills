# verify.wxss 伪类微信编译链不兼容
pages/face/verify.wxss 第62行附近 :deep 或伪类写法在微信编译链中不兼容导致 WXSS 编译报错。

## 问题根因
- `pages/face/verify.wxss` 第62行附近的 `:deep` 或伪类写法在微信编译链中不兼容
- 导致 WXSS 编译报错，排查需看源码而非 dist 产物

## 验证与归属
- 验证证据：extracted source=cursor session=156fa5f3-cdaf-4b2e-a9ea-2e0cb6a93c14
- 涉及文件：pages/face/verify.vue、unpackage/dist/dev/mp-weixin/pages/face/verify.wxss、pages/face/verify.wxss、App.vue
- 来源会话ID：156fa5f3-cdaf-4b2e-a9ea-2e0cb6a93c14；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "verify_wxss_pseudo_class_incompatible",
  "source_extraction_id": "a915952323c7436887ace9fedf19adbf",
  "version": 1,
  "memory_type": "entities"
}
-->