# 预售注销保存后缀被错误改写修复
苏州市房地产监测V3 中预售注销详情页保存接口因请求拦截器误改写后缀导致 400，已在 REST_ACTIONS 增加 save 修复。

## 问题根因
- detail.vue（presale/permitCancel）已正确配置 addApiSuffix/editApiSuffix 均返回 '/save'
- 保存拼出 /presale/permit/cancel/save，但 apiV3Normalize.js 将其解析为动作 cancel + 参数 save
- 因 cancel 在 REST_ACTIONS 中，最终 URL 变为 /presale/permit/cancel，导致 POST 返回 400

## 修复方案
- 在 apiV3Normalize.js 的 REST_ACTIONS 中增加 save，使 /save 被识别为标准动作

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：detail.vue、form.js、apiV3Normalize.js
- 所属项目：苏州市房地产监测V3；来源会话：c054e576-0507-404b-9ea6-e0d5d61ca641；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_cancel_save_fix",
  "source_extraction_id": "58c7810a01c34e9fa51dcebb81c6c582",
  "version": 1,
  "memory_type": "entities"
}
-->