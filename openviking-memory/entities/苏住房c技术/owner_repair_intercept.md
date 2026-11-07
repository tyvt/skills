# 电子业主卡报事报修拦截提示功能未开放
苏住房C电子业主卡中对 value==="2" 的报事报修入口优先拦截并提示「功能暂未开放」，与 goMenu/menuNav 处理一致。
## 拦截逻辑
- 在 pages_owner_extra/ownerCard/index.vue 的 goToOther 方法中对 value==="2" 的报事报修优先拦截
- 拦截后提示「功能暂未开放」，与 goMenu/menuNav 的暂未开放处理口径一致
- 其余入口不受影响，正常跳转
## 涉及入口
- 电子业主卡：pages_owner_extra/ownerCard/index.vue、pages_owner/ownerCard/index.vue
- 首页我的苏住房：pages/index/components/My_Suzhufang.vue、pages/index/my.vue、pages_tab/components/My_Suzhufang.vue
## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：苏住房C/036.md
- 涉及文件：src/utils/index.js、src/pages.json、src/pages_owner/ownerCard/index.vue、src/static/project.json、src/pages_owner_extra/ownerCard/index.vue、src/pages/index/components/My_Suzhufang.vue、src/pages/index/my.vue、src/pages_tab/components/My_Suzhufang.vue
- 来源会话ID：76b4ec2e-0c31-43e8-b39a-197cc32de4fd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "owner_repair_intercept",
  "source_extraction_id": "d6a463af3a394dfc9c190fb365e5731a",
  "version": 1,
  "memory_type": "entities"
}
-->