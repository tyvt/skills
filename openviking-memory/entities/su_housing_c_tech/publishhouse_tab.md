# 发布房源 Tab 栏布局修复
苏住房C `pages_transaction/publishHouse/index` 的 Tab 栏因缺少 flex 与下划线偏移导致布局异常，已修复。

## 问题原因
- `.tab-box` 无 `display: flex`，三个 Tab（已上架/待发布/已下架）仅靠左排列
- `.tab-active::before` 使用 `transform: translate(-65%, 0)`，下划线未对齐文字中心
- 小程序下 `span` 的 flex 表现不稳定

## 修复内容
- `.tab-box` 增加 `display: flex` + `justify-content: space-around`，Tab 均匀分布
- 每个 `.tab-cell` 设 `flex: 1` + `text-align: center`
- 下划线改为 `transform: translateX(-50%)`，与 `customTab` 组件一致
- Tab 元素由 `span` 改为 `div`
- `onLoad` 带 `index` 参数时同步更新 `searchParams.onStatus`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/pages_transaction/publishHouse/index.vue`、`houseList.vue`、`src/pages.js`
- 所属项目：苏住房C；来源会话ID：46b361be-d49d-4712-aad1-88015b1ae377；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "publishhouse_tab",
  "source_extraction_id": "10da4203cded4af8a50dcda2490f11c8",
  "version": 1,
  "memory_type": "entities"
}
-->