# UnifiedLogin 首页操作指引箭头
门户 zhi2-web-admin 的 UnifiedLogin.vue 顶部三张卡片行内的「操作指引」指引图标，动效资源位于 public/assets/images/UnifiedLogin/。

## 问题说明
- 用户所指「首页操作指引箭头」是 UnifiedLogin.vue 第 41 行附近的 icon_guide_arrow.svg 替换为 icon_guide_arrow.gif，并非 operationGuide 详情页内箭头。
- 误改详情页 OperationGuideBody.vue 内部箭头后，应 git checkout 还原该详情组件，避免两套入口图标不一致。

## 涉及文件
- zhi2-web-admin/src/views/home/UnifiedLogin.vue
- zhi2-web-admin/public/assets/images/UnifiedLogin/icon_guide_arrow.gif
- zhi2-web-admin/src/views/home/operationGuide/components/OperationGuideBody.vue

## 验证与归属
- 所属项目：门户；代码基线：fd9ef3e
- 来源会话ID：01a1620f-ed3c-7393-a93b-aa8f6ad5c94a

<!-- MEMORY_FIELDS
{
  "category": "门户技术",
  "name": "unifiedlogin_guide_arrow",
  "source_extraction_id": "ce4e2c50b9cb44edafa7d13db96fe90c",
  "version": 1,
  "memory_type": "entities"
}
-->