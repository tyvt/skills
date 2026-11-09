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

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_floodc_h5",
  "source_extraction_id": "f00383fee52145f293049426072d1963",
  "version": 1,
  "memory_type": "entities"
}
-->