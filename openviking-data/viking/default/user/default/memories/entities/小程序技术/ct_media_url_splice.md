# 轮播图图片地址拼接逻辑
小程序中 resolveCtMediaUrl 拼接 CT 接口返回的图片地址时需保留 /sz 路径前缀。

## 配置基址
- develop: process.env.VUE_APP_CT_AUTH_BASE_URL_DEV || 'https://wygl.wxwgzx.com:8989/sz/api'
- trial: process.env.VUE_APP_CT_AUTH_BASE_URL_TRIAL || 'http://unlimited.c.h5.shimin.mobile.v2.benefit.shiqu.wuxi.test.zhishusz.com/api'
- release: process.env.VUE_APP_CT_AUTH_BASE_URL_PROD || 'https://wygl.wxwgzx.com:8989/sz/api'

## 问题根因
- 旧逻辑用正则只取 origin（https://wygl.wxwgzx.com:8989），丢掉了 /sz
- 接口返回示例：/zhi2/2026/f/u/l/873e02a2-....png
- 错误拼接：https://wygl.wxwgzx.com:8989/zhi2/... ❌
- 正确地址：https://wygl.wxwgzx.com:8989/sz/...（需保留 /sz）

## 验证与归属
- 所属项目：小程序
- 验证证据：extracted source=cursor project=小程序
- 涉及文件：utils/portal-env-config.js、pages/webview/home.vue、api/common.js、utils/portal-user.js
- 来源会话ID：b626c0b5-4df0-46de-a16a-ec035ee4e656
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "ct_media_url_splice",
  "source_extraction_id": "a9326b71aa6c4102918e3d346abe1e23",
  "version": 1,
  "memory_type": "entities"
}
-->