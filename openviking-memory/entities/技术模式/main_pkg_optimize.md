# 苏住房C主包体积优化
小程序主包体积超限（微信报 2204KB），优化后主包压到 1842KB（低于 2048KB 限制）。

## 原因
- 主包 static 里堆了大量只在分包使用的空状态图（约 300KB）
- HouseList / PersonList 仍打进了主包

## 本次改动
- 迁出主包大图（约 150KB+）到对应分包：apply-empty.png、empty_house.png、empty.png、auto-robot.png、face-error.png、kefurexian.png 等 14 项从 mainStaticPaths 白名单移除
- HouseList / PersonList 迁入 pages_owner/components/house/，减少主包组件体积
- 修正引用：ZsEmpty 默认图、各分包 ZsEmpty 路径、机器人/门禁等页面静态资源路径
- 新增脚本 scripts/migr（原文截断）

## 涉及文件与归属
- 涉及 package.json、vite.config.ts、scripts/size-main-package.mjs、src/pages.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话 bee1d6dc-9e69-4597-9d07-f327a5058b0c；代码基线 none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "main_pkg_optimize",
  "source_extraction_id": "0a3c17d20fbd48f7804787d4f6d0736e",
  "version": 1,
  "memory_type": "entities"
}
-->
