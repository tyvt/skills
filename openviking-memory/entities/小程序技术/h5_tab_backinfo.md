# APP内嵌H5回到tab页统一转交原生backInfo
苏住房C移动端H5内嵌原生APP时，所有回到H5同名tab页的跳转/后退须收口转交原生backInfo，避免看到「第二套tab」。

## 问题现象
- 原生APP五个tab（首页、苏找房、慧物业、掌服务、我的）由原生实现，H5同名tab页仅兜底
- 任何回到H5 tab的行为让用户看到「第二套tab」，后退落回H5 tab页错误

## 根因
- tab页真实归属在运行环境不在路由表，逐页改navigateBack/switchTab无法覆盖全量入口
- onShow兜底、redirectTo、reLaunch、公共back()各有一条路径须统一拦截

## 解决方案
- 新建utils/appNavigation.js按环境判定是否原生APP（webkit/android/harmony，显式排除SZDJSBridge容器）
- 覆盖四类拦截点：navigateBack目标为tab或栈剩一页、switchTab直接调用、reLaunch/redirectTo目标为tab、tab页onShow兜底（tabBar.js的onTabPageShow）
- 公共back()走同逻辑，main.ts注册全局拦截；浏览器独立访问与子页面间正常后退不受影响

## 验证与归属
- 验证：会话34bbb144用户明确嵌入APP的H5会后退回H5 tab，agent新建appNavigation.js并在tabBar.js/utils/index.js/main.ts三处接线
- 涉及文件：src/utils/appNavigation.js、src/utils/tabBar.js、src/utils/index.js、src/main.ts、src/pages/redirect/index.vue
- 验证证据：src=苏住房C/042.md
- 所属项目：苏住房C；来源会话ID：34bbb144-2648-4883-b2f5-4039faa3aa6e；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "h5_tab_backinfo",
  "source_extraction_id": "2c47098b9b9847d2b91828f0ccce3081",
  "version": 2,
  "memory_type": "entities"
}
-->