# 合同版本选择弹窗改造
苏州市房地产监测V3 中「合同版本」选择弹窗（contractDialog.vue）当前手写表格与分页，未使用公共 zs-select-dialog 组件，需改造为标准化选择弹窗。

## 现状问题
- template/detail.vue 中「合同版本」选择使用手写的 contractDialog，内部为原生 el-table + 分页
- 相邻「项目名称」选择已使用公共 SelectDialog（zs-select-dialog），两者不一致
- contractDialog.vue 虽已包裹 zs-dialog，但内部仍手写表格与分页，不符合选择弹窗标准模式

## 标准模式与接口
- 公共 SelectDialog 自动注入 bizState: 2，支持 method="post"、内置「关键字」搜索（keyWord）、单选 emits setData
- 数据源：listVersionManagement → POST /presale/versionManagement/page，参数 { pageNum, pageSize, bizState: '2', keyWord }
- 父组件 setContractData 依赖 data.versionName、data.versionId、data.contractType 行字段

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：2026-11-09 弹窗样式排查会话
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_version_select",
  "source_extraction_id": "cb523812cf26490d99b59791e6540ed1",
  "version": 1,
  "memory_type": "entities"
}
-->