# el-tabs「全部」筛选空串 name 被写成索引 0
列表页用 el-tabs 做状态筛选时，「全部」tab 的 name 设为空串会导致点击后接口收到 orderStatus=0。

## 问题根因
- Element UI 的 el-tab-pane 要求 name 是合法非空值，空串不合法，点击时 v-model 被写入 Tab 数字索引（首个 tab 为 0）
- getQueryParams 里 `this.queryParams.orderStatus || undefined` 对字符串 '0' 仍为真值，会把 0 原样传给接口

## 解决方案
- 「全部」tab 不用空串也不直接用 0，改用专用哨兵值常量 `ALL_ORDER_STATUS = 'all'`
- 页面初始 orderStatus 设为 'all'，在 getQueryParams 里把 'all' 转成 undefined 表示不按状态筛选
- 通用套路：任何「全部」类 tab/下拉选项都用独立哨兵值 + 提交前转换，绝不用空串或 0 兼做「不限」语义（0 本身可能是有效业务值）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：修复为「全部」用专用值 'all'，getQueryParams 把 'all' 转 undefined，刷新后点「全部」接口不再带 orderStatus=0
- 涉及文件：zhi2-web-admin/src/views/property/workOrder/order/index.vue
- 所属项目：产品2.0
- 来源会话ID：896a4167-b34c-4afa-9eed-b4e49624b8d5
- 代码基线：50767de（zhi2-web-admin，develop/v2.6.2 分支，Element UI / Vue2 Web 后台）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "eltabs_all_bug",
  "source_extraction_id": "e3897fa6cf07484a96b884627556c453",
  "version": 1,
  "memory_type": "entities"
}
-->