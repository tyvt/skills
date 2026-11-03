# 返回首页门户跳转缺陷（bug#5983）
zhi2-web-admin（苏州市房地产监测V3）的「返回首页」按钮应跳转至参数配置 sys.portal.index.url 指向的已登录门户首页；曾因回归失效，点击落回本系统待办（/todo）。

## 现象
- 点击「返回首页」落回本系统待办（/todo），而非门户首页
- 站点：58.210.252.230:9002 商品房综合服务平台（portalCategory=商品房）

## 根因
- 按钮逻辑位于 Navbar.vue 的 goHome：读 sys.portal.index.url，命中 http 地址则整页跳门户，否则兜底 pushDefaultIndex()（落到 /index → 首个菜单 /todo 待办）
- 源码 HEAD(ad2319ce4) 已正确：修复提交 01861fe87「返回首页恢复读取门户配置 sys.portal.index.url」已合入
- 真实复现根因：9002 测试服务器部署的是旧构建 282f1ce（早于修复），其 goHome 仅 this.pushDefaultIndex()，故永远落待办
- 9002 后端 sys.portal.index.url 实际返回 http://58.210.252.230:9001/#/index（有效 http 地址），前端按 HEAD 逻辑读取即可正确跳转

## 修复与处置
- 源码无需改动；须将当前 HEAD 构建发布到 9002 方能生效
- 本地基于 HEAD 构建 dist，nginx 8098 验证新 bundle(layout-BuAebzTN.js) 含 getByKey+redirectToPortal 修复逻辑
- 用户自行负责 9002 发布（2026-11-03）；dist 为构建产物不入库

## 验证与归属
- 涉及项目：zhi2-web-admin（gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited）
- 来源会话：2026-11-03 用户复报按钮失效，助手定位为陈旧部署并已本地验证修复构建

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "portal_home_bug",
  "source_extraction_id": "f5bfaacf60924ed3bc3f49a0721826c1",
  "version": 2,
  "memory_type": "entities"
}
-->