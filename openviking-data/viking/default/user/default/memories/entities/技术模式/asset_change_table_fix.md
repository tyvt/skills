# 资产变更模块表格样式修复
产品2.0 项目统一修复资产变更模块下三个列表页的表格外边框缺失问题。

## 问题根因
- 表格区域未使用 `list-card` 容器，该容器在全局样式 `src/styles/index.scss` 中定义了外边框（`border: 1px solid #f0f0f0; border-radius: 8px; padding: 0 8px; overflow: hidden; box-sizing: border-box`）

## 修改内容
- 经营用房变更（`pubHouseDetailChange`）：将操作按钮、表格、分页统一包入 `list-card`
- 资产部位变更（`pubHousePartChange`）：已有 `list-card`，无需修改
- 停车泊位变更（`pubParkingSpaceDetailChange`）：已有 `list-card`，但补充 `v-loading`
- 左侧树节点高度 32px 已在共用 `RegionTreeLayout` 组件配置，三个页面均生效

## 涉及文件与归属
- 涉及文件：`src/styles/index.scss`、`src/views/benefit`、`src/api/benefit`、`src/views/benefit/pubParkingRate/index.vue` 等
- 验证证据：extracted source=cursor project=产品2.0；来源会话：97b1025a-9dba-4821-8e14-0be39a728d87；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "asset_change_table_fix",
  "source_extraction_id": "026f3a346695401ebf51e73dd9b49605",
  "version": 1,
  "memory_type": "entities"
}
-->