# 下拉选项列表静默为空根因与修复
页面用 `response.data || response.rows` 取选项列表时，若 data 为对象则短路取到对象，.map() 抛错被空 catch 吞掉导致下拉无选项。

## 问题背景
- 工单分类下拉 categoryOptions 恒为空、选不到数据，接口正常且 list 路径存在。
- 接口返回 `{code:200, data:{list:[...]}}`，response.data 是对象而非数组，`||` 短路优先取对象，response.rows 回退不执行。
- 对该对象调用 .map() 抛 TypeError，外层 try/catch 吞掉异常，categoryOptions 被赋空数组，表现为「接口有数据、下拉无选项、控制台无明显报错」。

## 解决方案
- 禁止用 `||` 直接从响应挑列表，写统一列表提取函数：先判类型再逐层回退。
- 依次尝试 Array.isArray(res) → res.rows / res.data.records / res.data.list / res.data.rows / res.data，每步校验后才返回，全不命中返回 [] 并给可观测日志。
- 把 catch 里静默吞错改成显式报错，避免同类问题再次隐形。

## 验证与归属
- 验证证据：会话 1401b92d 用户反馈「工单分类选不到数据」并补充「list接口存在」；定位原代码 `response.data || response.rows` 在返回对象时出错。
- 修复为按 rows/data.records/data.list/data.rows/data 多结构解析，补充 workOrderCategoryId、_categoryName 字段映射，去掉误加状态过滤与 /page 调用。
- 涉及文件：src/views/property/workOrder/report/index.vue、components/AddOrderDialog.vue、src/components/zs-select/zs-select.vue、src/mixins/listMixins.js。
- 所属项目：产品2.0；来源会话：1401b92d-0ad2-433b-83f9-aa435e2c7296；代码基线：42b6033

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dropdown_silent_empty",
  "source_extraction_id": "5310be18648c497aa40048c7aadc88c2",
  "version": 1,
  "memory_type": "entities"
}
-->