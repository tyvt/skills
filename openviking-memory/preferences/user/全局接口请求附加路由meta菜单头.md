- 全局接口请求须自动附加路由 meta 菜单头：request.js 拦截器对所有请求调用 pageRequestContext.js 的 getPageRequestHeaders()，从路由 meta 及 getId() 解析自动附加 zs-menu-name、zs-menu-path、zs-data-id
- 涉及文件：d:/repository/园区公共收益/zhi2-web-admin/src/utils/pageRequestContext.js、src/utils/request.js、src/main.js、src/views/system/operlog/index.vue、src/utils/ruoyi.js、src/mixins/table.js、src/mixins/form.js、src/router/index.js
- 验证：src=园区公共收益/020.md；来源会话 ff4a3fa0-96f2-4d49-b056-026882c79105

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "全局接口请求附加路由meta菜单头",
  "source_extraction_id": "8b73a75e3eb644c29fb970efe475b60d",
  "version": 1,
  "memory_type": "preferences"
}
-->