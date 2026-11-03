# 选项列表接口选型纠偏
下拉/选项数据为空时，确认 list 接口存在后不要顺手换成 /page 或加本地状态过滤，应固定用 /list 拿全量选项并显式映射字段。

## 问题现象
- 选项类下拉数据为空时，易顺手把 /xxx/list 改成 /xxx/page 分页接口
- 或在本地对结果加状态过滤（如只留启用项），导致数据被全滤掉且不报错
- 真实根因常为响应解析或字段映射问题，顺手改动会掩盖真正原因

## 根因分析
- 选项类接口与分页列表接口是两种契约：/page 需 pageNum/pageSize 且返回 rows+total
- V3 里末尾段可能被请求拦截器当成 REST 动作改写，导致 /page 返回空
- 本地状态过滤在接口本只回有效项时会把数据全滤掉，且静默无报错

## 解决方案
- 选项类下拉固定用 /list（或已有的 listAll），不加分页参数、不做本地状态过滤
- 先确认接口路径与响应结构正确，再处理字段映射（如 workOrderCategoryId、_categoryName 显式映射）
- 改完必须刷新页面复验，仍为空时直接索取接口真实返回 JSON 精确对齐，不继续猜路径
- 确认真正根因后，误加的状态过滤和 /page 调用必须一起回退

## 验证与归属
- 会话 1401b92d 结论：继续使用 /list 接口，去掉误加状态过滤和 /page 调用，补字段映射
- 涉及文件：property/workOrder/report/index.vue、report/components/AddOrderDialog.vue
- 所属项目：产品2.0；来源会话：1401b92d-0ad2-433b-83f9-aa435e2c7296；代码基线：42b6033

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_list_api_choice",
  "source_extraction_id": "4a0d09f28e58446e8eec2d811704c187",
  "version": 1,
  "memory_type": "entities"
}
-->