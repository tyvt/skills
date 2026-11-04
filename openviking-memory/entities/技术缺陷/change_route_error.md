# 修改按钮因路由错误和ID格式问题导致的导航失败
在苏州市房地产监测V3项目的 zhi2-web-admin 中，修改按钮因路由错误和ID格式不一致而失效。

## 解决方案
- companyRecord.js 添加 resolveChangeId() 以兼容 getLastByLogin 返回的标量或对象 ID
- CompanyBasicInfoDetail.vue 使用 findRouterByFilePath 进行静默路由查找（优先 toB/change/detail，带有回退）
- loadActiveChange、detailCallback 和 navigateToChangeEdit 规范化 ID；导航使用 path + changeId 并携带 query { formMode: 'edit', id }

## 验证
- 验证证据: src=苏州市房地产监测V3/061.md
- 涉及文件: CompanyBasicInfoDetail.vue; companyRecord.js; ruoyi.js; detail.vue; index.vue; detailMixins.js; form.js; main.js
- 会话: ac2a541a-e0f6-41f2-bba0-8b283388ff32; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "change_route_error",
  "source_extraction_id": "4874608f104944719aa2f486c341f696",
  "version": 1,
  "memory_type": "entities"
}
-->
