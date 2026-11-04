# verify.wxss 编译报错排查
pages/face/verify.wxss 第 62 行附近编译报错，多为 :deep / 伪类写法在微信编译链不兼容。

## 排查要点
- 编译产物 dist 文件第 62 行本身正常，应查看源码 pages/face/verify.wxss（非 dist 文件）第 62 行附近
- 此类报错通常是 :deep / 伪类写法在微信编译链里不兼容导致

## 验证与归属
- 验证证据：extracted source=cursor session=156fa5f3-cdaf-4b2e-a9ea-2e0cb6a93c14
- 涉及文件：pages/face/verify.wxss、pages/face/verify.vue、unpackage/dist/dev/mp-weixin/pages/face/verify.wxss、App.vue
- 来源会话ID：156fa5f3-cdaf-4b2e-a9ea-2e0cb6a93c14；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "verify_wxss_compile_error",
  "source_extraction_id": "9026a2dd560f4c3591414dede07daa93",
  "version": 1,
  "memory_type": "entities"
}
-->