# el-tabs 空字符串 name 导致 orderStatus=0
产品2.0 的 el-tabs 把「全部」Tab 的 `:name` 设为空字符串，点击后把 `queryParams.orderStatus` 写成索引 0 而非「不限状态」，使接口误带 `orderStatus=0`。

## 根因
- Element UI 中空字符串不是合法 `name`，点击「全部」会把 v-model 绑定的 `queryParams.orderStatus` 改为 Tab 索引 `0`
- `getQueryParams` 中 `this.queryParams.orderStatus || undefined` 对字符串 `'0'` 仍为真，会原样传给接口

## 修复方案
- 「全部」改用专用值 `'all'`（常量 `ALL_ORDER_STATUS`），初始 `orderStatus` 也改为 `'all'`
- 在 `getQueryParams` 里把 `'all'` 转成 `undefined` 表示不按状态筛选
- 若页面缓存了错误 `orderStatus`，点「重置」或重新进入页面清掉旧缓存

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：zhi2-web-admin/src/components/zs-button/zs-button.vue、src/views/property/workOrder/order/index.vue
- 来源会话ID：896a4167-b34c-4afa-9eed-b4e49624b8d5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tab_name_bug",
  "source_extraction_id": "607720159db4425097b0ade4f7035cb6",
  "version": 1,
  "memory_type": "entities"
}
-->