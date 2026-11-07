# 业主表决列表项目图片不显示修复
苏住房C小程序业主表决列表页项目图片（house_szf.png）因分包静态资源解析错误导致加载失败，已通过显式指定subpackage及登记分包映射修复。

## 问题根因
- DecisionList.vue 中 ZsImage 未指定 subpackage，resolveStaticUrl 按当前页面路由（pages_vote）推断分包，去找 pages_vote 下的 house_szf.png，文件不存在返回500。
- 图片实际位于 pages_owner/static/images/ 下。
- 早期曾将 house_szf.png 复制到 src/pages_vote/static/images/ 并尝试跨包引用，但仍存在路径推断问题。

## 修复内容
- DecisionList.vue：为 ZsImage 增加 subpackage="pages_owner"，明确从业主分包加载图片。
- utils/index.js：在 SUBPACKAGE_STATIC_IMAGES 中登记 house.png / house_szf.png → pages_owner，避免其他页面遗漏 subpackage 时走错路径。
- 早期补充：StepChoose.vue 倡议流程里删除的 house-square.png 改为同一张图，并显式指定 subpackage="pages_vote"；utils/index.js 曾映射 'images/house_szf.png': ['pages_vote', 'pages_owner']。
- pages.json 已有预加载规则（进入 pages_vote/decision/index 预加载 pages_owner），跨分包引用图片可行。

## 涉及文件与归属
- 涉及文件：DecisionList.vue、StepChoose.vue、utils/index.js、pages.json 等。
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：5a891058-8e80-44d0-9a37-a7ff9e578ff9；新修复会话ID：939b9f86-bba1-485a-8ec9-d84e2983f4b2；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "vote_img_fix",
  "source_extraction_id": "dd644fade7404995bf520b780ef14064",
  "version": 2,
  "memory_type": "entities"
}
-->
