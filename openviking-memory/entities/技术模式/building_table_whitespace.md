# 项目信息与楼盘表间留白修复
苏州市房地产监测V3 中楼盘表页项目信息卡片与下方楼盘表/图例之间留白过大的 bug 已修复。

## 原因
- 项目信息 Tab 卡片被 flex 撑满视口，表单下方在白色卡片内留下大块空白
- 楼盘表区块额外加了 `margin-top: 20px`，图例标题 `line-height: 58px` 也偏高

## 修改
- `index.scss`：`.detail-container.building-container` 纳入整页滚动规则；顶部 `.building-page-tabs` 按内容高度收缩（`flex: 0 0 auto`，`tabs-content` 去掉多余上内边距）
- `buildingTable/index.vue`：去掉页面级 `overflow: auto`；楼盘表卡片 `margin-top` 改为 0；收紧图例行高与边距
- 配套 `projectForm.vue` 同步调整

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`index.scss`、`buildingTable/index.vue`、`projectForm.vue`
- 所属项目：苏州市房地产监测V3；来源会话：c9764d9b-dbcd-4ca7-b755-422b671095e6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_table_whitespace",
  "source_extraction_id": "3fa26587d60f4b14a861e10b9d4f9839",
  "version": 1,
  "memory_type": "entities"
}
-->