# 双分支子模块间功能互迁固定打法
苏住房C采用superproject+子模块zhi2-mobile-shimin双分支开发，功能互迁须子模块先迁再更新父仓指针。

## 迁移顺序
- 顺序永远是「子模块先迁+构建验证→父仓只更新子模块指针」，两个仓库分别各提一次，不要只提一侧
- 迁移后统一跑npm run build:suzhufang验证，再谈推送与打tag

## 迁移清单
- 按清单成套搬，漏一项就是白屏或跳转失效
- 清单项：①页面与组件（整目录搬，注意pages/index/components/与pages_tab/components/常有两份同名副本）②pages.json分包注册 ③api模块 ④共享组件与hooks ⑤路由与菜单映射menuRouteMap.js ⑥工具函数 ⑦菜单兜底配置static/menus.fallback.json

## 决策点
- sfb→主干迁移启用custom-tab-bar自定义TabBar，底部Tab由3个扩到5个（苏找房/慧物业/首页/掌服务/我的，首页中间凸起）
- pages/benefit/index.vue与pages/property/index.vue保留主干既有「可跳转子页面」实现，不采用sfb的「内测中」占位页

## 验证与归属
- 验证：会话c50e16d0（sfb一级Tab迁到主干，父子仓分别提交）与34bc5e22（公共收益/阳光物业从主干迁回sfb，子模块sfb@90568e9b+父仓dev-sfb@399aa01）均按子模块先行、父仓更新指针执行并用build验证通过
- 另例：会话2a28d769子模块sfb@b3b21821改公共收益页样式+父仓dev-sfb@c34c2b8更新指针，均合入suzhou-shiqu-suzhufang-main-v2.1保持引用一致（代码基线none）
- 涉及文件：src/pages.json、src/utils/menuRouteMap.js、src/utils/menuNav.js、src/store/menu.js、src/custom-tab-bar/index.vue、src/utils/index.js
- 所属项目：苏住房C；来源会话ID：c50e16d0-db17-4bed-8d44-31e68369a6b2, 34bc5e22-4992-4fe8-8f97-cf066ecb6f2e；代码基线：77666f8
- 另例：会话 a3ca1807 合并 zhi2-mobile-shimin 至 suzhou-shiqu-suzhufang-main-v2.1 时父仓子模块引用冲突，手动将子模块指向目标分支合并提交 9027ea0a 后完成合并，代码提交至 sfb 与 dev-sfb 并推送对应远程分支（验证证据 src=苏住房C/056.md，涉及 pages_owner/company/info/index.vue、src/api/property.js）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_cross_migrate",
  "source_extraction_id": "0c1492527b224b2dbfcc5af50d5ed5cf",
  "version": 3,
  "memory_type": "entities"
}
-->