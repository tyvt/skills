# 宜兴物业管理大屏地图修复
物业管理大屏 dashboard 从淮安项目合并，地图错误显示淮安，修复后显示宜兴。

## 根因
- dashboard/index.vue 的 getList 默认 regionCode 硬编码 '3208'（淮安）
- componentMap.vue 使用静态 map-img.png 与淮安辖区标签（涟水县等10个）
- 宜兴市编码为 320282，无下级区县

## 修复方案
- index.vue: regionCode '3208' → '320282'
- 新增 yixing.svg（320282 行政边界 GeoJSON 转 SVG 单区域多边形）
- 新增 svgMap.vue 用 echarts 注册渲染宜兴地图
- 重写 componentMap.vue 移除淮安静态图与区域清单，点击地图不再下钻空详情

## 验证与归属
- vite build 通过，dist 部署 nginx 站点 http://127.0.0.1:8089
- 子模块 zhi2-web-admin 分支 develop/v2.6.1-yixing 提交 2661994db 推送
- 父仓库 develop/v2.6.1 更新 gitlink 提交 39692f9 推送
- 禅道 bug5847 置 resolved/fixed，回写备注 action #87958
- 涉及文件：src/views/property/dashboard/index.vue、components/componentMap.vue、components/svgMap.vue、assets/images/dashboard/yixing.svg
- 所属项目：宜兴公共收益（zhi2-web-admin）；来源会话：2026-11-05

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "yixing_dashboard_map_fix",
  "source_extraction_id": "e8dedca366e8451c9053ae6650374c35",
  "version": 1,
  "memory_type": "entities"
}
-->