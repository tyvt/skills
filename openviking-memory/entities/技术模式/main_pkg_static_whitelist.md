# 主包白名单多余兜底图占体积
苏住房C 小程序主包上传预估贴边时，因把分包已有的兜底图加入 MAIN_STATIC_PATHS 致主包构建超 2048KB 失败。

## 问题根因
- 为修图片空白把 images/szf/default.png（约16KB）加进主包白名单 mainStaticPaths.js，使 prune-main-static.mjs 跳过裁剪、文件常驻主包。
- 该图只是 pages_transaction 场景兜底图，分包里本有一份，两份白占 16KB。
- 与「主包体积按 dist/build 产物统计」「白名单让资源走主包路径」不同性质：本次白名单反过来吃掉体积预算。

## 解决方案
- 定位具体文件后把该项从 MAIN_STATIC_PATHS 移除并删主包副本，恢复 houseCard 的 subpackage="pages_transaction" 让兜底图从分包加载。
- 配合 pages.json 里苏找房 Tab 预加载该分包，不再有 500。
- 改完必须重跑 size 脚本核对磁盘体积与上传预估（×1.17）。
- 经验：主包预算紧张时，分包已有的兜底/占位图一律不进白名单，宁可走 subpackage 预加载。

## 验证与归属
- 验证：会话 dbea5b5a（2026-08-31，基线 0cea241）结论：主包构建失败因上传预估 2057.4KB 超 2048KB；调整后磁盘 1742.2KB、上传预估 2038.4KB。
- 涉及文件：zhi2-mobile-shimin/src/utils/mainStaticPaths.js、scripts/prune-main-static.mjs、src/components/commonNew/houseCard.vue、src/pages.json。
- 所属项目：苏住房C；来源会话ID：dbea5b5a-3444-443d-a782-07bd1b65d66e；代码基线：0cea241

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "main_pkg_static_whitelist",
  "source_extraction_id": "f05b6458c8ca40feaba9dc1759c1ed7d",
  "version": 1,
  "memory_type": "entities"
}
-->