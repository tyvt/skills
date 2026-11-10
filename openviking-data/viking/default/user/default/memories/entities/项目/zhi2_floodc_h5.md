# 苏住房防汛C端移动查询H5
苏住房防汛C端移动查询H5项目（GitLab suzhufang-fe/zhi2-mobile-query-h5），由 Lead 负责任务分配与构建协调，前端与苏住房C（zhi2-mobile-shimin）同源。

## 项目结构
- Git 仓库：苏住房防汛C端，开发分支 dev
- 页面通过 src/pages/data/ref-assets.ts 中的 REF_MAIN_HTML 注入渲染，改此文件即改页面
- 构建产物输出到 dist

## 部署
- 通过 nginx 站点 防汛C端.conf（位于 D:\nginx\conf\sites-enabled\）部署
- root 指向项目 dist，监听端口 8095，本地访问 localhost:8095

## 数智页面区域筛选
- 区域顺序：全市数据 / 张家港市 / 常熟市 / 太仓市 / 昆山市 / 吴江区 / 吴中区 / 相城区 / 姑苏区 / 工业园区 / 高新区（共 11 项，按苏州行政区划补全）
- 2026-11-09 改动：补全原先被「…」折叠隐藏的区；<main> 上内边距由 pt-16 改为 pt-4 消除顶部留白
- 末尾「…」省略按钮保留，是否删除待用户确认

## 验证与归属
- 所属项目：苏住房防汛C端
- 验证证据：2026-11-09 会话构建部署 localhost:8095 截图确认

## 汛前检查预警接口
- 手持端 `src/stores/flood.ts` 的 `fetchTemplate` 在进入汛前检查时调用 `/v2.0/safety/flood/event/page` 获取预警，该接口后端 `FloodEventServiceImpl.page` 带 `@DataScope` 按创建部门过滤
- B 端新增检查单走 `/event/options`（`FloodEventServiceImpl.options`），只返回已备案且阶段匹配的预警，不受部门数据权限限制
- 阶段参数：汛前=2、汛中=3、汛后=4（inspectionStage 参数）
- 禅道 Bug 6413（2026-11-10）：因手持端用 `/event/page` 导致物业账号看不到市住建创建的预警，后改为与 B 端同口径请求 `/event/options`

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_floodc_h5",
  "source_extraction_id": "693ce07a83204387b48531dd70132c4d",
  "version": 2,
  "memory_type": "entities"
}
-->