# 后端接口不存在时的前端全链路拆除
后端接口确认不存在时，前端需将api层、组件、配置、布局引用与e2e fixture一起拆除，并grep确认无悬挂引用。
## 背景
- 前端为首页统计卡自造了/v3.0/portal/home/stats接口：api层有getHomeStats，失败时回退mock(homeLayout.js的normalizeStatsFromApi)，页面层有三个专属组件
- 只删api函数会留下「组件还在、数据永远来自mock」的假实现，统计卡显示编出来的数字
## 解决方案
- 按链路逐层拆干净：删getHomeStats、清homeDataMixin的stats data/computed/watch/method、移除homeLayout.js的mock归一化函数
- index-new.vue去掉stats绑定与handleStatsMore；布局壳HomeLayoutAdmin.vue/HomeLayoutSidebar.vue移除组件引用与props
- 删除三个专属组件HomeStatsBar/HomeStatCard/HomeDeveloperStatsRow；tests/e2e/fixtures/portalHomeMock.ts同步去掉mock数据
- 全仓搜索确认无残留引用，pre-commit的lint-staged/eslint通过等于第三方再验无悬挂引用；子模块先提、父仓再更新gitlink指针
## 验证与归属
- 验证：本批实际改动11个文件(+5/-508)，子模块8改+3删，pre-commit lint-staged/eslint通过
- 涉及文件：zhi2-web-admin/src/api/portal/home.js、homeDataMixin.js、homeLayout.js、index-new.vue、portalHomeMock.ts等
- 来源会话：session-abb4dea8-9a5a-453d-9ffc-6bfb4ac5327a；代码基线：65275e9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mock_api_removal",
  "source_extraction_id": "5d05348d377f486f9526d8d733266d81",
  "version": 1,
  "memory_type": "entities"
}
-->