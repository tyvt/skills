# 列表搜索区交互内聚zs-search-form
苏住房G列表页新增搜索区交互必须内聚进公共 zs-search-form，唯一例外是多条件组这类「动态行数」场景，此时允许自建搜索区但须显式对齐公共令牌。

## 背景与动机
- 本后台硬约定所有列表页搜索区都用公共 zs-search-form，页面自己拼 el-form 会和 QueryResetButtons、--search-form-control-height、折叠区样式全部对不上
- zs-search-form 按固定 formItems 配置渲染，天生不支持用户动态增删一组行

## 解法
- 分界判定：查询项数量静态 → 一律喂 formItems 给 zs-search-form
- 查询项行数由用户动态增删（条件组）→ 允许页面内自建搜索区，但须显式对齐：控件高度读 --search-form-control-height，搜索/重置挂 QueryResetButtons，按钮宽度不写死百分比而按内容自适应（用户反馈「按钮过长」），同一行内字段/操作符/值三类控件统一 height 与 line-height 避免「条件框高度不一致」

## 验证与归属
- 来源会话63d4baf6（基线d109b83）用户诉求1（多条件查询）、4（按钮过长）、5（高度不一致）、6（输入框别太宽）；最终改统一顶部摘要栏+收起展开共用区域
- 涉及文件：zhi2-web-admin/src/views/publicQuery/complex/index.vue、src/components/zs-search-form/zs-search-form.vue、src/views/property/complex/index.vue
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_search_form",
  "source_extraction_id": "945bb1e362c547b283081240c4923464",
  "version": 1,
  "memory_type": "entities"
}
-->